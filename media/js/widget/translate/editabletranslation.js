// Universal Subtitles, universalsubtitles.org
// 
// Copyright (C) 2010 Participatory Culture Foundation
// 
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
// 
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see 
// http://www.gnu.org/licenses/agpl-3.0.html.

goog.provide('mirosubs.translate.EditableTranslation');

mirosubs.translate.EditableTranslation = function(unitOfWork, captionID, 
                                                  opt_jsonTranslation) {
    this.unitOfWork_ = unitOfWork;
    this.captionID_ = captionID;
    this.jsonTranslation = opt_jsonTranslation || 
        {
            'caption_id': captionID,
            'text': ''
        };
    if (!opt_jsonTranslation)
        this.unitOfWork_.registerNew(this);
};

mirosubs.translate.EditableTranslation.prototype.setText = function(text) {
    this.jsonTranslation['text'] = text;
    this.unitOfWork_.registerUpdated(this);
};

mirosubs.translate.EditableTranslation.prototype.getText = function() {
    return this.jsonTranslation['text'];
};

mirosubs.translate.EditableTranslation.prototype.getCaptionID = function() {
    return this.jsonTranslation['caption_id'];
};