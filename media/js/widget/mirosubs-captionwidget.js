goog.provide('mirosubs.CaptionWidget');

// TODO: have this inherit from goog.ui.Component

mirosubs.CaptionWidget = function(uuid, video_id, has_subtitles, username, save_captions_url) {
    var that = this;
    this.video_id = video_id;
    this.save_captions_url = save_captions_url;
    this.unitOfWork = new mirosubs.UnitOfWork(function() { that.workPerformed(); });
    this.saving = false;

    this.caption_div = goog.dom.$(uuid + "_captions");    
    this.videoPlayer = mirosubs.VideoPlayer.wrap(uuid + "_video");
    this.playheadFn_ = function() {
            return that.videoPlayer.getPlayheadTime();
        };
    this.captionManager_ = new mirosubs.CaptionManager(this.playheadFn_);
    // TODO: dispose of this during disposal after inheriting from goog.ui.Component.
    this.captionManager_.addEventListener(mirosubs.CaptionManager.CAPTION_EVENT,
                                          this.captionReached_, false, this);

    var onClick = function(id, listener) {
        goog.events.listen(goog.dom.$(id), 'click', listener, false, that);
    };

    if (has_subtitles)
        onClick(uuid + "_selectLanguage", this.languageSelectedListener_);
    else
        onClick(uuid + "_subtitleMe", this.subtitleMeListener_);
};

mirosubs.CaptionWidget.wrap = function(identifier) {
    var uuid = identifier["uuid"];
    var video_id = identifier["video_id"];
    var has_subtitles = identifier["has_subtitles"];
    var username = identifier["username"];
    var save_captions_url = identifier["save_captions_url"];
    new mirosubs.CaptionWidget(uuid, video_id, has_subtitles, 
                               username, save_captions_url);
};

mirosubs.CaptionWidget.prototype.captionReached_ = function(jsonCaptionEvent) {
    var c = jsonCaptionEvent.caption;
    this.videoPlayer.showCaptionText(c ? c['caption_text'] : '');
};

mirosubs.CaptionWidget.prototype.languageSelectedListener_ = function(event) {
    // TODO: write me.
    event.preventDefault();
};

mirosubs.CaptionWidget.prototype.subtitleMeListener_ = function(event) {
    goog.dom.removeChildren(this.caption_div);
    var containerWidget = new mirosubs.trans.ContainerWidget(
        this.playheadFn_, this.captionManager_);
    containerWidget.decorate(this.caption_div);
    event.preventDefault();
};

// see http://code.google.com/closure/compiler/docs/api-tutorial3.html#mixed
mirosubs["CaptionWidget"] = mirosubs.CaptionWidget;
mirosubs.CaptionWidget["wrap"] = mirosubs.CaptionWidget.wrap;

if (typeof(MiroSubsToEmbed) != 'undefined')
    for (var i = 0; i < MiroSubsToEmbed.length; i++)
        mirosubs.CaptionWidget.wrap(MiroSubsToEmbed[i]);