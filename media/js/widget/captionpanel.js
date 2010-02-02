goog.provide('mirosubs.CaptionPanel');
goog.provide('mirosubs.CaptionPanel.EventType');

mirosubs.CaptionPanel = function(videoID, videoPlayer) {
    goog.ui.Component.call(this);
    this.videoID_ = videoID;
    this.videoPlayer_ = videoPlayer;
};
goog.inherits(mirosubs.CaptionPanel, goog.ui.Component);

mirosubs.CaptionPanel.EventType = {
    FINISHED_SUBTITLING: 'finishedsubtitling'
};

/**
 *
 * @param {function(boolean)} callback 
 */
mirosubs.CaptionPanel.prototype.startSubtitling = function(callback) {
    var that = this;
    mirosubs.Rpc.call("start_editing", {"video_id": this.videoID_},
                      function(result) {
                          callback(result["can_edit"]);
                          if (result["can_edit"])
                              that.startSubtitlingImpl_(result["version"], 
                                                        result["existing"]);
                          else {
                              if (result["owned_by"])
                                  alert("Sorry, this video is owned by " + 
                                        result["owned_by"]);
                              else
                                  alert("Sorry, this video is locked by " +
                                        result["locked_by"]);
                          }
                      });
};

mirosubs.CaptionPanel.prototype.startSubtitlingImpl_ = 
    function(version, existingCaptions) {
    this.addChild(new mirosubs.subtitle.MainPanel(this.videoPlayer_,
                                                  this.videoID_, 
                                                  version, 
                                                  existingCaptions),
                  true);
    // TODO: dispose the MainPanel when done!
};

mirosubs.CaptionPanel.prototype.languageSelected = function() {
    this.removeChildren();
    this.addChild(new mirosubs.play.MainPanel());
};