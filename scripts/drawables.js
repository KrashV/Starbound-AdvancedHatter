/**
 * Advanced Hatter (https://github.com/KrashV/Starbound-AdvancedHatter)
 * This work is licensed under a Creative Commons Attribution 3.0 Unported License.
 * https://creativecommons.org/licenses/by/3.0/
 */

const emoteSelect = {
    idle: {},
    blink: {},
    blabber: {},
    wink: {},
    happy: {},
    sad: {},
    shout: {},
    laugh: {},
    surprised: {},
    shocked: {},
    neutral: {},
    annoyed: {}
};

var emoteSet = {
    default: JSON.parse(JSON.stringify(emoteSelect)),
    reverse: JSON.parse(JSON.stringify(emoteSelect))
}

const emoteFrames = {
    idle: 1,
    blink: 2,
    blabber: 2,
    wink: 4,
    happy: 2,
    sad: 5,
    shout: 2,
    laugh: 2,
    surprised: 2,
    shocked: 3,
    neutral: 2,
    annoyed: 2
};

const sheetPieces = [
    [null, ["blabber", "1"], ["blabber", "2"], null, ["shout", "1"], ["shout", "2"], null, null, null],
    [null, ["happy", "1"], ["happy", "2"], null, null, null, null, ["idle", "1"], null],
    [null, ["sad", "1"], ["sad", "2"], ["sad", "3"], ["sad", "4"], ["sad", "5"], null, null, null],
    [null, ["neutral", "1"], ["neutral", "2"], null, ["laugh", "1"], ["laugh", "2"], null, null, null],
    [null, ["annoyed", "1"], ["annoyed", "2"], null, null, null, null, null, null],
    [null, ["surprised", "1"], ["surprised", "2"], null, ["shocked", "1"], ["shocked", "2"], ["shocked", "3"], null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, ["blink", "1"], ["blink", "2"], null, ["wink", "1"], ["wink", "2"], ["wink", "3"], ["wink", "4"], null]
];

const speciesDirectives = {
	human: "?crop;17;21;27;31?scale=0.7?replace;af8e7529=0000ff?scale=0.7?scale=0.7?scale=0.9?crop;2;1;3;2" + 
		"?replace;cc8c651c=00a100;c1735432=00a200;c57d5a26=00a300;c2735547=00a400;ca88611c=00a500;" + 
		"bf6e4f32=00a600;ffffff00=00a700;ca996f1d=00b100;c2825e06=00b200;a56a752a=00b300;c2825d05=00b400;" + 
		"c3815c03=00b500;cc8b6216=00c100;c174531c=00c200;c0705046=00c300;c06e505d=00c400;cc8b621e=00d100;" + 
		"c2765430=00d200;cc8b621f=00e100;c57d5811=00e200;c278551f=00e300;bf6e5041=00e400;bd684c58=00e500;" + 
		"ead1bd00=00f100;e6c8b714=00f200;ddb4a224=00f300;d39d8c40=00f400;d49e8c40=00f500;f0dfd924=00f600" + 
		"?scale=2?blendscreen=/ships/apex/apexT3blocks.png;6;20?multiply=00ffff?blendscreen=/ships/apex/apexT3blocks.png;-1;0" + 
		"?multiply=2eff2e00?scale=47?crop;1;1;44;44",
	apex: "?crop;17;21;27;31?scale=0.7?scale=0.7?scale=0.7?scale=0.9?crop;2;1;3;2" +
		"?replace;574d451c=00a100;5f463e32=00a200;855f572c=00a300;986f6a4d=00a400;3a37431c=00a500;" + 
		"84262a32=00a600;59586500=00a700;48484b35=00b100;95282b06=00b200;9e282906=00b300;9e262805=00b400;" + 
		"9e252603=00b500;3a374316=00c100;8a26291c=00c200;883c3374=00c300;935a48a6=00c400;4f4d5716=00d100;" +
		"96424032=00d200;7d574c5e=00e100;a15b4b5c=00e200;9e4d3f5e=00e300;9c554683=00e400;92564883=00e500;" +
		"3f3d4a00=00f100;963b3041=00f200;942d2933=00f300;8a2e2c4f=00f400;6134374f=00f500;64616533=00f600" +
		"?scale=2?blendscreen=/ships/apex/apexT3blocks.png;6;20?multiply=00ffff?blendscreen=/ships/apex/apexT3blocks.png;-1;0" +
		"?multiply=2eff2e00?scale=47?crop;1;1;44;44",
	floran: "?crop;17;21;27;31?scale=0.7?scale=0.7?scale=0.7?scale=0.9?crop;2;1;3;2" +
		"?replace;9f4d351c=00a100;7f302232=00a200;7b312226=00a300;84332447=00a400;9c48301c=00a500;78281b32=00a600;" + 
		"e9d4cc00=00a700;9a553b27=00b100;6c2c1e06=00b200;6c2d1e06=00b300;6d2b1d05=00b400;6d2a1b03=00b500;9c493016=00c100;" + 
		"7427191c=00c200;7f2e1e50=00c300;852f205d=00c400;9c49301a=00d100;75281925=00d200;9c49301d=00e100;7129190f=00e200;" + 
		"7328191d=00e300;7d2a1d3f=00e400;862e2056=00e500;d3b2a500=00f100;c6a79d1d=00f200;bc92882b=00f300;b37b7147=00f400;" + 
		"b57d7347=00f500;edd9d42b=00f600?scale=2?blendscreen=/ships/apex/apexT3blocks.png;6;20?multiply=00ffff" + 
		"?blendscreen=/ships/apex/apexT3blocks.png;-1;0?multiply=2eff2e00?scale=47?crop;1;1;44;44",
	hylotl: "?crop;17;21;27;31?scale=0.7?scale=0.7?scale=0.7?scale=0.9?crop;2;1;3;2" + 
		"?replace;9c4c351c=00a100;792e2132=00a200;78302126=00a300;82342547=00a400;98472f1c=00a500;" +
		"73261932=00a600;804d4600=00a700;9a553b27=00b100;6c2c1e06=00b200;6c2d1e06=00b300;6d2b1d05=00b400;" +
		"722e1e03=00b500;7025191f=00c200;8233216b=00c300;85352267=00c400;98472f2b=00d100;73281a2e=00d200;" + 
		"9a4b3030=00e100;752d1c23=00e200;6f261917=00e300;792b1c37=00e400;9d442e4e=00e500;74352900=00f100;" +
		"77281e27=00f200;76261d2b=00f300;7c281e47=00f400;85342547=00f500;7a47422b=00f600?scale=2" +
		"?blendscreen=/ships/apex/apexT3blocks.png;6;20?multiply=00ffff?blendscreen=/ships/apex/apexT3blocks.png;-1;0" +
		"?multiply=2eff2e00?scale=47?crop;1;1;44;44",
	glitch: "?crop;17;21;27;31?scale=0.7?replace;7062420a=0000ff?scale=0.7?scale=0.7?scale=0.9" + 
		"?crop;2;1;3;2?replace;8e7e6200=00a100;8d7c5f10=00a200;93785c2c=00a300;9976592f=00a400;86573347=00a500;" + 
		"84543047=00a600;ffffff00=00a700;77634235=00b100;5e505c2c=00b200;70603e06=00b300;715f3d05=00b400;715f3c03=00b500;" + 
		"74603d25=00c100;85533025=00c200;735e3a00=00c300;785b3734=00c400;74603d16=00d100;7b633d32=00d200;765f3c28=00e100;" +
		"7a583528=00e200;755d3928=00e300;dab9ab39=00e500;c2b9aa00=00f100;c1b8a810=00f200;c1b8a800=00f300;c1b8a80d=00f400;" +
		"efece90d=00f500?scale=2?blendscreen=/ships/apex/apexT3blocks.png;6;20?multiply=00ffff?blendscreen=/ships/apex/apexT3blocks.png;-1;0" +
		"?multiply=2eff2e00?scale=47?crop;1;1;44;44",
	avian: "?crop;17;21;27;31?scale=0.7?replace;c2f1ff4e=0000ff?scale=0.7?scale=0.7?scale=0.9?crop;2;1;3;2" + 
		"?replace;f5ece71d=00a100;f7eee81d=00a200;fdfcfb02=00a300;fefdfd01=00a400;f5ebe61f=00a500;f7eee81e=00a600;" + 
		"ffffff00=00a700;f9fafa08=00b100;f5f5fc0a=00b200;fbfbfc05=00b300;f8fafc08=00b400;f9fbfc06=00b500;fdfcfb04=00c100;" + 
		"fbf7f50b=00c200;f8eee721=00c400;f9f4f30d=00d200;fcfaf906=00e200;f8f2ee14=00f300;f8f1ed15=00f400" + 
		"?scale=2?blendscreen=/ships/apex/apexT3blocks.png;6;20?multiply=00ffff?blendscreen=/ships/apex/apexT3blocks.png;-1;0" +
		"?multiply=2eff2e00?scale=47?crop;1;1;44;44",
	novakid: "?crop;17;21;27;31?scale=0.7?scale=0.7?scale=0.7?scale=0.9?scale=1.1?crop;2;1;3;2?replace;fafbe290=00a100;fefdfa90=00a200;" +
		"ffffff00=00a300;f5ebe600=00a400;f7fcff06=00b100;f8fcff05=00b200;d9d9ff24=00b300;fafdff03=00b400;f2eae502=00b500;fffefe90=00c100;" +
		"f7eeeb00=00c400;f5e9e490=00e400;d6a48700=00e500;faf5f300=00f400;ebd3c600=00f500;f9f5f100=00f600?scale=2" +
		"?blendscreen=/ships/apex/apexT3blocks.png;6;20?multiply=00ffff?blendscreen=/ships/apex/apexT3blocks.png;-1;0" +
		"?multiply=2eff2e00?scale=47?crop;1;1;44;44"
};
var sheetImported = false;
var spritesheet;

/**
 * On load
 */
$(function() {

    loadFeatureLogo();
	
    // Bind select image
    $("#btnSelectImage").click(function() {
        $("#selectImage").trigger("click");
    });

    $("#selectImage").change(function() {
        readDrawableInput(this, drawableLoaded, false);
        this.value = "";
    });

    // Bind import spritesheet
    $("#btnImportShriteSheet").click(function() {
        $("#selectSpritesheet").trigger("click");
    });

    $("#selectSpritesheet").change(function() {
        readDrawableInput(this, spritesheetLoaded, true);
        this.value = "";
    });

    // Bind remove image
    $("#btnRemoveImage").click(function() {
        emoteSet[$("#sheetSelect").val()][$("#emoteSelect").val()][$("#frameSelect").val()] = null;
        drawableLoaded();
    });

    // Bind generate output
    $("#btnPlainText").click(function() {generatePlainText()});
    $("#btnCommand").click(function() {generateCommand()});
    $("#btnFileClipboard").click(function() {generatePlainText(true)});
    $("#btnCommandClipboard").click(function() {generateCommand(true)});

    $("#btnDirective").click(function() {
        if (spritesheet == null) {
            showAlert("#warning-empty-sheet");
            return;
        }
        $('#raceSelectModal').modal('show');
    });

    $('#racechoose').click(function() {
		var race = $('#raceSelect').val();
		switch (race) {
			case "hylotl":
				alert("neutral.1, happy.1 will be the same!");
				break;
			case "glitch":
				alert("wink.5, idle.1 will be the same!\n" +
					"shocked.2, surprised.2 will be the same!");
				break;
			case "avian":
				alert("blink.2, blabber.1 will be the same!\n" + 
				"laught.1, happy.2 will be the same!\n" +
				"idle.1, blink.1 will be the same!\n" +
				"neutral.1, annoyed, oh.1, oooh.1 will be the same!\n" +
				"oh.2, oooh.2, oooh.3 will be the same!\n" +
				"wink.1, wink.4 will be the same!\n" +
				"wink.2, wink.3 will be the same!");
				break;
			case "novakid":
				alert("blabber.1, happy.1 will be the same!\n" + 
				"blabber.2, happy.2 will be the same!\n" +
				"shout.1, idle.1, neutral.2, annoyed.2, oh.2, oooh.1, blink.1 will be the same!\n" +
				"neutral.1, laugh.1, annoyed.1, oh.1, blink.2, wink.1 will be the same!");
				break;
		};
		generateEmoteDirectiveFile();
	});
	
    // Load preview
    var imageCharacter = new Image();
    imageCharacter.onload = function() {
        drawResizedImage($("#cvsPreviewCharacter").get(0), imageCharacter, 4);
    };
    imageCharacter.src = "imgs/hatterCharacter.png";

    var imageHair = new Image();
    imageHair.onload = function() {
        drawResizedImage($("#cvsPreviewHair").get(0), imageHair, 4);
    };
    imageHair.src = "imgs/hatterHair.png";

    var imageEmote = new Image();
    imageEmote.onload = function() {
        drawResizedImage($("#cvsPreviewEmote").get(0), imageEmote, 4);
    };
    imageEmote.src = "imgs/emotes/idle.png";

    // Bind hair mask
    $("#checkMask").change(function() {
        var canvasHair = $("#cvsPreviewHair");
        if (this.checked)
            canvasHair.fadeOut(100);
        else
            canvasHair.fadeIn(100);
    });

    // Bind hide body
    $("#checkHide").change(function() {
		var canvasHair = $("#cvsPreviewHair");
        var canvasCharacter = $("#cvsPreviewCharacter");
		var canvasEmote = $("#cvsPreviewEmote");
        if (this.checked) {
            canvasHair.fadeOut(100);
			canvasCharacter.fadeOut(100);
			canvasEmote.fadeOut(100);
		}
        else {
			if (!$("#checkMask").get(0).checked) {
				canvasHair.fadeIn(100);
			}
			canvasCharacter.fadeIn(100);
			canvasEmote.fadeIn(100);
		}
    });
	
    // Bind emote selection
    $("#emoteSelect").change(function() {
        var select = document.getElementById("frameSelect");
        var limit = emoteFrames[this.value];

        $("#frameSelect").empty();
        for (var i = 1; i <= limit; i++) {
            var el = document.createElement("option");
            el.textContent = i;
            el.value = i;
            select.appendChild(el);
        }

        drawableLoaded();
        clearCanvas($("#cvsPreviewEmote").get(0));
        imageEmote.src = "imgs/emotes/" + this.value + "1.png";
    });

    // Bind frame selection
    $("#frameSelect").change(function() {
        var emote = $("#emoteSelect").val();
        drawableLoaded();
        clearCanvas($("#cvsPreviewEmote").get(0));
        imageEmote.src = "imgs/emotes/" + emote + this.value + ".png";
    });

    // Bind direction selection
    $("#sheetSelect").change(function() {
        drawableLoaded();
        clearCanvas($("#cvsPreviewEmote").get(0));
        imageEmote.src = "imgs/emotes/" + $("#emoteSelect").val() +  $("#frameSelect").val() + ".png";
    });

    // preventing page from redirecting
    $("html").on("dragover", function(e) {
        e.preventDefault();
        e.stopPropagation();
        $("#dropHere").attr("src","imgs/drophere.png");
    });

    $("html").on("drop", function(e) { e.preventDefault(); e.stopPropagation(); 
        $("#dropHere").attr("src","imgs/emotes/idle.png");
    });

    // Drag enter
    $('.upload-area').on('dragenter', function (e) {
        e.stopPropagation();
        e.preventDefault();
    });

    // Drag over
    $('.upload-area').on('dragover', function (e) {
        e.stopPropagation();
        e.preventDefault();
    });

    // Drag leave
    $("html").on("dragleave", function(e) { 
        e.preventDefault(); e.stopPropagation(); 
    });

    // Drop
    $('.upload-area').on('drop', function (e) {
        e.stopPropagation();
        e.preventDefault();

        readDrawableInput(e.originalEvent.dataTransfer, checkIfSpritesheet, false);
        
        $("#dropHere").attr("src","imgs/emotes/idle.png");
    });
});

/**
 * Loads and draws the hat icon in the jumbotron feature.
 * Should be called on page load.
 */
function loadFeatureLogo() {
    var canvas = $("#logoHat").get(0);
    var canvasContext = canvas.getContext('2d');

    var image = new Image();
    image.onload = function() {
        canvas.setAttribute("width", image.width * 3 + 2);
        canvas.setAttribute("height", image.height * 3 + 2);

        canvasContext.mozImageSmoothingEnabled = false;
        canvasContext.msImageSmoothingEnabled = false;
        canvasContext.imageSmoothingEnabled = false;
        canvasContext.shadowColor = "#000";
        canvasContext.shadowBlur = 2;
        canvasContext.shadowOffsetX = 1;
        canvasContext.shadowOffsetY = 1;
        canvasContext.drawImage(image, 0, 0, image.width * 3, image.height * 3);
    };

    image.src = "imgs/hat.png";
}

/**
 * Validates the current image selection.
 * @param {boolean} alertUser - Value indicating whether the user should be alerted if there's no drawable selected.
 * @returns {boolean} Value indicating whether a drawable is selected or not.
 */
function confirmDrawable(alertUser) {

    if (emoteSet["default"]["idle"]["1"] == null) {
        if (alertUser)
            showAlert("#warning-empty-frame");
        return false;
    } else
        return true;
}

/**
 * Clears the given canvas, or a part of it.
 * @param {object} canvas - DOM element to clear.
 * @param {number} [dx=0] - X-coordinate of the upper left corner of the area to clear.
 * @param {number} [dy=0] - Y-coordinate of the upper left corner of the area to clear.
 * @param {number} [width=canvas.width] - Width of area to clear.
 * @param {number} [height=canvas.height] - Height of area to clear.
 */
function clearCanvas(canvas, dx, dy, width, height) {
    if (dx === undefined || dx == null)
        dx = 0;
    if (dy === undefined || dy == null)
        dy = 0;
    if (width === undefined || width == null)
        width = canvas.width;
    if (height === undefined || height == null)
        height = canvas.height;

    var context = canvas.getContext('2d');

    context.clearRect(0, 0, canvas.width, canvas.height);
}

/**
 * Draws the given image on the canvas. Scaling is done without smoothing.
 * Sets the canvas to to the desired width and height, or calculate these values from the image dimensions and scale.
 * @param {object} canvas - Canvas DOM element to draw the image on.
 * @param {object} image - Image to draw.
 * @param {number} [scale=1] Scale of image, 1 is original size.
 * @param {object} [srcStart=[0,0]] Start point of the source image.
 * @param {object} [srcSize] Size of the region to capture from the source image. Defaults to (image size - srcStart).
 * @param {object} [destStart=[0,0]] Destination point of the drawn image.
 * @param {object} [destSize] Size of drawn image. Defaults to srcSize * scale.
 */
function drawResizedImage(canvas, image, scale, srcStart, srcSize, destStart, destSize) {
    if (scale === undefined || scale == null)
        scale = 1;
    if (srcStart === undefined || srcStart == null)
        srcStart = [0, 0];
    if (srcSize === undefined || srcSize == null)
        srcSize = [image.width - srcStart[0], image.height - srcStart[1]];
    if (destStart === undefined || destStart == null)
        destStart = [0, 0];
    if (destSize === undefined || destSize == null)
        destSize = [srcSize[0] * scale, srcSize[1] * scale];

    if (canvas.width != destSize[0] || canvas.height != destSize[1]) {
        $(canvas).css("width", destSize[0]);
        $(canvas).css("height", destSize[1]);
        canvas.setAttribute("width", destSize[0]);
        canvas.setAttribute("height", destSize[1]);
    }

    var context = canvas.getContext('2d');

    context.mozImageSmoothingEnabled = false;
    context.msImageSmoothingEnabled = false;
    context.imageSmoothingEnabled = false;
    context.drawImage(image, srcStart[0], srcStart[1], srcSize[0], srcSize[1], destStart[0], destStart[1], destSize[0], destSize[1]);
}

/**
 * Reads the first file of the given input, and sets it's onload function to the given callback.
 * @param {object} input - File input DOM element with an image file selected.
 * @param {function} callback - Image onload function.
 * @param {boolean} isSpritesheet - Checks whether the spritesheet or single image is loaded
 */
function readDrawableInput(input, callback, isSpritesheet) {

    if (input.files && input.files.length > 0) {
        // Use first file. By default, users shouldn't be able to select multiple files.
        var file = input.files[0];

        var fr = new FileReader();
        fr.onload = function() {
            var img = new Image;
            img.onload = callback;
            img.src = this.result;
            if (!isSpritesheet) {
                emoteSet[$("#sheetSelect").val()][$("#emoteSelect").val()][$("#frameSelect").val()] = img;
            }
        };
        fr.readAsDataURL(file);

    }
}

// a handler function to check whether we dropped a spritesheet or a single frame or nothing
function checkIfSpritesheet() {
    image = this;

    if (image.height == 344 && image.width == 387) {
        return spritesheetLoaded(this, true);
    } else if (image.height == 43 && image.width == 43) {
        return drawableLoaded();
    } else {
        showAlert("#warning-dimension-frame");
    }
}


// returns true if every pixel's uint32 representation is 0 (or "blank")
function isCanvasBlank(canvas) {
    const context = canvas.getContext('2d');
  
    const pixelBuffer = new Uint32Array(
      context.getImageData(0, 0, canvas.width, canvas.height).data.buffer
    );
  
    return !pixelBuffer.some(color => color !== 0);
  }


/**
 * Called when the selected drawable is loaded.
 * Validates the dimensions and renders the image on the preview.
 */
function drawableLoaded() {
    var image = emoteSet[$("#sheetSelect").val()][$("#emoteSelect").val()][$("#frameSelect").val()];

    // Always clear the canvas first to ensure no old image remains
    clearCanvas($("#cvsPreviewHat").get(0));

    if (image == null || image.width == 0 || image.height == 0) {
        $("#cvsPreviewHat").fadeOut(100);
        return;
    }

    if (image.height != 43 || image.width != 43) {
        showAlert("#warning-dimension-frame");
        return;
    }

    // Animate the preview update in three steps.
    var step = -1;

    var steps = [
        // Step one: Fade out the previous hat, if there is one.
        function() {
            if ($("#cvsPreviewHat").is(":visible"))
                $("#cvsPreviewHat").fadeOut(100, nextStep);
            else
                nextStep();
        },
        // Step two: Draw the new hat, and animate the preview dimensions if the new hat is bigger or smaller than the previous hat.
        function() {
            emoteSet[$("#sheetSelect").val()][$("#emoteSelect").val()][$("#frameSelect").val()] = image;
            drawResizedImage($("#cvsPreviewHat").get(0), image, 4);
            $("#cvsPreviewHat").animate({
                bottom: 86,
                left: 86
            }, 100, nextStep);
        },
        // Step three: Fade in the new hat.
        function() {
            $("#cvsPreviewHat").fadeIn(100);
        }
    ];

    var nextStep = function() {
        if (typeof(steps[++step]) == "function")
            steps[step]();
    };

    nextStep();
}


/**
 * Called when the spritesheet is loaded.
 * Validates the dimensions and fills the images
 */
function spritesheetLoaded(e, fromDrop) {
    var sheet = fromDrop ? e : this;

    if (sheet == null)
        return;

    if (sheet.height != 344 || sheet.width != 387) {
        showAlert("#warning-dimension-sheet");
        return;
    }

    for (var x = 0; x < sheetPieces.length; ++x) {
        for (var y = 0; y < sheetPieces[x].length; ++y) {
            if (sheetPieces[x][y] != null) {
                var canvas = document.createElement("canvas");
                canvas.width = 43;
                canvas.height = 43;
                var context = canvas.getContext("2d");
                context.drawImage(sheet, y * 43, x * 43, 43, 43, 0, 0, canvas.width, canvas.height);
                if (!isCanvasBlank(canvas)) {
                    var img = new Image;
                    img.src = canvas.toDataURL();
                    emoteSet[$("#sheetSelect").val()][sheetPieces[x][y][0]][sheetPieces[x][y][1]] = img;
                } else {
                    emoteSet[$("#sheetSelect").val()][sheetPieces[x][y][0]][sheetPieces[x][y][1]] = null;
                }
            }
        }
    }

    var image = new Image;
    var emote = emoteSet[$("#sheetSelect").val()][$("#emoteSelect").val()][$("#frameSelect").val()]

    image.src = emote ? emote.src : "";
    drawableLoaded();
    sheetImported = true;
    spritesheet = sheet;
}


/**
 * Generates a hat export for the current image, and starts a download for it.
 */
function generatePlainText(toClipboard) {

    if (confirmDrawable(true)) {
        var obj = generateItem()

        if (toClipboard) {
            navigator.clipboard.writeText(JSON.stringify(obj));
            showAlert("#success-clipboard")
        } else {
            var blob = new Blob([JSON.stringify(obj, null, 2)], {
                type: "text/plain;charset=utf8"
            });
            saveToFile(blob, "CustomAnimatedHat.json");
        }
    }
}

/**
 * Generates a hat export for the current image, and starts a download for it.
 */
function generateCommand(toClipboard) {

    if (confirmDrawable(true)) {

        var obj = generateItem()
        // Escape quotes in JSON parameters to prevent early end of stream (since parameters are wrapped in ' in the chat processor).
        var cmd = "/spawnitem " + obj.name + " 1 '" + JSON.stringify(obj.parameters).replace(/'/g, "\\'") + "'";

        if (toClipboard) {
            navigator.clipboard.writeText(cmd);
            showAlert("#success-clipboard")
        } else {
            var blob = new Blob([cmd], {
                type: "text/plain;charset=utf8"
            });
            saveToFile(blob, "CustomAnimatedHatCommand.txt");
        }        
    }
}

function generateItem() {
    var directives = generateDirectives(emoteSet["default"]["idle"]["1"]);
    let hideBody = $("#checkHide")[0].checked;
    var obj = {
        name: hideBody ? "frogghead" : "eyepatchhead",
        count: 1,
        parameters: {
            directives: "",
            description: "This is my hat! Give it back!",
            femaleFrames: "head.png",
            inventoryIcon: "head.png",
            maleFrames: "head.png",
            mask: "mask.png",
            maxStack: 1,
            price: 0,
            advancedHatter: {
                version: 2
            },
            rarity: "common",
            shortdescription: "Custom Hat",
            statusEffects: [],
            tooltipKind: "armor"
        }

    };

    // Double escaping to work around the escaping done by the chat processor (ew).
    obj.parameters.shortdescription = $("#itemName").get(0).value.replace(/\\/g, "\\\\").replace(/"/g, "\\\"");
    obj.parameters.description = $("#itemDescription").get(0).value.replace(/\\/g, "\\\\").replace(/"/g, "\\\"");
    obj.parameters.rarity = $("#itemRarity").get(0).value;
    obj.parameters.directives = directives;

    if ($("#checkMask").get(0).checked) {
        var mask = "?submask=/items/armors/decorative/hats/eyepatch/mask.png";
        obj.parameters.mask = mask;
    }

    if ($("#checkHide").get(0).checked) {
        var itemName = "frogghead";
        obj.parameters.itemName = itemName;
    }
    
    obj.parameters.advancedHatter.default = {}
    for (var emote in emoteSet["default"]) {
        if (emote == "idle")
            obj.parameters.advancedHatter.default[emote] = [directives];
        else if (!jQuery.isEmptyObject(emoteSet["default"][emote])) {
            obj.parameters.advancedHatter.default[emote] = [];
            for (var frame in emoteSet["default"][emote]) {
                var dir = generateDirectives(emoteSet["default"][emote][frame]);
                obj.parameters.advancedHatter.default[emote].push(dir);
            }
        }
    }

    if (Object.keys(emoteSet["reverse"]).some(emote => !jQuery.isEmptyObject(emoteSet["reverse"][emote]))) {
        obj.parameters.advancedHatter.reverse = {}
        for (var emote in emoteSet["reverse"]) {
            if (!jQuery.isEmptyObject(emoteSet["reverse"][emote])) {
                obj.parameters.advancedHatter.reverse[emote] = [];
                for (var frame in emoteSet["reverse"][emote]) {
                    var dir = generateDirectives(emoteSet["reverse"][emote][frame]);
                    obj.parameters.advancedHatter.reverse[emote].push(dir);
                }
            }
        }
    }

    return obj
}

/**
 * Generates a emoteDirective export for the current spritesheet, and starts a download for it.
 */
function generateEmoteDirectiveFile() {
    if (spritesheet == null) {
        showAlert("#warning-empty-sheet");
        return;
    }

    getImageData('https://i.imgur.com/VY4KOrx.png', function(templateImageData) {
        var directive = generateEmoteDirective($('#raceSelect').val(), templateImageData);
        var blob = new Blob([directive], {
            type: "text/plain;charset=utf8"
        });
        saveToFile(blob, "EmoteDirective.txt");
    });
}

/**
 * Get the ImageData from the image
 * @param {string} source - path to the image file
 **/
function getImageData(source, callback) {
    var image = new Image();

    image.onload = function() {
        var canvas = document.createElement('canvas');
        canvas.width = this.naturalWidth;
        canvas.height = this.naturalHeight;
        var ctx = canvas.getContext('2d');

        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        // Return the image data
        callback(ctx.getImageData(0, 0, canvas.width, canvas.height).data);
    };
    image.src = source;
    image.crossOrigin = "Anonymous";
}


/**
 * Generate and returns a directives string to form the given image.
 * @param {object} image - Image to create directives for.
 * @returns {string} Formatted directives string.
 */
function generateDirectives(image) {
    if (image == null)
        return;

    // Draw the selected image on a canvas, to fetch the pixel data.
    var canvas = document.createElement("canvas");
    canvas.width = 43;
    canvas.height = 43;

    var canvasContext = canvas.getContext("2d");

    // Flip image upside down, to compensate for the 'inverted' y axis.
    canvasContext.translate(0, image.height);
    canvasContext.scale(1, -1);
    canvasContext.drawImage(image, 0, 0, 43, 43);
    canvasContext.scale(1, 1);

    var drawables = "?crop;0;0;2;2?replace;fff0=fff;0000=fff?setcolor=fff" +
        "?blendmult=/objects/outpost/customsign/signplaceholder.png" +
        "?replace;01000101=01000100;02000101=2B000100?replace;01000201=01002B00;02000201=2B002B00" +
        "?scale=43?crop=0;0;43;43";

    drawables += "?replace";

    var imageData = canvasContext.getImageData(0, 0, 43, 43).data;

    for (var x = 0; x < 43; x++) {
        for (var y = 0; y < 43; y++) {
            var R = imageData[x * 4 + y * 43 * 4];
            var G = imageData[x * 4 + y * 43 * 4 + 1];
            var B = imageData[x * 4 + y * 43 * 4 + 2];
            var A = imageData[x * 4 + y * 43 * 4 + 3];
            if (A == 0)
                continue;

            drawables += ";" + pad(x.toString(16), 2) + "00" + pad(y.toString(16), 2) + "00=" + colorToHex([R, G, B, A]);
        }
    }
    return drawables;
}

/**
 * Generate and returns an emoteDirective string to form the given spritesheet.
 * Thanks to NeetleBoy for his hard work.
 * @param {ImageData} templateData - ImageData of the template
 * @returns {string} Formatted directives string.
 */
function generateEmoteDirective(race, templateData) {

    // Draw the selected image on a canvas, to fetch the pixel data.
    var canvas = document.createElement("canvas");
    canvas.width = 387;
    canvas.height = 344;

    var canvasContext = canvas.getContext("2d");
    canvasContext.drawImage(spritesheet, 0, 0);
    var imageData = canvasContext.getImageData(0, 0, canvas.width, canvas.height).data;

    var directive = speciesDirectives[race];

    directive += "?replace";

    for (var px = 0, ct = canvas.width * canvas.height * 4; px < ct; px += 4) {
        var frame = sheetPieces[Math.floor(px / 4 / 43 / 43 / 9)][Math.floor(px / 4 / 43 % 9)];
		
        if (frame != null) {
            var r = imageData[px];
            var g = imageData[px + 1];
            var b = imageData[px + 2];
            var a = imageData[px + 3];

            var tr = templateData[px];
            var tg = templateData[px + 1];
            var tb = templateData[px + 2];
            var ta = templateData[px + 3];

            if (a != 0 && (r != tr || g != tg || b != tb)) {
                directive += ";" + colorToHex([tr, tg, tb, 0]) + "=" + colorToHex([r, g, b, a]);
			}
		}
    }

    return directive;
}

/**
 * Save the file and prompt the cookie about the mod
**/

function saveToFile(content, name) {
	var modVersion = getCookie('advancedHatterModVersion');
	var latestReleaseTag = getReleaseTag();
	if (modVersion == null || modVersion.localeCompare(latestReleaseTag) != 0) {
	  $('#modConfirmModal').modal('show');
	  $('#modConfirmModal').on('hidden.bs.modal', function () {
		saveAs(content, name);
        showAlert('#success-alert');
	  });
	  
	  
	  pathname = location.pathname;
	  myDomain = pathname.substring(0,pathname.lastIndexOf('/')) +'/';
	  // Set the expiration date of the cookie
	  var largeExpDate = new Date ();
	  largeExpDate.setTime(largeExpDate.getTime() + (365 * 24 * 3600 * 1000));
	  setCookie('advancedHatterModVersion',latestReleaseTag,largeExpDate);
	} else {
		saveAs(content, name);
        showAlert('#success-alert');
	}
	
}