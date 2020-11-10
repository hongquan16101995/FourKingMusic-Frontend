"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PlaySongComponent = void 0;
var core_1 = require("@angular/core");
var PlaySongComponent = /** @class */ (function () {
    function PlaySongComponent(songService, router) {
        this.songService = songService;
        this.router = router;
    }
    PlaySongComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.id = Number(this.router.snapshot.paramMap.get('id'));
        console.log(this.id);
        this.songService.getSongById(this.id).subscribe(function (data) {
            _this.song = {
                id: data.id,
                user: data.user,
                singers: data.singers,
                dateCreated: data.dateCreated
            };
            _this.avaUrl = data.avatarUrl;
            _this.name = data.name;
            _this.singers = data.singers;
            _this.fileURL = data.fileUrl;
            _this.user = data.user.name;
        });
    };
    PlaySongComponent = __decorate([
        core_1.Component({
            selector: 'app-play-song',
            templateUrl: './play-song.component.html',
            styleUrls: ['./play-song.component.css']
        })
    ], PlaySongComponent);
    return PlaySongComponent;
}());
exports.PlaySongComponent = PlaySongComponent;
