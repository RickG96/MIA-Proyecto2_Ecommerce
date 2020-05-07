import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../websocket.service';
import { ServiciosService } from '../servicios.service';
import { formatDate } from '@angular/common';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  today= new Date();
  mensaje: any = "";
  CHATS: any = [];
  MENSAJES: any = [];
  MICHAT: any = {};
  usuario: any = {};
  MSG_CONTENIDO: any = {};
  recibido: any = {};
  punteo: any;
  hayChat: boolean = false;
  CONECTADOS: any = [];
  PUNTEO: any = [];
  USUARIOS: any = [];
  NUEVO_CHAT: any = {};

  constructor(private wss: WebsocketService, private servicio: ServiciosService) { }

  ngOnInit() {
    this.usuario = this.servicio.getLog();
    this.getChats();
    this.conectar();
    this.wss.listen('test event').subscribe(data => {
      console.log(data);
    });
    this.wss.listen('message')
      .subscribe(data => {
        this.recibido = data;
        if(this.recibido.id_chat == this.MICHAT.id_chat) {
          this.MENSAJES.push(this.recibido);
        }
      })
    this.wss.listen('connected')
      .subscribe(data => {
        this.CONECTADOS = data;
        this.CONECTADOS = this.CONECTADOS.filter(usuario => usuario.id_usuario != this.usuario.id_usuario)
      })
  }

  desconectar() {
    this.wss.emit('leave', this.usuario);
  }

  conectar() {
    this.wss.emit('connected', this.usuario);
  }

  enviarMensaje() {
    this.MSG_CONTENIDO.mensaje = this.mensaje;
    this.MSG_CONTENIDO.id_cliente = this.usuario.id_usuario;
    this.MSG_CONTENIDO.id_soporte = this.MICHAT.id_soporte;
    this.MSG_CONTENIDO.fecha = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');
    this.MSG_CONTENIDO.id_chat = this.MICHAT.id_chat;
    this.wss.emit("message", this.MSG_CONTENIDO);
    this.servicio.postMensaje(this.MSG_CONTENIDO)
      .subscribe(() => console.log('ok'));
    this.mensaje = "";
  }

  getChats() {
    this.servicio.getChats()
      .subscribe(data => {
        this.CHATS = data;
        this.PUNTEO = this.CHATS.filter(chat => chat.estado == 0 && chat.id_soporte == this.usuario.id_usuario);
        this.CHATS = this.CHATS.filter(chat => chat.estado == 1);
        console.log(this.CHATS);
        this.CHATS.forEach(element => {
          if(element.id_cliente == this.usuario.id_usuario || element.id_soporte == this.usuario.id_usuario) {
            this.hayChat = true;
            this.MICHAT = element;
          }
        });
        console.log(this.MICHAT);
        this.getMensajes();
      })
  }

  getMensajes() {
    this.servicio.getMensajes() 
      .subscribe(data => {
        this.MENSAJES = data;
        this.MENSAJES = this.MENSAJES.filter(element => element.id_chat == this.MICHAT.id_chat);
        console.log(this.MENSAJES);
      })
  }

  terminar() {
    this.MICHAT.punteo = this.punteo;
    console.log(this.MICHAT)
    this.servicio.updateChat(this.MICHAT, this.MICHAT.id_chat)
      .subscribe(() => {
        this.getChats();
      })
    this.hayChat = false;
  }

  nuevoChat() {
    this.servicio.getUsuarios()
      .subscribe(data => {
        this.USUARIOS = data;
        this.USUARIOS = this.USUARIOS.filter(element => element.estatus == 1);
        this.USUARIOS = this.USUARIOS.filter(element => element.tipo_usuario == 2);
        this.NUEVO_CHAT.id_soporte = this.USUARIOS[Math.floor(Math.random()*this.USUARIOS.length)].id_usuario;
        this.NUEVO_CHAT.id_cliente = this.usuario.id_usuario;
        this.servicio.postChat(this.NUEVO_CHAT)
          .subscribe(() => {
            this.getChats();
          })
      })
  }

}
