/**
 * Advanced Hatter (https://github.com/KrashV/Starbound-AdvancedHatter)
 * This work is licensed under a Creative Commons Attribution 3.0 Unported License.
 * https://creativecommons.org/licenses/by/3.0/
 */

var drawableImage;
var emoteSelect = {
	idle: {},
	closed: {},
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

var emoteFrames = {
	idle: 1,
	closed: 1,
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
    drawableImage = null;
    readDrawableInput(this, drawableLoaded);
    this.value = "";
  });

  // Bind remove image
  $("#btnRemoveImage").click(function() {
    emoteSelect[$("#emoteSelect").val()][$("#frameSelect").val()] = null;
	drawableLoaded(null);
  });
  
  // Bind generate output
  $("#btnPlainText").click(generatePlainText);
  $("#btnCommand").click(generateCommand);

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
	
	drawableLoaded(emoteSelect[this.value]["1"]);
	clearCanvas($("#cvsPreviewEmote").get(0));
	imageEmote.src = "imgs/emotes/" + this.value + ".png";
  });
  
  // Bind frame selection
  $("#frameSelect").change(function() {
	  drawableLoaded(emoteSelect[$("#emoteSelect").val()][this.value]);
  }
  );
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

  if (emoteSelect["idle"]["1"] == null) {
	  if (alertUser)
		alert("Provide at least the image for idle.");
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
    srcStart = [0,0];
  if (srcSize === undefined || srcSize == null)
    srcSize = [image.width - srcStart[0], image.height - srcStart[1]];
  if (destStart === undefined || destStart == null)
    destStart = [0,0];
  if (destSize === undefined || destSize == null)
    destSize = [srcSize[0] * scale, srcSize[1] * scale];

  if (canvas.width != destSize[0] || canvas.height != destSize[1])
  {
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
 */
function readDrawableInput(input, callback) {

  if (input.files && input.files.length > 0) {
    // Use first file. By default, users shouldn't be able to select multiple files.
    var file = input.files[0];

    var fr = new FileReader();
    fr.onload = function() {
      var img = new Image;
      img.onload = callback;	  
      img.src = this.result;
	  emoteSelect[$("#emoteSelect").val()][$("#frameSelect").val()] = img;
    };
    fr.readAsDataURL(file);

  }
}

/**
 * Called when the selected drawable is loaded.
 * Validates the dimensions and renders the image on the preview.
 */
function drawableLoaded() {
  var image = emoteSelect[$("#emoteSelect").val()][$("#frameSelect").val()];

  if (image == null) {
      $("#cvsPreviewHat").fadeOut(100, nextStep);
	  return;
  }
  if (image.height != 43 || image.width != 43) {
    alert("The image can be only 43x43");
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
      drawableImage = image;
	  emoteSelect[$("#emoteSelect").val()][$("#frameSelect").val()] = image;
      clearCanvas($("#cvsPreviewHat").get(0));
      drawResizedImage($("#cvsPreviewHat").get(0), drawableImage, 4);
      $("#cvsPreviewHat").animate({bottom: 86, left: 86}, 200, nextStep);
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
 * Generates a hat export for the current image, and starts a download for it.
 */
function generatePlainText() {

  if (confirmDrawable(true)) {
    var directives = generateDirectives(emoteSelect["idle"]["1"]);

    var obj = { "count" : 1,
               "name" : "eyepatchhead",
               "parameters" :  {
                 directives : "",
                 description : "This is my hat! Give it back!",
                 femaleFrames : "head.png",
                 inventoryIcon : "head.png",
                 itemName : "eyepatchhead",
                 maleFrames : "head.png",
                 mask : "mask.png",
                 maxStack : 1,
                 price : 0,
				 advancedHatter: {},
                 rarity : "common",
                 shortdescription : "Custom Hat",
                 statusEffects : [],
                 tooltipKind : "armor"
               }
              };

    obj.parameters.shortdescription = $("#itemName").get(0).value;
    obj.parameters.description = $("#itemDescription").get(0).value;
    obj.parameters.rarity = $("#itemRarity").get(0).value;
    obj.parameters.directives = directives;

    if ($("#checkMask").get(0).checked)
    {
      var mask = "?submask=/items/armors/decorative/hats/eyepatch/mask.png";
      obj.parameters.mask = mask;
    }

	for (var emote in emoteSelect) {
		if (emote == "idle")
			obj.parameters.advancedHatter[emote] = [directives];
		else if (!jQuery.isEmptyObject(emoteSelect[emote])) {
			obj.parameters.advancedHatter[emote] = [];
			for (var frame in emoteSelect[emote]) {
				alert(frame);
				var dir = generateDirectives(emoteSelect[emote][frame]);
				obj.parameters.advancedHatter[emote].push(dir);
			}
		}
	}
    var blob = new Blob([ JSON.stringify(obj, null, 2) ], {type: "text/plain;charset=utf8"});
    saveAs(blob, "CustomAnimatedHat.json");
  }
}

/**
 * Generates a hat export for the current image, and starts a download for it.
 */
function generateCommand() {

  if (confirmDrawable(true)) {
    var directives = generateDirectives(emoteSelect["idle"]["1"]);

    var obj = {
                directives : "",
                description : "This is my hat! Give it back!",
                femaleFrames : "head.png",
                inventoryIcon : "head.png",
                itemName : "eyepatchhead",
                maleFrames : "head.png",
                mask : "mask.png",
                maxStack : 1,
                price : 0,
				advancedHatter: {},
                rarity : "common",
                shortdescription : "Custom Hat",
                statusEffects : [],
                tooltipKind : "armor"
              };
    
    // Double escaping to work around the escaping done by the chat processor (ew).
    obj.shortdescription = $("#itemName").get(0).value.replace(/\\/g, "\\\\").replace(/"/g, "\\\"");
    obj.description = $("#itemDescription").get(0).value.replace(/\\/g, "\\\\").replace(/"/g, "\\\"");
    obj.rarity = $("#itemRarity").get(0).value;
    obj.directives = directives;

    if ($("#checkMask").get(0).checked)
    {
      var mask = "?submask=/items/armors/decorative/hats/eyepatch/mask.png";
      obj.mask = mask;
    }
	
	for (var emote in emoteSelect) {
		if (emote == "idle")
			obj.advancedHatter[emote] = [directives];
		else if (!jQuery.isEmptyObject(emoteSelect[emote])) {
			obj.advancedHatter[emote] = [];
			for (var frame in emoteSelect[emote]) {
				alert(frame);
				var dir = generateDirectives(emoteSelect[emote][frame]);
				obj.advancedHatter[emote].push(dir);
			}
		}
	}
    // Escape quotes in JSON parameters to prevent early end of stream (since parameters are wrapped in ' in the chat processor).
    var cmd = "/spawnitem eyepatchhead 1 '" + JSON.stringify(obj).replace(/'/g, "\\'") + "'";
    
    var blob = new Blob([ cmd ], {type: "text/plain;charset=utf8"});
    saveAs(blob, "CustomAnimatedHatCommand.txt");
  }
}

/**
 * Generate and returns a directives string to form the given image.
 * Uses the blendmult on white pixels method to concatenate signplaceholder assets.
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
  canvasContext.scale(1,-1);
  canvasContext.drawImage(image, 0, 0, 43, 43);
  canvasContext.scale(1,1);
  
  var drawables = "?crop;0;0;2;2?replace;fff0=fff;0000=fff?setcolor=fff" +
                "?blendmult=/objects/outpost/customsign/signplaceholder.png" +
                "?replace;01000101=01000100;02000101=2B000100?replace;01000201=01002B00;02000201=2B002B00" +
                "?scale=43?crop=0;0;43;43";
				
  drawables += "?replace";
  
	for (var x = 0; x < 43; x++)
	{
		for (var y = 0; y < 43; y++)
		{
			var pixelC = canvasContext.getImageData(x, y, 1, 1).data;
			if (pixelC[3] == 0) 
				continue;
		
			drawables += ";" + pad(x.toString(16), 2) + "00" + pad(y.toString(16), 2) + "00=" + colorToHex(pixelC);
		}
	}
  return drawables;
}