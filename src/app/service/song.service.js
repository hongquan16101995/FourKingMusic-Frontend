"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SongService = void 0;
var core_1 = require("@angular/core");
var environment_1 = require("../../environments/environment");
var API_URL = "" + environment_1.environment.apiUrl;
var SongService = /** @class */ (function () {
    function SongService(http, httpService) {
        this.http = http;
        this.httpService = httpService;
    }
    SongService.prototype.getAllSongs = function () {
        return this.http.get(API_URL + '/home/song');
    };
    SongService.prototype.getAllSongsNew = function () {
        return this.http.get(API_URL + '/home/song/new');
    };
    SongService.prototype.getSongById = function (id) {
        return this.http.get(API_URL + '/home/song/' + id);
    };
    SongService.prototype.getSongByUser = function (userid) {
        return this.http.get(API_URL + '/user/song/' + userid, this.httpService.getHttp());
    };
    SongService.prototype.createSong = function (song) {
        return this.http.post(API_URL + '/song', song, this.httpService.getHttp());
    };
    SongService.prototype.updateSong = function (song) {
        return this.http.put(API_URL + '/song', song, this.httpService.getHttp());
    };
    SongService.prototype.deleteSong = function (id, userId) {
        // @ts-ignore
        return this.http["delete"](API_URL + '/song/' + id, userId, this.httpService.getHttp());
    };
    SongService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], SongService);
    return SongService;
}());
exports.SongService = SongService;
