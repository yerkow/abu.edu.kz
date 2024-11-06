jQuery(document).ready(function($){
  $.bvi({
    'bvi_target' : '.bvi-open', // Класс ссылки включения плагина
    "bvi_theme" : "white", // Цвет сайта
    "bvi_font" : "arial", // Шрифт
    "bvi_font_size" : 16, // Размер шрифта
    "bvi_letter_spacing" : "normal", // Межбуквенный интервал
    "bvi_line_height" : "normal", // Междустрочный интервал
    "bvi_images" : true, // Изображения
    "bvi_reload" : false, // Перезагрузка страницы при выключении плагина
    "bvi_fixed" : false, // Фиксирование панели для слабовидящих вверху страницы
    "bvi_tts" : true, // Синтез речи
    "bvi_flash_iframe" : true, // Встроенные элементы (видео, карты и тд.)
    "bvi_hide" : false // Скрывает панель для слабовидящих и показывает иконку панели.
  });
});
/*!
 * Button visually impaired v2.0
 */
(function ($) {
  "use strict";
  $.bvi = function (options) {
    var default_setting = $.extend({
      'bvi_target': '.bvi-open',
      'bvi_theme': 'white',
      'bvi_font': 'arial',
      'bvi_font_size': 16,
      'bvi_letter_spacing': 'normal',
      'bvi_line_height': 'normal',
      'bvi_images': true,
      'bvi_reload': false,
      'bvi_fixed': true,
      'bvi_tts': true,
      'bvi_flash_iframe': true,
      'bvi_hide': false
    }, options);

    var versionIE = detectIE();
    var selector = default_setting.bvi_target;
    var check_bvi_theme;
    var check_bvi_font;
    var check_bvi_letter_spacing;
    var check_bvi_line_height;
    var check_bvi_font_size;
    var check_bvi_images;
    var check_bvi_fixed;
    var check_bvi_tts;
    var check_bvi_flash_iframe;
    var check_bvi_hide;
    var checkError;
    var bvi_tts_synth = window.speechSynthesis;
    var bvi_tts_support_browser = (bvi_tts_synth !== undefined) ? true : false;
    var sm = '576';
    var md = '768';
    var lg = '992';
    var xl = '1200';
    var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

    console.log('Bvi console: ready Button visually impaired v2.0');

    if (bvi_tts_support_browser) {
      setInterval(function () {
        if (bvi_tts_synth.speaking == false) {
          $('.bvi-tts-play').removeClass('disabled');
          $('.bvi-tts-pause').addClass('disabled');
          $('.bvi-tts-resume').addClass('disabled');
          $('.bvi-tts-stop').addClass('disabled');
        }
      }, 1000);
      console.log('Bvi console: Чтение речи поддерживается в данной браузере');
    } else {
      console.log('Bvi console: Чтение речи не поддерживается в данном браузере');
    }

    $(window).on('resize', function () {
      var width_resize = (window.innerWidth > 0) ? window.innerWidth : screen.width;

      if (width_resize >= lg) {
        $('.bvi-panel-container').show();
      }

      if (width_resize <= lg) {
        $('.bvi-panel-container').removeClass('bvi-container').addClass('bvi-container-fluid');
      } else {
        $('.bvi-panel-container').removeClass('bvi-container-fluid').addClass('bvi-container');
      }
    });

    function detectIE() {
      var ua = window.navigator.userAgent;
      var msie = ua.indexOf('MSIE ');

      if (msie > 0) {
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
      }

      var trident = ua.indexOf('Trident/');
      if (trident > 0) {
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
      }

      var edge = ua.indexOf('Edge/');
      if (edge > 0) {
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
      }

      return false;
    }

    function bvi_tts_speak(text) {
      if (Cookies.get('bvi-tts') === 'true' && bvi_tts_support_browser) {
        bvi_tts_synth.cancel();
        var voices = bvi_tts_synth.getVoices();
        var chunkLength = 120;
        var pattRegex = new RegExp('^[\\s\\S]{' + Math.floor(chunkLength / 2) + ',' + chunkLength + '}[.!?,]{1}|^[\\s\\S]{1,' + chunkLength + '}$|^[\\s\\S]{1,' + chunkLength + '} ');
        var $array = [];
        var $text = text;

        while ($text.length > 0) {
          $array.push($text.match(pattRegex)[0]);
          $text = $text.substring($array[$array.length - 1].length);
        }

        $.each($array, function () {
          var speechUtterance = new SpeechSynthesisUtterance(this.trim());
          speechUtterance.volume = 1;
          speechUtterance.rate = 1;
          speechUtterance.pitch = 1;
          speechUtterance.lang = 'ru-RU';

          speechUtterance.onstart = function (event) {
            console.log(speechUtterance);
            //console.log('Start called for: ' + event.utterance.text + '-' + event.charIndex);
          };

          speechUtterance.onend = function (event) {
            //console.log(event.name + ' end ' + event.elapsedTime + ' milliseconds.');
          };

          speechUtterance.onpause = function (event) {
            //console.log(event.name + ' pause ' + event.elapsedTime + ' milliseconds.');
          };

          speechUtterance.onresume = function (event) {
            //console.log(event.name + ' resume ' + event.elapsedTime + ' milliseconds.');
          };

          speechUtterance.onboundary = function (event) {
            /*
                        var world = bvi_getWordAt(event.utterance.text, event.charIndex);
                        var src_str = $(id).text();
                        var term = world.replace(/(\s+)/, "(<[^>]+>)*$1(<[^>]+>)*");
                        var pattern = new RegExp("(" + term + ")", "gi");
                        src_str = src_str.replace(pattern, "<mark>$1</mark>");
                        src_str = src_str.replace(/(<mark>[^<>]*)((<[^>]+>)+)([^<>]*<\/mark>)/, "$1</mark>$2<mark>$4");
                        $(id).html(src_str);
                        console.log(event.utterance.text);
                        */
          };

          for (var i = 0; i < voices.length; i++) {
            if (voices[i].lang === 'ru-RU' && voices[i].voiceURI === 'Google русский') {
              speechUtterance.voice = voices[i];
              speechUtterance.voiceURI = voices[i].voiceURI;
            } else if (voices[i].lang === 'ru-RU' && voices[i].voiceURI === 'Microsoft Irina Desktop - Russian') {
              speechUtterance.voice = voices[i];
              speechUtterance.voiceURI = voices[i].voiceURI;
            } else if (voices[i].lang === 'ru-RU' && voices[i].voiceURI === 'urn:moz-tts:sapi:Microsoft Irina Desktop - Russian?ru-RU') {
              speechUtterance.voice = voices[i];
              speechUtterance.voiceURI = voices[i].voiceURI;
            } else if (voices[i].lang === 'ru-RU' && voices[i].voiceURI === 'com.apple.speech.synthesis.voice.yuri') {
              speechUtterance.voice = voices[i];
              speechUtterance.voiceURI = voices[i].voiceURI;
            }
          }

          bvi_tts_synth.speak(speechUtterance);
        });
      }
    }

    function bvi_getWordAt(str, pos) {
      str = String(str);
      pos = Number(pos) >>> 0;
      var left = str.slice(0, pos + 1).search(/\S+$/),
        right = str.slice(pos).search(/\s/);
      if (right < 0) {
        return str.slice(left);
      }
      return str.slice(left, right + pos);
    }

    function bvi_tts_player() {
      var bvi_tts_text_id;
      var bvi_tts_voice_target = $(".bvi-tts");

      $('.bvi-tts-link').remove();
      $('.bvi-tts-text').contents().unwrap();

      if (Cookies.get('bvi-tts') === 'true' && bvi_tts_support_browser) {
        bvi_tts_voice_target.each(function (index) {
          bvi_tts_text_id = 'bvi-tts-text-id-' + index;
          $(this).wrapInner('<div class="bvi-tts-text ' + bvi_tts_text_id + '"></div>');
          $(this).prepend('<div class="bvi-tts-link bvi-tts-link-id-' + index + '" data-bvi-tts-class-text=".' + bvi_tts_text_id + '" data-bvi-tts-link-id=".bvi-tts-link-id-' + index + '">\n' +
            '    <a href="#" class="bvi-tts-play bvi-link">Воспроизвести</a>\n' +
            '    <a href="#" class="bvi-tts-pause bvi-link disabled">Пауза</i></a>\n' +
            '    <a href="#" class="bvi-tts-resume bvi-link disabled">Продолжить</i></a>\n' +
            '    <a href="#" class="bvi-tts-stop bvi-link disabled">Стоп</i></a>\n' +
            '</div>');
        });

        $('.bvi-tts-link').show();

        $('.bvi-tts-play').click(function () {
          bvi_tts_synth.cancel();
          var bvi_tts_class = $(this).parent().data('bvi-tts-class-text');
          var bvi_tts_links_id = $(this).parent().data('bvi-tts-link-id');
          var bvi_tts_class_text = $(bvi_tts_class).text();

          bvi_tts_speak(bvi_tts_class_text);

          $('.bvi-tts-play').removeClass('disabled');
          $('.bvi-tts-pause').addClass('disabled');
          $('.bvi-tts-resume').addClass('disabled');
          $('.bvi-tts-stop').addClass('disabled');
          $(bvi_tts_links_id + ' .bvi-tts-play').addClass('disabled');
          $(bvi_tts_links_id + ' .bvi-tts-pause').removeClass('disabled');
          $(bvi_tts_links_id + ' .bvi-tts-stop').removeClass('disabled');
          return false;
        });

        $('.bvi-tts-resume').click(function () {
          var bvi_tts_links_id = $(this).parent().data('bvi-tts-link-id');
          $(bvi_tts_links_id + ' .bvi-tts-pause').removeClass('disabled');
          $(this).addClass('disabled');
          bvi_tts_synth.resume();
          return false;
        });

        $('.bvi-tts-pause').click(function () {
          var bvi_tts_links_id = $(this).parent().data('bvi-tts-link-id');
          $(bvi_tts_links_id + ' .bvi-tts-resume').removeClass('disabled');
          $(this).addClass('disabled');
          bvi_tts_synth.pause();
          return false;
        });

        $('.bvi-tts-stop').click(function () {
          bvi_tts_synth.cancel();
          var bvi_tts_links_id = $(this).parent().data('bvi-tts-link-id');
          $(this).addClass('disabled');
          $(bvi_tts_links_id + ' .bvi-tts-play').removeClass('disabled');
          $(bvi_tts_links_id + ' .bvi-tts-pause').addClass('disabled');
          $(bvi_tts_links_id + ' .bvi-tts-resume').addClass('disabled');
          return false;
        });
      } else {
        $('.bvi-tts-link').remove();
        $('.bvi-tts-text').contents().unwrap();
      }
    }

    function bvi_click() {
      $("#bvi-panel-close, .bvi-panel-close, #bvi-toggler-close").click(function () {

        bvi_tts_speak('Обычная версия сайта');

        if (Cookies.get("bvi-reload") === 'true') {
          document.location.reload(true);
        }

        $(".bvi-body *").each(function () {
          var $this = $(this);
          var background_image = $this.css("background-image");
          var pattern = background_image.replace(/.*\s?url\([\'\"]?/, '').replace(/[\'\"]?\).*/, '');
          if (pattern != 'none') {
            if (versionIE == 11 || versionIE == 10 || versionIE == 9) {
              var data_bvi_img_original = $this.attr('data-bvi-background-image-original') || pattern;
              $this.css("background-image", "url(" + data_bvi_img_original + ")");
              $this.removeClass('bvi-background-image');
            }
          }
        });

        $("img").each(function () {
          $(this).show();
          $('div.bvi-img').remove();
          $(this).removeClass("bvi-background-image");
          if (versionIE == 11 || versionIE == 10 || versionIE == 9) {
            var data_bvi_img_original = $(this).attr('data-bvi-img-original') || this.src;
            this.src = data_bvi_img_original;
          }
        });

        Cookies.remove("bvi-panel-active", {path: "/"});
        Cookies.remove("bvi-font-size", {path: "/"});
        Cookies.remove("bvi-theme", {path: "/"});
        Cookies.remove("bvi-images", {path: "/"});
        Cookies.remove("bvi-line-height", {path: "/"});
        Cookies.remove("bvi-letter-spacing", {path: "/"});
        Cookies.remove("bvi-tts", {path: "/"});
        Cookies.remove("bvi-font-family", {path: "/"});
        Cookies.remove("bvi-panel-hide", {path: "/"});
        Cookies.remove("bvi-flash-iframe", {path: "/"});
        Cookies.remove("bvi-reload", {path: "/"});

        active();
        return false;
      });

      $('#bvi-panel-hide, #bvi-toggler-menu-hide').click(function () {
        $('.bvi-panel').toggle(0);
        $('.bvi-link-top').toggle(0);
        set('data-bvi-panel-hide', 'bvi-panel-hide', true);
        bvi_tts_speak('Панель скрыта');
        return false;
      });

      $('#bvi-panel-show').click(function () {
        $('.bvi-panel').toggle(0);
        $('.bvi-link-top').toggle(0);
        set('data-bvi-panel-hide', 'bvi-panel-hide', false);
        bvi_tts_speak('Панель открыта');
        return false;
      });

      $('#bvi-setting').click(function () {
        $('.bvi-setting-menu').toggle(0);
        $(this).toggleClass("active");
        bvi_tts_speak('Дополнительные настройки');
        return false;
      });

      $('#bvi-toggler').click(function () {
        $('.bvi-panel-container').toggle(0);
        $(this).toggleClass("active");
        bvi_tts_speak('Меню');
        return false;
      });

      $('#bvi-setting-close').click(function () {
        $('.bvi-setting-menu').toggle(0);
        $('#bvi-setting').toggleClass("active");
        bvi_tts_speak('Дополнительные настройки закрыты');
        return false;
      });

      $('#bvi-font-size-less').click(function () {
        var size = parseFloat(Cookies.get("bvi-font-size")) - 1;
        $(this).addClass('active').siblings().removeClass('active');
        $('#bvi-font-size').text(size);
        if (size != 0) {
          set('data-bvi-size', 'bvi-font-size', size);
          bvi_tts_speak('Размер шрифта уменьшен');
        }
        return false;
      });

      $('#bvi-font-size-more').click(function () {
        var size = parseFloat(Cookies.get("bvi-font-size")) + 1;
        $(this).addClass('active').siblings().removeClass('active');
        $('#bvi-font-size').text(size);
        if (size != 40) {
          set('data-bvi-size', 'bvi-font-size', size);
          bvi_tts_speak('Размер шрифта увеличен');
        }
        return false;
      });

      $("#bvi-theme-white").click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        set('data-bvi-theme', 'bvi-theme', 'white');
        bvi_tts_speak('Цвет сайта черным по белому');
        return false;
      });

      $("#bvi-theme-black").click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        set('data-bvi-theme', 'bvi-theme', 'black');
        bvi_tts_speak('Цвет сайта белым по черному');
        return false;
      });

      $("#bvi-theme-blue").click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        set('data-bvi-theme', 'bvi-theme', 'blue');
        bvi_tts_speak('Цвет сайта тёмно-синим по голубому');
        return false;
      });

      $("#bvi-theme-brown").click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        set('data-bvi-theme', 'bvi-theme', 'brown');
        bvi_tts_speak('Цвет сайта коричневым по бежевому');
        return false;
      });

      $("#bvi-theme-green").click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        set('data-bvi-theme', 'bvi-theme', 'green');
        bvi_tts_speak('Цвет сайта зеленым по тёмно-коричневому');
        return false;
      });

      $('#bvi-images-true').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        set('data-bvi-images', 'bvi-images', true);
        bvi_tts_speak('Изображения включены');
        return false;
      });

      $('#bvi-images-false').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        set('data-bvi-images', 'bvi-images', false);
        bvi_tts_speak('Изображения выключены');
        return false;
      });

      $('#bvi-images-grayscale').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        set('data-bvi-images', 'bvi-images', 'grayscale');
        bvi_tts_speak('Изображения чёрно-белые');
        return false;
      });

      $("#bvi-line-height-normal").click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        set('data-bvi-line-height', 'bvi-line-height', 'normal');
        bvi_tts_speak('Междустрочный интервал cтандартный');
        return false;
      });

      $("#bvi-line-height-average").click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        set('data-bvi-line-height', 'bvi-line-height', 'average');
        bvi_tts_speak('Междустрочный интервал средний');
        return false;
      });

      $("#bvi-line-height-big").click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        set('data-bvi-line-height', 'bvi-line-height', 'big');
        bvi_tts_speak('Междустрочный интервал большой');
        return false;
      });

      $("#bvi-letter-spacing-normal").click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        set('data-bvi-letter-spacing', 'bvi-letter-spacing', 'normal');
        bvi_tts_speak('Межбуквенный интервал одинарный');
        return false;
      });

      $("#bvi-letter-spacing-average").click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        set('data-bvi-letter-spacing', 'bvi-letter-spacing', 'average');
        bvi_tts_speak('Межбуквенный интервал полуторный');
        return false;
      });

      $("#bvi-letter-spacing-big").click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        set('data-bvi-letter-spacing', 'bvi-letter-spacing', 'big');
        bvi_tts_speak('Межбуквенный интервал двойной');
        return false;
      });

      $("#bvi-font-family-arial").click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        set('data-bvi-font-family', 'bvi-font-family', 'arial');
        bvi_tts_speak('Шрифт без засечек');
        return false;
      });

      $("#bvi-font-family-times").click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        set('data-bvi-font-family', 'bvi-font-family', 'times');
        bvi_tts_speak('Шрифт с засечками');
        return false;
      });

      $("#bvi-flash-iframe-true").click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        set('data-bvi-flash-iframe', 'bvi-flash-iframe', true);
        bvi_tts_speak('Включить встроенные элементы');
        return false;
      });

      $("#bvi-flash-iframe-false").click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        set('data-bvi-flash-iframe', 'bvi-flash-iframe', false);
        bvi_tts_speak('Выключить встроенные элементы');
        return false;
      });

      $("#bvi-tts-true").click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        set('data-bvi-tts', 'bvi-tts', true);
        bvi_tts_speak('Синтез речи включён');
        bvi_tts_player();
        return false;
      });

      $("#bvi-tts-false").click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        set('data-bvi-tts', 'bvi-tts', false);
        bvi_tts_speak('Синтез речи выключён');
        bvi_tts_player();
        return false;
      });

      $("#bvi-settings-default").click(function () {
        $('#bvi-theme-' + Cookies.get("bvi-theme")).removeClass('active');
        $('#bvi-images-' + Cookies.get("bvi-images")).removeClass('active');
        $('#bvi-line-height-' + Cookies.get("bvi-line-height")).removeClass('active');
        $('#bvi-letter-spacing-' + Cookies.get("bvi-letter-spacing")).removeClass('active');
        $('#bvi-font-family-' + Cookies.get("bvi-font-family")).removeClass('active');
        $('#bvi-flash-iframe-' + Cookies.get("bvi-flash-iframe")).removeClass('active');
        $('#bvi-tts-' + Cookies.get("bvi-tts")).removeClass('active');

        $('#bvi-theme-' + default_setting.bvi_theme).addClass('active');
        $('#bvi-images-' + default_setting.bvi_images).addClass('active');
        $('#bvi-line-height-' + default_setting.bvi_line_height).addClass('active');
        $('#bvi-letter-spacing-' + default_setting.bvi_letter_spacing).addClass('active');
        $('#bvi-font-family-' + default_setting.bvi_font).addClass('active');
        $('#bvi-flash-iframe-' + default_setting.bvi_flash_iframe).addClass('active');
        $('#bvi-tts-' + default_setting.bvi_tts).addClass('active');

        $('#bvi-font-size').text(default_setting.bvi_font_size);

        set('data-bvi-size', 'bvi-font-size', default_setting.bvi_font_size);
        set('data-bvi-theme', 'bvi-theme', default_setting.bvi_theme);
        set('data-bvi-images', 'bvi-images', default_setting.bvi_images);
        set('data-bvi-line-height', 'bvi-line-height', default_setting.bvi_line_height);
        set('data-bvi-letter-spacing', 'bvi-letter-spacing', default_setting.bvi_letter_spacing);
        set('data-bvi-font-family', 'bvi-font-family', default_setting.bvi_font);
        set('data-bvi-flash-iframe', 'bvi-flash-iframe', default_setting.bvi_flash_iframe);
        set('data-bvi-tts', 'bvi-tts', default_setting.bvi_tts);
        bvi_tts_speak('Настройки по умолчанию');
        bvi_tts_player();
        return false;
      });
    }

    function set(data, set_cookies, set_cookies_data) {
      Cookies.set(set_cookies, set_cookies_data, {path: "/", expires: 1});
      $(".bvi-body").attr(data, Cookies.get(set_cookies));
      get_image();
    }

    function set_active_link() {
      $('#bvi-theme-' + Cookies.get("bvi-theme")).addClass('active');
      $('#bvi-images-' + Cookies.get("bvi-images")).addClass('active');
      $('#bvi-line-height-' + Cookies.get("bvi-line-height")).addClass('active');
      $('#bvi-letter-spacing-' + Cookies.get("bvi-letter-spacing")).addClass('active');
      $('#bvi-font-family-' + Cookies.get("bvi-font-family")).addClass('active');
      $('#bvi-flash-iframe-' + Cookies.get("bvi-flash-iframe")).addClass('active');
      $('#bvi-tts-' + Cookies.get("bvi-tts")).addClass('active');
    }

    function get() {
      if (typeof Cookies.get("bvi-font-size") === 'undefined'
        || typeof Cookies.get("bvi-theme") === 'undefined'
        || typeof Cookies.get("bvi-images") === 'undefined'
        || typeof Cookies.get("bvi-line-height") === 'undefined'
        || typeof Cookies.get("bvi-letter-spacing") === 'undefined'
        || typeof Cookies.get("bvi-tts") === 'undefined'
        || typeof Cookies.get("bvi-font-family") === 'undefined'
        || typeof Cookies.get("bvi-panel-hide") === 'undefined'
        || typeof Cookies.get("bvi-flash-iframe") === 'undefined'
        || typeof Cookies.get("bvi-reload") === 'undefined'
        || typeof Cookies.get("bvi-fixed") === 'undefined'
      ) {
        Cookies.set("bvi-font-size", default_setting.bvi_font_size, {path: "/", expires: 1});
        Cookies.set("bvi-theme", default_setting.bvi_theme, {path: "/", expires: 1});
        Cookies.set("bvi-images", default_setting.bvi_images, {path: "/", expires: 1});
        Cookies.set("bvi-line-height", default_setting.bvi_line_height, {path: "/", expires: 1});
        Cookies.set("bvi-letter-spacing", default_setting.bvi_letter_spacing, {path: "/", expires: 1});
        Cookies.set("bvi-tts", default_setting.bvi_tts, {path: "/", expires: 1});
        Cookies.set("bvi-font-family", default_setting.bvi_font, {path: "/", expires: 1});
        Cookies.set("bvi-panel-hide", default_setting.bvi_hide, {path: "/", expires: 1});
        Cookies.set("bvi-flash-iframe", default_setting.bvi_flash_iframe, {path: "/", expires: 1});
        Cookies.set("bvi-reload", default_setting.bvi_reload, {path: "/", expires: 1});
        Cookies.set("bvi-fixed", default_setting.bvi_fixed, {path: "/", expires: 1});
      }

      $('.bvi-body').attr({
        'data-bvi-panel-hide': Cookies.get("bvi-panel-hide"),
        'data-bvi-size': Cookies.get("bvi-font-size"),
        'data-bvi-theme': Cookies.get("bvi-theme"),
        'data-bvi-images': Cookies.get("bvi-images"),
        'data-bvi-line-height': Cookies.get("bvi-line-height"),
        'data-bvi-letter-spacing': Cookies.get("bvi-letter-spacing"),
        'data-bvi-font-family': Cookies.get("bvi-font-family"),
        'data-bvi-flash-iframe': Cookies.get("bvi-flash-iframe"),
        'data-bvi-reload': Cookies.get("bvi-reload"),
        'data-bvi-tts': Cookies.get("bvi-tts"),
        'data-bvi-fixed': Cookies.get("bvi-fixed")
      });

      $('#bvi-font-size').text(Cookies.get("bvi-font-size"));

      var bvi_panel = Cookies.get("bvi-panel-hide");

      if (bvi_panel === 'false' || typeof bvi_panel === 'undefined') {
        $('.bvi-panel').show();
        $('.bvi-link-top').hide();
      } else {
        $('.bvi-panel').hide();
        $('.bvi-link-top').show("slow");
      }
    }

    function get_image() {
      var bvi_images = Cookies.get("bvi-images");

      $(".bvi-body *").each(function () {
        var $this = $(this);
        var background_image = $this.css("background-image");
        var pattern = background_image.replace(/^url\(['"]?/,'').replace(/['"]?\)$/,'');

        if (pattern != 'none') {
          $(this).addClass('bvi-background-image');
        }
      });

      $("img").each(function () {
        $(this).addClass('bvi-img');
      });

      if (bvi_images === 'true') {
        $("img").each(function () {
          $(this).show();
          $('div.bvi-img').remove();
          //$(this).removeClass("bvi-background-image");
          if (versionIE == 11 || versionIE == 10 || versionIE == 9) {
            var data_bvi_img_original = $(this).attr('data-bvi-img-original') || this.src;
            this.src = data_bvi_img_original;
          }
        });

        $(".bvi-body *").each(function () {
          var $this = $(this);
          var background_image = $this.css("background-image");
          var pattern = background_image.replace(/^url\(['"]?/,'').replace(/['"]?\)$/,'');
          if (pattern != 'none') {
            if (versionIE == 11 || versionIE == 10 || versionIE == 9) {
              var r = '^(https?|http)://[-a-zA-Z0-9+&@#/%?=~_|!:,.;]*[-a-zA-Z0-9+&@#/%=~_|]';
              if(pattern.match(r)) {
                var data_bvi_img_original = $this.attr('data-bvi-background-image-original') || pattern;
                $this.css("background-image", "url(" + data_bvi_img_original + ")");
              }
            }
          }
        });
      }

      if (bvi_images === 'false') {
        $('div.bvi-img').remove();

        $("img").each(function () {
          $(this).hide();
          //$(this).removeClass("bvi-background-image");
          var alt = this.alt || 'Изображение';
          var imgClass = $(this).attr("class") || 'bvi-class-none';
          var imgId = $(this).attr("id") || 'bvi-id-none';
          $(this).after($('<div class="' + imgClass + '" id="' + imgId + '" style="width: ' + $(this).get(0).naturalWidth + 'px; height: 100%;">').html(alt));
        });
      }

      if (bvi_images === 'grayscale') {
        $("img").each(function () {
          $(this).show();
          $('div.bvi-img').remove();
          //$(this).removeClass("bvi-background-image");
          if (versionIE == 11 || versionIE == 10 || versionIE == 9) {
            $(this).attr('data-bvi-img-original', this.src);
            if (location.hostname === extractHostname(this.src)) {
              var src = grayscale(this.src);
              this.src = src;
            } else {
              return false;
            }
          }
        });

        $(".bvi-body *").each(function () {
          var $this = $(this);
          var background_image = $this.css("background-image");
          var pattern = background_image.replace(/^url\(['"]?/,'').replace(/['"]?\)$/,'');
          if (pattern != 'none') {
            if (versionIE == 11 || versionIE == 10 || versionIE == 9) {
              var r = '^(https?|http)://[-a-zA-Z0-9+&@#/%?=~_|!:,.;]*[-a-zA-Z0-9+&@#/%=~_|]';
              if(pattern.match(r)) {
                var src_pattern = grayscale(pattern);
                $this.attr('data-bvi-background-image-original', pattern);
                $this.css("background-image", "url(" + src_pattern + ") !important");
              }
            }
          }
        });
      }
    }

    function extractHostname(url) {
      var hostname;
      if (url.indexOf("//") > -1) {
        hostname = url.split('/')[2];
      } else {
        hostname = url.split('/')[0];
      }
      hostname = hostname.split(':')[0];
      hostname = hostname.split('?')[0];

      return hostname;
    }

    function grayscale(src) {
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');
      var imgObj = new Image();
      //imgObj.crossOrigin = "Anonymous";
      imgObj.src = src;
      canvas.width = imgObj.naturalWidth || imgObj.offsetWidth || imgObj.width;
      canvas.height = imgObj.naturalHeight || imgObj.offsetHeight || imgObj.height;
      ctx.drawImage(imgObj, 0, 0);
      var imgPixels = ctx.getImageData(0, 0, canvas.width, canvas.height);

      for (var y = 0; y < imgPixels.height; y++) {
        for (var x = 0; x < imgPixels.width; x++) {
          var i = (y * 4) * imgPixels.width + x * 4;
          var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
          imgPixels.data[i] = avg;
          imgPixels.data[i + 1] = avg;
          imgPixels.data[i + 2] = avg;
        }
      }

      ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);

      return canvas.toDataURL();
    }

    function active() {
      if (versionIE == 8 || versionIE == 7 || versionIE == 6 || versionIE == 5) {
        console.log('Bvi console: Браузер не поддерживается.');
        alert(confirm('Браузер не поддерживается.'));
      } else {
        if (Cookies.get('bvi-panel-active') === 'true') {
          $(selector).addClass('bvi-hide').after($('<a href="#" class="bvi-panel-close" title="Обычная версия сайта">Обычная версия сайта</a>'));
          panel();
          bvi_tts_player();
          bvi_click();
          set_active_link();
          if (bvi_tts_support_browser === false) {
            Cookies.set("bvi-tts", false, {path: "/", expires: 1});
            $('#bvi-tts-true').remove();
            $('#bvi-tts-false').remove();
          }
        } else {
          bvi_tts_player();
          $(selector).removeClass('bvi-hide');
          $('.bvi-panel-close').remove();
          $(".bvi-panel").remove();
          $(".bvi-link-top").remove();
          $('body > .bvi-body').contents().unwrap();
          $('.bvi-tts-link').remove();
          $('.bvi-tts-text').contents().unwrap();
        }
      }
    }

    function panel() {
      $('head').append('<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">');
      $('body').wrapInner('<div class="bvi-body"></div>');
      $('body').prepend('<div class="bvi-panel">\n' +
        '    <div class="bvi-container-fluid">\n' +
        '        <div class="bvi-row bvi-no-gutters">\n' +
        '            <div class="bvi-col-12">\n' +
        '                <div class="bvi-panel-toggler">\n' +
        '                    <a href="#" id="bvi-toggler" class="bvi-link" title="Меню">Меню</a>\n' +
        '                    <a href="#" id="bvi-toggler-close" class="bvi-link" title="Обычная версия сайта">Обычная версия сайта</a>\n' +
        '                    <a href="#" id="bvi-toggler-menu-hide" class="bvi-link" title="Скрыть панель"><i class="bvi-images bvi-images-minus-square-o "></i></a>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <div class="bvi-panel-container bvi-container">\n' +
        '        <div class="bvi-row bvi-no-gutters">\n' +
        '            <div class="bvi-col-6 bvi-col-sm-6 bvi-col-md-3 bvi-col-lg-3 bvi-col-xl-3 bvi-text-center">\n' +
        '                <div class="bvi-title">Размер шрифта <span id="bvi-font-size"></span> px</div>\n' +
        '                <a href="#" id="bvi-font-size-less" class="bvi-link" title="Уменьшить размер шрифта">A -</a>\n' +
        '                <a href="#" id="bvi-font-size-more" class="bvi-link" title="Увеличить размер шрифта">A +</a>\n' +
        '            </div>\n' +
        '            <div class="bvi-col-6 bvi-col-sm-6 bvi-col-md-3 bvi-col-lg-3 bvi-col-xl-3 bvi-text-center">\n' +
        '                <div class="bvi-title">Цвета сайта</div>\n' +
        '                <a href="#" id="bvi-theme-white" class="bvi-link bvi-link-white " title="Черным по белому">Ц</a>\n' +
        '                <a href="#" id="bvi-theme-black" class="bvi-link bvi-link-black" title="Белым по черному">Ц</a>\n' +
        '                <a href="#" id="bvi-theme-blue" class="bvi-link bvi-link-blue" title="Темно-синим по голубому">Ц</a>\n' +
        '                <a href="#" id="bvi-theme-brown" class="bvi-link bvi-link-brown" title="Коричневым по бежевому">Ц</a>\n' +
        '                <a href="#" id="bvi-theme-green" class="bvi-link bvi-link-green" title="Зеленым по темно-коричневому">Ц</a>\n' +
        '            </div>\n' +
        '            <div class="bvi-col-6 bvi-col-sm-6 bvi-col-md-3 bvi-col-lg-3 bvi-col-xl-2 bvi-text-center">\n' +
        '                <div class="bvi-title">Изображения</div>\n' +
        '                <a href="#" id="bvi-images-true" class="bvi-link" title="Изображения включены"><i class="bvi-images bvi-images-on"></i></a>\n' +
        '                <a href="#" id="bvi-images-false" class="bvi-link" title="Изображения выключены"><i class="bvi-images bvi-images-off"></i></a>\n' +
        '                <a href="#" id="bvi-images-grayscale" class="bvi-link" title="Изображения черно-белые"><i class="bvi-images bvi-images-adjust"></i></a>\n' +
        '            </div>\n' +
        '            <div class="bvi-col-6 bvi-col-sm-6 bvi-col-md-3 bvi-col-lg-3 bvi-col-xl-4 bvi-text-center">\n' +
        '                <div class="bvi-title">Дополнительно</div>\n' +
        '                <a href="#" id="bvi-tts-true" class="bvi-link" title=""><i class="bvi-images bvi-images-volume-on"></i></a>\n' +
        '                <a href="#" id="bvi-tts-false" class="bvi-link"><i class="bvi-images bvi-images-volume-off"></i></a>\n' +
        '                <a href="#" id="bvi-setting" class="bvi-link" title="Настройки">Настройки</a>\n' +
        '                <a href="#" id="bvi-panel-close" class="bvi-link" title="Обычная версия сайта"><i class="bvi-images bvi-images-eye-slash"></i></a>\n' +
        '                <a href="#" id="bvi-panel-hide" class="bvi-link" title="Скрыть панель"><i class="bvi-images bvi-images-minus-square-o"></i></a>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="bvi-setting-menu bvi-hide-lg">\n' +
        '            <div class="bvi-row bvi-no-gutters">\n' +
        '                <div class="bvi-col-sm-12 bvi-col-md-6 bvi-col-lg-4 bvi-col-xl-4 bvi-text-center">\n' +
        '                    <div class="bvi-title">Междустрочный интервал</div>\n' +
        '                    <a href="#" id="bvi-line-height-normal" class="bvi-link" title="Междустрочный интервал стандартный">Стандартный</a>\n' +
        '                    <a href="#" id="bvi-line-height-average" class="bvi-link" title="Междустрочный интервал средний">Средний</a>\n' +
        '                    <a href="#" id="bvi-line-height-big" class="bvi-link" title="Междустрочный интервал большой">Большой</a>\n' +
        '                </div>\n' +
        '                <div class="bvi-col-sm-12 bvi-col-md-6 bvi-col-lg-5 bvi-col-xl-5 bvi-text-center">\n' +
        '                    <div class="bvi-title">Межбуквенный интервал</div>\n' +
        '                    <a href="#" id="bvi-letter-spacing-normal" class="bvi-link" title="Межбуквенный интервал одинарный">Одинарный</a>\n' +
        '                    <a href="#" id="bvi-letter-spacing-average" class="bvi-link"\n' +
        '                       title="Межбуквенный интервал полуторный">Полуторный</a>\n' +
        '                    <a href="#" id="bvi-letter-spacing-big" class="bvi-link" title="Межбуквенный интервал двойной">Двойной</a>\n' +
        '                </div>\n' +
        '                <div class="bvi-col-sm-12 bvi-col-md-6 bvi-col-lg-3 bvi-col-xl-3 bvi-text-center">\n' +
        '                    <div class="bvi-title">Шрифт</div>\n' +
        '                    <a href="#" id="bvi-font-family-arial" class="bvi-link" title="Шрифт без засечек">Без засечек</a>\n' +
        '                    <a href="#" id="bvi-font-family-times" class="bvi-link" title="Шрифт с засечками">С засечками</a>\n' +
        '                </div>\n' +
        '                <div class="bvi-col-sm-12 bvi-col-md-6 bvi-col-lg-6 bvi-col-xl-6 bvi-text-center">\n' +
        '                    <div class="bvi-title">Встроенные элементы (Видео, карты и тд.)</div>\n' +
        '                    <a href="#" id="bvi-flash-iframe-true" class="bvi-link" title="Включить">Включить</a>\n' +
        '                    <a href="#" id="bvi-flash-iframe-false" class="bvi-link" title="Выключить">Выключить</a>\n' +
        '                </div>\n' +
        '                <div class="bvi-col-sm-12 bvi-col-md-12 bvi-col-lg-6 bvi-col-xl-6 bvi-text-right">\n' +
        '                    <div class="bvi-title">&nbsp;</div>\n' +
        '                    <a href="#" id="bvi-settings-default" class="bvi-link" title="Вернуть стандартные настройки">Настройки\n' +
        '                        по умолчанию</a>\n' +
        '                    <a href="#" id="bvi-setting-close" class="bvi-link" title="Закрыть панель">Закрыть панель</a>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <div class="bvi-row bvi-mt">\n' +
        '                <div class="bvi-col-12 bvi-text-center">\n' +
        '                    <a href="http://bvi.isvek.ru/" class="bvi-link-copy" target="_blank" title="bvi.isvek.ru v2.0">bvi.isvek.ru</a>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>\n' +
        '<a href="#" id="bvi-panel-show" class="bvi-link bvi-link-top"><i class="bvi-images bvi-images-eye"></i></a>');

      if (width >= lg) {
        $('.bvi-panel-container').show();
      }

      if (width <= lg) {
        $('.bvi-panel-container').removeClass('bvi-container').addClass('bvi-container-fluid');
      } else {
        $('.bvi-panel-container').removeClass('bvi-container-fluid').addClass('bvi-container');
      }

      var scroll = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

      if (scroll > 99) {
        if (Cookies.get("bvi-fixed") == 'true') {
          $(".bvi-panel").addClass("bvi-fixed-top");
        }
      }

      $(window).scroll(function () {
        if ($(this).scrollTop() >= 99) {
          if (Cookies.get("bvi-fixed") == 'true') {
            $(".bvi-panel").addClass('bvi-fixed-top');
          }
        } else {
          $(".bvi-panel").removeClass("bvi-fixed-top");
        }
      });

      get();
      get_image();
    }

    if (default_setting.bvi_theme == 'white' ||
      default_setting.bvi_theme == 'black' ||
      default_setting.bvi_theme == 'blue' ||
      default_setting.bvi_theme == 'brown' ||
      default_setting.bvi_theme == 'green') {
      check_bvi_theme = true;
    } else {
      check_bvi_theme = false;
      checkError = ['bvi_theme'];
    }

    if (default_setting.bvi_font == 'times' || default_setting.bvi_font == 'arial') {
      check_bvi_font = true;
    } else {
      check_bvi_font = false;
      checkError = ['bvi_font'];
    }

    if (default_setting.bvi_letter_spacing == 'normal' || default_setting.bvi_letter_spacing == 'average' || default_setting.bvi_letter_spacing == 'big') {
      check_bvi_letter_spacing = true;
    } else {
      check_bvi_letter_spacing = false;
      checkError = ['bvi_letter_spacing'];
    }

    if (default_setting.bvi_line_height == 'normal' || default_setting.bvi_line_height == 'average' || default_setting.bvi_line_height == 'big') {
      check_bvi_line_height = true;
    } else {
      check_bvi_line_height = false;
      checkError = ['bvi_line_height'];
    }

    if (default_setting.bvi_font_size == 0) {
      check_bvi_font_size = false;
      checkError = ['bvi_font_size'];
    } else if (default_setting.bvi_font_size <= 40) {
      check_bvi_font_size = true;
    } else {
      check_bvi_font_size = false;
      checkError = ['bvi_font_size'];
    }

    if (default_setting.bvi_images === false || default_setting.bvi_images === true || default_setting.bvi_images === 'grayscale') {
      check_bvi_images = true;
    } else {
      check_bvi_images = false;
      checkError = ['bvi_images'];
    }

    if (default_setting.bvi_fixed === false || default_setting.bvi_fixed === true) {
      check_bvi_fixed = true;
    } else {
      check_bvi_fixed = false;
      checkError = ['bvi_fixed'];
    }

    if (default_setting.bvi_tts === false || default_setting.bvi_tts === true) {
      check_bvi_tts = true;
    } else {
      check_bvi_tts = false;
      checkError = ['bvi_tts'];
    }

    if (default_setting.bvi_flash_iframe === false || default_setting.bvi_flash_iframe === true) {
      check_bvi_flash_iframe = true;
    } else {
      check_bvi_flash_iframe = false;
      checkError = ['bvi_flash_iframe'];
    }

    if (default_setting.bvi_hide === false || default_setting.bvi_hide === true) {
      check_bvi_hide = true;
    } else {
      check_bvi_hide = false;
      checkError = ['bvi_hide'];
    }

    if (check_bvi_theme === true &&
      check_bvi_font === true &&
      check_bvi_letter_spacing === true &&
      check_bvi_line_height === true &&
      check_bvi_font_size === true &&
      check_bvi_images === true &&
      check_bvi_fixed === true &&
      check_bvi_flash_iframe === true &&
      check_bvi_tts === true &&
      check_bvi_hide === true) {
      if ($(selector).length) {
        $(selector).click(function () {
          Cookies.set('bvi-panel-active', true, {path: "/", expires: 1});
          active();
          bvi_tts_speak('Версия сайта для слабовидящих');
          return false;
        });
      } else {
        console.log('Bvi console: Неправильный параметр - [bvi_target]');
      }
      active();
    } else {
      console.log('Bvi console: Неправильный параметр - [' + checkError + ']');
    }
  };
})(jQuery);

/*
== malihu jquery custom scrollbar plugin ==
Version: 3.1.5
Plugin URI: http://manos.malihu.gr/jquery-custom-content-scroller
Author: malihu
Author URI: http://manos.malihu.gr
License: MIT License (MIT)
*/

/*
Copyright Manos Malihutsakis (email: manos@malihu.gr)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

/*
The code below is fairly long, fully commented and should be normally used in development.
For production, use either the minified jquery.mCustomScrollbar.min.js script or
the production-ready jquery.mCustomScrollbar.concat.min.js which contains the plugin
and dependencies (minified).
*/

(function(factory){
  if(typeof define==="function" && define.amd){
    define(["jquery"],factory);
  }else if(typeof module!=="undefined" && module.exports){
    module.exports=factory;
  }else{
    factory(jQuery,window,document);
  }
}(function($){
  (function(init){
    var _rjs=typeof define==="function" && define.amd, /* RequireJS */
      _njs=typeof module !== "undefined" && module.exports, /* NodeJS */
      _dlp=("https:"==document.location.protocol) ? "https:" : "http:", /* location protocol */
      _url="cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js";
    if(!_rjs){
      if(_njs){
        require("jquery-mousewheel")($);
      }else{
        /* load jquery-mousewheel plugin (via CDN) if it's not present or not loaded via RequireJS
			(works when mCustomScrollbar fn is called on window load) */
        $.event.special.mousewheel || $("head").append(decodeURI("%3Cscript src="+_dlp+"//"+_url+"%3E%3C/script%3E"));
      }
    }
    init();
  }(function(){

    /*
	----------------------------------------
	PLUGIN NAMESPACE, PREFIX, DEFAULT SELECTOR(S)
	----------------------------------------
	*/

    var pluginNS="mCustomScrollbar",
      pluginPfx="mCS",
      defaultSelector=".mCustomScrollbar",





      /*
	----------------------------------------
	DEFAULT OPTIONS
	----------------------------------------
	*/

      defaults={
        /*
			set element/content width/height programmatically
			values: boolean, pixels, percentage
				option						default
				-------------------------------------
				setWidth					false
				setHeight					false
			*/
        /*
			set the initial css top property of content
			values: string (e.g. "-100px", "10%" etc.)
			*/
        setTop:0,
        /*
			set the initial css left property of content
			values: string (e.g. "-100px", "10%" etc.)
			*/
        setLeft:0,
        /*
			scrollbar axis (vertical and/or horizontal scrollbars)
			values (string): "y", "x", "yx"
			*/
        axis:"y",
        /*
			position of scrollbar relative to content
			values (string): "inside", "outside" ("outside" requires elements with position:relative)
			*/
        scrollbarPosition:"inside",
        /*
			scrolling inertia
			values: integer (milliseconds)
			*/
        scrollInertia:950,
        /*
			auto-adjust scrollbar dragger length
			values: boolean
			*/
        autoDraggerLength:true,
        /*
			auto-hide scrollbar when idle
			values: boolean
				option						default
				-------------------------------------
				autoHideScrollbar			false
			*/
        /*
			auto-expands scrollbar on mouse-over and dragging
			values: boolean
				option						default
				-------------------------------------
				autoExpandScrollbar			false
			*/
        /*
			always show scrollbar, even when there's nothing to scroll
			values: integer (0=disable, 1=always show dragger rail and buttons, 2=always show dragger rail, dragger and buttons), boolean
			*/
        alwaysShowScrollbar:0,
        /*
			scrolling always snaps to a multiple of this number in pixels
			values: integer, array ([y,x])
				option						default
				-------------------------------------
				snapAmount					null
			*/
        /*
			when snapping, snap with this number in pixels as an offset
			values: integer
			*/
        snapOffset:0,
        /*
			mouse-wheel scrolling
			*/
        mouseWheel:{
          /*
				enable mouse-wheel scrolling
				values: boolean
				*/
          enable:true,
          /*
				scrolling amount in pixels
				values: "auto", integer
				*/
          scrollAmount:"auto",
          /*
				mouse-wheel scrolling axis
				the default scrolling direction when both vertical and horizontal scrollbars are present
				values (string): "y", "x"
				*/
          axis:"y",
          /*
				prevent the default behaviour which automatically scrolls the parent element(s) when end of scrolling is reached
				values: boolean
					option						default
					-------------------------------------
					preventDefault				null
				*/
          /*
				the reported mouse-wheel delta value. The number of lines (translated to pixels) one wheel notch scrolls.
				values: "auto", integer
				"auto" uses the default OS/browser value
				*/
          deltaFactor:"auto",
          /*
				normalize mouse-wheel delta to -1 or 1 (disables mouse-wheel acceleration)
				values: boolean
					option						default
					-------------------------------------
					normalizeDelta				null
				*/
          /*
				invert mouse-wheel scrolling direction
				values: boolean
					option						default
					-------------------------------------
					invert						null
				*/
          /*
				the tags that disable mouse-wheel when cursor is over them
				*/
          disableOver:["select","option","keygen","datalist","textarea"]
        },
        /*
			scrollbar buttons
			*/
        scrollButtons:{
          /*
				enable scrollbar buttons
				values: boolean
					option						default
					-------------------------------------
					enable						null
				*/
          /*
				scrollbar buttons scrolling type
				values (string): "stepless", "stepped"
				*/
          scrollType:"stepless",
          /*
				scrolling amount in pixels
				values: "auto", integer
				*/
          scrollAmount:"auto"
          /*
				tabindex of the scrollbar buttons
				values: false, integer
					option						default
					-------------------------------------
					tabindex					null
				*/
        },
        /*
			keyboard scrolling
			*/
        keyboard:{
          /*
				enable scrolling via keyboard
				values: boolean
				*/
          enable:true,
          /*
				keyboard scrolling type
				values (string): "stepless", "stepped"
				*/
          scrollType:"stepless",
          /*
				scrolling amount in pixels
				values: "auto", integer
				*/
          scrollAmount:"auto"
        },
        /*
			enable content touch-swipe scrolling
			values: boolean, integer, string (number)
			integer values define the axis-specific minimum amount required for scrolling momentum
			*/
        contentTouchScroll:25,
        /*
			enable/disable document (default) touch-swipe scrolling
			*/
        documentTouchScroll:true,
        /*
			advanced option parameters
			*/
        advanced:{
          /*
				auto-expand content horizontally (for "x" or "yx" axis)
				values: boolean, integer (the value 2 forces the non scrollHeight/scrollWidth method, the value 3 forces the scrollHeight/scrollWidth method)
					option						default
					-------------------------------------
					autoExpandHorizontalScroll	null
				*/
          /*
				auto-scroll to elements with focus
				*/
          autoScrollOnFocus:"input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",
          /*
				auto-update scrollbars on content, element or viewport resize
				should be true for fluid layouts/elements, adding/removing content dynamically, hiding/showing elements, content with images etc.
				values: boolean
				*/
          updateOnContentResize:true,
          /*
				auto-update scrollbars each time each image inside the element is fully loaded
				values: "auto", boolean
				*/
          updateOnImageLoad:"auto",
          /*
				auto-update scrollbars based on the amount and size changes of specific selectors
				useful when you need to update the scrollbar(s) automatically, each time a type of element is added, removed or changes its size
				values: boolean, string (e.g. "ul li" will auto-update scrollbars each time list-items inside the element are changed)
				a value of true (boolean) will auto-update scrollbars each time any element is changed
					option						default
					-------------------------------------
					updateOnSelectorChange		null
				*/
          /*
				extra selectors that'll allow scrollbar dragging upon mousemove/up, pointermove/up, touchend etc. (e.g. "selector-1, selector-2")
					option						default
					-------------------------------------
					extraDraggableSelectors		null
				*/
          /*
				extra selectors that'll release scrollbar dragging upon mouseup, pointerup, touchend etc. (e.g. "selector-1, selector-2")
					option						default
					-------------------------------------
					releaseDraggableSelectors	null
				*/
          /*
				auto-update timeout
				values: integer (milliseconds)
				*/
          autoUpdateTimeout:60
        },
        /*
			scrollbar theme
			values: string (see CSS/plugin URI for a list of ready-to-use themes)
			*/
        theme:"light",
        /*
			user defined callback functions
			*/
        callbacks:{
          /*
				Available callbacks:
					callback					default
					-------------------------------------
					onCreate					null
					onInit						null
					onScrollStart				null
					onScroll					null
					onTotalScroll				null
					onTotalScrollBack			null
					whileScrolling				null
					onOverflowY					null
					onOverflowX					null
					onOverflowYNone				null
					onOverflowXNone				null
					onImageLoad					null
					onSelectorChange			null
					onBeforeUpdate				null
					onUpdate					null
				*/
          onTotalScrollOffset:0,
          onTotalScrollBackOffset:0,
          alwaysTriggerOffsets:true
        }
        /*
			add scrollbar(s) on all elements matching the current selector, now and in the future
			values: boolean, string
			string values: "on" (enable), "once" (disable after first invocation), "off" (disable)
			liveSelector values: string (selector)
				option						default
				-------------------------------------
				live						false
				liveSelector				null
			*/
      },





      /*
	----------------------------------------
	VARS, CONSTANTS
	----------------------------------------
	*/

      totalInstances=0, /* plugin instances amount */
      liveTimers={}, /* live option timers */
      oldIE=(window.attachEvent && !window.addEventListener) ? 1 : 0, /* detect IE < 9 */
      touchActive=false,touchable, /* global touch vars (for touch and pointer events) */
      /* general plugin classes */
      classes=[
        "mCSB_dragger_onDrag","mCSB_scrollTools_onDrag","mCS_img_loaded","mCS_disabled","mCS_destroyed","mCS_no_scrollbar",
        "mCS-autoHide","mCS-dir-rtl","mCS_no_scrollbar_y","mCS_no_scrollbar_x","mCS_y_hidden","mCS_x_hidden","mCSB_draggerContainer",
        "mCSB_buttonUp","mCSB_buttonDown","mCSB_buttonLeft","mCSB_buttonRight"
      ],





      /*
	----------------------------------------
	METHODS
	----------------------------------------
	*/

      methods={

        /*
			plugin initialization method
			creates the scrollbar(s), plugin data object and options
			----------------------------------------
			*/

        init:function(options){

          var options=$.extend(true,{},defaults,options),
            selector=_selector.call(this); /* validate selector */

          /*
				if live option is enabled, monitor for elements matching the current selector and
				apply scrollbar(s) when found (now and in the future)
				*/
          if(options.live){
            var liveSelector=options.liveSelector || this.selector || defaultSelector, /* live selector(s) */
              $liveSelector=$(liveSelector); /* live selector(s) as jquery object */
            if(options.live==="off"){
              /*
						disable live if requested
						usage: $(selector).mCustomScrollbar({live:"off"});
						*/
              removeLiveTimers(liveSelector);
              return;
            }
            liveTimers[liveSelector]=setTimeout(function(){
              /* call mCustomScrollbar fn on live selector(s) every half-second */
              $liveSelector.mCustomScrollbar(options);
              if(options.live==="once" && $liveSelector.length){
                /* disable live after first invocation */
                removeLiveTimers(liveSelector);
              }
            },500);
          }else{
            removeLiveTimers(liveSelector);
          }

          /* options backward compatibility (for versions < 3.0.0) and normalization */
          options.setWidth=(options.set_width) ? options.set_width : options.setWidth;
          options.setHeight=(options.set_height) ? options.set_height : options.setHeight;
          options.axis=(options.horizontalScroll) ? "x" : _findAxis(options.axis);
          options.scrollInertia=options.scrollInertia>0 && options.scrollInertia<17 ? 17 : options.scrollInertia;
          if(typeof options.mouseWheel!=="object" &&  options.mouseWheel==true){ /* old school mouseWheel option (non-object) */
            options.mouseWheel={enable:true,scrollAmount:"auto",axis:"y",preventDefault:false,deltaFactor:"auto",normalizeDelta:false,invert:false}
          }
          options.mouseWheel.scrollAmount=!options.mouseWheelPixels ? options.mouseWheel.scrollAmount : options.mouseWheelPixels;
          options.mouseWheel.normalizeDelta=!options.advanced.normalizeMouseWheelDelta ? options.mouseWheel.normalizeDelta : options.advanced.normalizeMouseWheelDelta;
          options.scrollButtons.scrollType=_findScrollButtonsType(options.scrollButtons.scrollType);

          _theme(options); /* theme-specific options */

          /* plugin constructor */
          return $(selector).each(function(){

            var $this=$(this);

            if(!$this.data(pluginPfx)){ /* prevent multiple instantiations */

              /* store options and create objects in jquery data */
              $this.data(pluginPfx,{
                idx:++totalInstances, /* instance index */
                opt:options, /* options */
                scrollRatio:{y:null,x:null}, /* scrollbar to content ratio */
                overflowed:null, /* overflowed axis */
                contentReset:{y:null,x:null}, /* object to check when content resets */
                bindEvents:false, /* object to check if events are bound */
                tweenRunning:false, /* object to check if tween is running */
                sequential:{}, /* sequential scrolling object */
                langDir:$this.css("direction"), /* detect/store direction (ltr or rtl) */
                cbOffsets:null, /* object to check whether callback offsets always trigger */
                /*
							object to check how scrolling events where last triggered
							"internal" (default - triggered by this script), "external" (triggered by other scripts, e.g. via scrollTo method)
							usage: object.data("mCS").trigger
							*/
                trigger:null,
                /*
							object to check for changes in elements in order to call the update method automatically
							*/
                poll:{size:{o:0,n:0},img:{o:0,n:0},change:{o:0,n:0}}
              });

              var d=$this.data(pluginPfx),o=d.opt,
                /* HTML data attributes */
                htmlDataAxis=$this.data("mcs-axis"),htmlDataSbPos=$this.data("mcs-scrollbar-position"),htmlDataTheme=$this.data("mcs-theme");

              if(htmlDataAxis){o.axis=htmlDataAxis;} /* usage example: data-mcs-axis="y" */
              if(htmlDataSbPos){o.scrollbarPosition=htmlDataSbPos;} /* usage example: data-mcs-scrollbar-position="outside" */
              if(htmlDataTheme){ /* usage example: data-mcs-theme="minimal" */
                o.theme=htmlDataTheme;
                _theme(o); /* theme-specific options */
              }

              _pluginMarkup.call(this); /* add plugin markup */

              if(d && o.callbacks.onCreate && typeof o.callbacks.onCreate==="function"){o.callbacks.onCreate.call(this);} /* callbacks: onCreate */

              $("#mCSB_"+d.idx+"_container img:not(."+classes[2]+")").addClass(classes[2]); /* flag loaded images */

              methods.update.call(null,$this); /* call the update method */

            }

          });

        },
        /* ---------------------------------------- */



        /*
			plugin update method
			updates content and scrollbar(s) values, events and status
			----------------------------------------
			usage: $(selector).mCustomScrollbar("update");
			*/

        update:function(el,cb){

          var selector=el || _selector.call(this); /* validate selector */

          return $(selector).each(function(){

            var $this=$(this);

            if($this.data(pluginPfx)){ /* check if plugin has initialized */

              var d=$this.data(pluginPfx),o=d.opt,
                mCSB_container=$("#mCSB_"+d.idx+"_container"),
                mCustomScrollBox=$("#mCSB_"+d.idx),
                mCSB_dragger=[$("#mCSB_"+d.idx+"_dragger_vertical"),$("#mCSB_"+d.idx+"_dragger_horizontal")];

              if(!mCSB_container.length){return;}

              if(d.tweenRunning){_stop($this);} /* stop any running tweens while updating */

              if(cb && d && o.callbacks.onBeforeUpdate && typeof o.callbacks.onBeforeUpdate==="function"){o.callbacks.onBeforeUpdate.call(this);} /* callbacks: onBeforeUpdate */

              /* if element was disabled or destroyed, remove class(es) */
              if($this.hasClass(classes[3])){$this.removeClass(classes[3]);}
              if($this.hasClass(classes[4])){$this.removeClass(classes[4]);}

              /* css flexbox fix, detect/set max-height */
              mCustomScrollBox.css("max-height","none");
              if(mCustomScrollBox.height()!==$this.height()){mCustomScrollBox.css("max-height",$this.height());}

              _expandContentHorizontally.call(this); /* expand content horizontally */

              if(o.axis!=="y" && !o.advanced.autoExpandHorizontalScroll){
                mCSB_container.css("width",_contentWidth(mCSB_container));
              }

              d.overflowed=_overflowed.call(this); /* determine if scrolling is required */

              _scrollbarVisibility.call(this); /* show/hide scrollbar(s) */

              /* auto-adjust scrollbar dragger length analogous to content */
              if(o.autoDraggerLength){_setDraggerLength.call(this);}

              _scrollRatio.call(this); /* calculate and store scrollbar to content ratio */

              _bindEvents.call(this); /* bind scrollbar events */

              /* reset scrolling position and/or events */
              var to=[Math.abs(mCSB_container[0].offsetTop),Math.abs(mCSB_container[0].offsetLeft)];
              if(o.axis!=="x"){ /* y/yx axis */
                if(!d.overflowed[0]){ /* y scrolling is not required */
                  _resetContentPosition.call(this); /* reset content position */
                  if(o.axis==="y"){
                    _unbindEvents.call(this);
                  }else if(o.axis==="yx" && d.overflowed[1]){
                    _scrollTo($this,to[1].toString(),{dir:"x",dur:0,overwrite:"none"});
                  }
                }else if(mCSB_dragger[0].height()>mCSB_dragger[0].parent().height()){
                  _resetContentPosition.call(this); /* reset content position */
                }else{ /* y scrolling is required */
                  _scrollTo($this,to[0].toString(),{dir:"y",dur:0,overwrite:"none"});
                  d.contentReset.y=null;
                }
              }
              if(o.axis!=="y"){ /* x/yx axis */
                if(!d.overflowed[1]){ /* x scrolling is not required */
                  _resetContentPosition.call(this); /* reset content position */
                  if(o.axis==="x"){
                    _unbindEvents.call(this);
                  }else if(o.axis==="yx" && d.overflowed[0]){
                    _scrollTo($this,to[0].toString(),{dir:"y",dur:0,overwrite:"none"});
                  }
                }else if(mCSB_dragger[1].width()>mCSB_dragger[1].parent().width()){
                  _resetContentPosition.call(this); /* reset content position */
                }else{ /* x scrolling is required */
                  _scrollTo($this,to[1].toString(),{dir:"x",dur:0,overwrite:"none"});
                  d.contentReset.x=null;
                }
              }

              /* callbacks: onImageLoad, onSelectorChange, onUpdate */
              if(cb && d){
                if(cb===2 && o.callbacks.onImageLoad && typeof o.callbacks.onImageLoad==="function"){
                  o.callbacks.onImageLoad.call(this);
                }else if(cb===3 && o.callbacks.onSelectorChange && typeof o.callbacks.onSelectorChange==="function"){
                  o.callbacks.onSelectorChange.call(this);
                }else if(o.callbacks.onUpdate && typeof o.callbacks.onUpdate==="function"){
                  o.callbacks.onUpdate.call(this);
                }
              }

              _autoUpdate.call(this); /* initialize automatic updating (for dynamic content, fluid layouts etc.) */

            }

          });

        },
        /* ---------------------------------------- */



        /*
			plugin scrollTo method
			triggers a scrolling event to a specific value
			----------------------------------------
			usage: $(selector).mCustomScrollbar("scrollTo",value,options);
			*/

        scrollTo:function(val,options){

          /* prevent silly things like $(selector).mCustomScrollbar("scrollTo",undefined); */
          if(typeof val=="undefined" || val==null){return;}

          var selector=_selector.call(this); /* validate selector */

          return $(selector).each(function(){

            var $this=$(this);

            if($this.data(pluginPfx)){ /* check if plugin has initialized */

              var d=$this.data(pluginPfx),o=d.opt,
                /* method default options */
                methodDefaults={
                  trigger:"external", /* method is by default triggered externally (e.g. from other scripts) */
                  scrollInertia:o.scrollInertia, /* scrolling inertia (animation duration) */
                  scrollEasing:"mcsEaseInOut", /* animation easing */
                  moveDragger:false, /* move dragger instead of content */
                  timeout:60, /* scroll-to delay */
                  callbacks:true, /* enable/disable callbacks */
                  onStart:true,
                  onUpdate:true,
                  onComplete:true
                },
                methodOptions=$.extend(true,{},methodDefaults,options),
                to=_arr.call(this,val),dur=methodOptions.scrollInertia>0 && methodOptions.scrollInertia<17 ? 17 : methodOptions.scrollInertia;

              /* translate yx values to actual scroll-to positions */
              to[0]=_to.call(this,to[0],"y");
              to[1]=_to.call(this,to[1],"x");

              /*
						check if scroll-to value moves the dragger instead of content.
						Only pixel values apply on dragger (e.g. 100, "100px", "-=100" etc.)
						*/
              if(methodOptions.moveDragger){
                to[0]*=d.scrollRatio.y;
                to[1]*=d.scrollRatio.x;
              }

              methodOptions.dur=_isTabHidden() ? 0 : dur; //skip animations if browser tab is hidden

              setTimeout(function(){
                /* do the scrolling */
                if(to[0]!==null && typeof to[0]!=="undefined" && o.axis!=="x" && d.overflowed[0]){ /* scroll y */
                  methodOptions.dir="y";
                  methodOptions.overwrite="all";
                  _scrollTo($this,to[0].toString(),methodOptions);
                }
                if(to[1]!==null && typeof to[1]!=="undefined" && o.axis!=="y" && d.overflowed[1]){ /* scroll x */
                  methodOptions.dir="x";
                  methodOptions.overwrite="none";
                  _scrollTo($this,to[1].toString(),methodOptions);
                }
              },methodOptions.timeout);

            }

          });

        },
        /* ---------------------------------------- */



        /*
			plugin stop method
			stops scrolling animation
			----------------------------------------
			usage: $(selector).mCustomScrollbar("stop");
			*/
        stop:function(){

          var selector=_selector.call(this); /* validate selector */

          return $(selector).each(function(){

            var $this=$(this);

            if($this.data(pluginPfx)){ /* check if plugin has initialized */

              _stop($this);

            }

          });

        },
        /* ---------------------------------------- */



        /*
			plugin disable method
			temporarily disables the scrollbar(s)
			----------------------------------------
			usage: $(selector).mCustomScrollbar("disable",reset);
			reset (boolean): resets content position to 0
			*/
        disable:function(r){

          var selector=_selector.call(this); /* validate selector */

          return $(selector).each(function(){

            var $this=$(this);

            if($this.data(pluginPfx)){ /* check if plugin has initialized */

              var d=$this.data(pluginPfx);

              _autoUpdate.call(this,"remove"); /* remove automatic updating */

              _unbindEvents.call(this); /* unbind events */

              if(r){_resetContentPosition.call(this);} /* reset content position */

              _scrollbarVisibility.call(this,true); /* show/hide scrollbar(s) */

              $this.addClass(classes[3]); /* add disable class */

            }

          });

        },
        /* ---------------------------------------- */



        /*
			plugin destroy method
			completely removes the scrollbar(s) and returns the element to its original state
			----------------------------------------
			usage: $(selector).mCustomScrollbar("destroy");
			*/
        destroy:function(){

          var selector=_selector.call(this); /* validate selector */

          return $(selector).each(function(){

            var $this=$(this);

            if($this.data(pluginPfx)){ /* check if plugin has initialized */

              var d=$this.data(pluginPfx),o=d.opt,
                mCustomScrollBox=$("#mCSB_"+d.idx),
                mCSB_container=$("#mCSB_"+d.idx+"_container"),
                scrollbar=$(".mCSB_"+d.idx+"_scrollbar");

              if(o.live){removeLiveTimers(o.liveSelector || $(selector).selector);} /* remove live timers */

              _autoUpdate.call(this,"remove"); /* remove automatic updating */

              _unbindEvents.call(this); /* unbind events */

              _resetContentPosition.call(this); /* reset content position */

              $this.removeData(pluginPfx); /* remove plugin data object */

              _delete(this,"mcs"); /* delete callbacks object */

              /* remove plugin markup */
              scrollbar.remove(); /* remove scrollbar(s) first (those can be either inside or outside plugin's inner wrapper) */
              mCSB_container.find("img."+classes[2]).removeClass(classes[2]); /* remove loaded images flag */
              mCustomScrollBox.replaceWith(mCSB_container.contents()); /* replace plugin's inner wrapper with the original content */
              /* remove plugin classes from the element and add destroy class */
              $this.removeClass(pluginNS+" _"+pluginPfx+"_"+d.idx+" "+classes[6]+" "+classes[7]+" "+classes[5]+" "+classes[3]).addClass(classes[4]);

            }

          });

        }
        /* ---------------------------------------- */

      },





      /*
	----------------------------------------
	FUNCTIONS
	----------------------------------------
	*/

      /* validates selector (if selector is invalid or undefined uses the default one) */
      _selector=function(){
        return (typeof $(this)!=="object" || $(this).length<1) ? defaultSelector : this;
      },
      /* -------------------- */


      /* changes options according to theme */
      _theme=function(obj){
        var fixedSizeScrollbarThemes=["rounded","rounded-dark","rounded-dots","rounded-dots-dark"],
          nonExpandedScrollbarThemes=["rounded-dots","rounded-dots-dark","3d","3d-dark","3d-thick","3d-thick-dark","inset","inset-dark","inset-2","inset-2-dark","inset-3","inset-3-dark"],
          disabledScrollButtonsThemes=["minimal","minimal-dark"],
          enabledAutoHideScrollbarThemes=["minimal","minimal-dark"],
          scrollbarPositionOutsideThemes=["minimal","minimal-dark"];
        obj.autoDraggerLength=$.inArray(obj.theme,fixedSizeScrollbarThemes) > -1 ? false : obj.autoDraggerLength;
        obj.autoExpandScrollbar=$.inArray(obj.theme,nonExpandedScrollbarThemes) > -1 ? false : obj.autoExpandScrollbar;
        obj.scrollButtons.enable=$.inArray(obj.theme,disabledScrollButtonsThemes) > -1 ? false : obj.scrollButtons.enable;
        obj.autoHideScrollbar=$.inArray(obj.theme,enabledAutoHideScrollbarThemes) > -1 ? true : obj.autoHideScrollbar;
        obj.scrollbarPosition=$.inArray(obj.theme,scrollbarPositionOutsideThemes) > -1 ? "outside" : obj.scrollbarPosition;
      },
      /* -------------------- */


      /* live option timers removal */
      removeLiveTimers=function(selector){
        if(liveTimers[selector]){
          clearTimeout(liveTimers[selector]);
          _delete(liveTimers,selector);
        }
      },
      /* -------------------- */


      /* normalizes axis option to valid values: "y", "x", "yx" */
      _findAxis=function(val){
        return (val==="yx" || val==="xy" || val==="auto") ? "yx" : (val==="x" || val==="horizontal") ? "x" : "y";
      },
      /* -------------------- */


      /* normalizes scrollButtons.scrollType option to valid values: "stepless", "stepped" */
      _findScrollButtonsType=function(val){
        return (val==="stepped" || val==="pixels" || val==="step" || val==="click") ? "stepped" : "stepless";
      },
      /* -------------------- */


      /* generates plugin markup */
      _pluginMarkup=function(){
        var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
          expandClass=o.autoExpandScrollbar ? " "+classes[1]+"_expand" : "",
          scrollbar=["<div id='mCSB_"+d.idx+"_scrollbar_vertical' class='mCSB_scrollTools mCSB_"+d.idx+"_scrollbar mCS-"+o.theme+" mCSB_scrollTools_vertical"+expandClass+"'><div class='"+classes[12]+"'><div id='mCSB_"+d.idx+"_dragger_vertical' class='mCSB_dragger' style='position:absolute;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>","<div id='mCSB_"+d.idx+"_scrollbar_horizontal' class='mCSB_scrollTools mCSB_"+d.idx+"_scrollbar mCS-"+o.theme+" mCSB_scrollTools_horizontal"+expandClass+"'><div class='"+classes[12]+"'><div id='mCSB_"+d.idx+"_dragger_horizontal' class='mCSB_dragger' style='position:absolute;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>"],
          wrapperClass=o.axis==="yx" ? "mCSB_vertical_horizontal" : o.axis==="x" ? "mCSB_horizontal" : "mCSB_vertical",
          scrollbars=o.axis==="yx" ? scrollbar[0]+scrollbar[1] : o.axis==="x" ? scrollbar[1] : scrollbar[0],
          contentWrapper=o.axis==="yx" ? "<div id='mCSB_"+d.idx+"_container_wrapper' class='mCSB_container_wrapper' />" : "",
          autoHideClass=o.autoHideScrollbar ? " "+classes[6] : "",
          scrollbarDirClass=(o.axis!=="x" && d.langDir==="rtl") ? " "+classes[7] : "";
        if(o.setWidth){$this.css("width",o.setWidth);} /* set element width */
        if(o.setHeight){$this.css("height",o.setHeight);} /* set element height */
        o.setLeft=(o.axis!=="y" && d.langDir==="rtl") ? "989999px" : o.setLeft; /* adjust left position for rtl direction */
        $this.addClass(pluginNS+" _"+pluginPfx+"_"+d.idx+autoHideClass+scrollbarDirClass).wrapInner("<div id='mCSB_"+d.idx+"' class='mCustomScrollBox mCS-"+o.theme+" "+wrapperClass+"'><div id='mCSB_"+d.idx+"_container' class='mCSB_container' style='position:relative; top:"+o.setTop+"; left:"+o.setLeft+";' dir='"+d.langDir+"' /></div>");
        var mCustomScrollBox=$("#mCSB_"+d.idx),
          mCSB_container=$("#mCSB_"+d.idx+"_container");
        if(o.axis!=="y" && !o.advanced.autoExpandHorizontalScroll){
          mCSB_container.css("width",_contentWidth(mCSB_container));
        }
        if(o.scrollbarPosition==="outside"){
          if($this.css("position")==="static"){ /* requires elements with non-static position */
            $this.css("position","relative");
          }
          $this.css("overflow","visible");
          mCustomScrollBox.addClass("mCSB_outside").after(scrollbars);
        }else{
          mCustomScrollBox.addClass("mCSB_inside").append(scrollbars);
          mCSB_container.wrap(contentWrapper);
        }
        _scrollButtons.call(this); /* add scrollbar buttons */
        /* minimum dragger length */
        var mCSB_dragger=[$("#mCSB_"+d.idx+"_dragger_vertical"),$("#mCSB_"+d.idx+"_dragger_horizontal")];
        mCSB_dragger[0].css("min-height",mCSB_dragger[0].height());
        mCSB_dragger[1].css("min-width",mCSB_dragger[1].width());
      },
      /* -------------------- */


      /* calculates content width */
      _contentWidth=function(el){
        var val=[el[0].scrollWidth,Math.max.apply(Math,el.children().map(function(){return $(this).outerWidth(true);}).get())],w=el.parent().width();
        return val[0]>w ? val[0] : val[1]>w ? val[1] : "100%";
      },
      /* -------------------- */


      /* expands content horizontally */
      _expandContentHorizontally=function(){
        var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
          mCSB_container=$("#mCSB_"+d.idx+"_container");
        if(o.advanced.autoExpandHorizontalScroll && o.axis!=="y"){
          /* calculate scrollWidth */
          mCSB_container.css({"width":"auto","min-width":0,"overflow-x":"scroll"});
          var w=Math.ceil(mCSB_container[0].scrollWidth);
          if(o.advanced.autoExpandHorizontalScroll===3 || (o.advanced.autoExpandHorizontalScroll!==2 && w>mCSB_container.parent().width())){
            mCSB_container.css({"width":w,"min-width":"100%","overflow-x":"inherit"});
          }else{
            /*
					wrap content with an infinite width div and set its position to absolute and width to auto.
					Setting width to auto before calculating the actual width is important!
					We must let the browser set the width as browser zoom values are impossible to calculate.
					*/
            mCSB_container.css({"overflow-x":"inherit","position":"absolute"})
              .wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />")
              .css({ /* set actual width, original position and un-wrap */
                /*
							get the exact width (with decimals) and then round-up.
							Using jquery outerWidth() will round the width value which will mess up with inner elements that have non-integer width
							*/
                "width":(Math.ceil(mCSB_container[0].getBoundingClientRect().right+0.4)-Math.floor(mCSB_container[0].getBoundingClientRect().left)),
                "min-width":"100%",
                "position":"relative"
              }).unwrap();
          }
        }
      },
      /* -------------------- */


      /* adds scrollbar buttons */
      _scrollButtons=function(){
        var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
          mCSB_scrollTools=$(".mCSB_"+d.idx+"_scrollbar:first"),
          tabindex=!_isNumeric(o.scrollButtons.tabindex) ? "" : "tabindex='"+o.scrollButtons.tabindex+"'",
          btnHTML=[
            "<a href='#' class='"+classes[13]+"' "+tabindex+" />",
            "<a href='#' class='"+classes[14]+"' "+tabindex+" />",
            "<a href='#' class='"+classes[15]+"' "+tabindex+" />",
            "<a href='#' class='"+classes[16]+"' "+tabindex+" />"
          ],
          btn=[(o.axis==="x" ? btnHTML[2] : btnHTML[0]),(o.axis==="x" ? btnHTML[3] : btnHTML[1]),btnHTML[2],btnHTML[3]];
        if(o.scrollButtons.enable){
          mCSB_scrollTools.prepend(btn[0]).append(btn[1]).next(".mCSB_scrollTools").prepend(btn[2]).append(btn[3]);
        }
      },
      /* -------------------- */


      /* auto-adjusts scrollbar dragger length */
      _setDraggerLength=function(){
        var $this=$(this),d=$this.data(pluginPfx),
          mCustomScrollBox=$("#mCSB_"+d.idx),
          mCSB_container=$("#mCSB_"+d.idx+"_container"),
          mCSB_dragger=[$("#mCSB_"+d.idx+"_dragger_vertical"),$("#mCSB_"+d.idx+"_dragger_horizontal")],
          ratio=[mCustomScrollBox.height()/mCSB_container.outerHeight(false),mCustomScrollBox.width()/mCSB_container.outerWidth(false)],
          l=[
            parseInt(mCSB_dragger[0].css("min-height")),Math.round(ratio[0]*mCSB_dragger[0].parent().height()),
            parseInt(mCSB_dragger[1].css("min-width")),Math.round(ratio[1]*mCSB_dragger[1].parent().width())
          ],
          h=oldIE && (l[1]<l[0]) ? l[0] : l[1],w=oldIE && (l[3]<l[2]) ? l[2] : l[3];
        mCSB_dragger[0].css({
          "height":h,"max-height":(mCSB_dragger[0].parent().height()-10)
        }).find(".mCSB_dragger_bar").css({"line-height":l[0]+"px"});
        mCSB_dragger[1].css({
          "width":w,"max-width":(mCSB_dragger[1].parent().width()-10)
        });
      },
      /* -------------------- */


      /* calculates scrollbar to content ratio */
      _scrollRatio=function(){
        var $this=$(this),d=$this.data(pluginPfx),
          mCustomScrollBox=$("#mCSB_"+d.idx),
          mCSB_container=$("#mCSB_"+d.idx+"_container"),
          mCSB_dragger=[$("#mCSB_"+d.idx+"_dragger_vertical"),$("#mCSB_"+d.idx+"_dragger_horizontal")],
          scrollAmount=[mCSB_container.outerHeight(false)-mCustomScrollBox.height(),mCSB_container.outerWidth(false)-mCustomScrollBox.width()],
          ratio=[
            scrollAmount[0]/(mCSB_dragger[0].parent().height()-mCSB_dragger[0].height()),
            scrollAmount[1]/(mCSB_dragger[1].parent().width()-mCSB_dragger[1].width())
          ];
        d.scrollRatio={y:ratio[0],x:ratio[1]};
      },
      /* -------------------- */


      /* toggles scrolling classes */
      _onDragClasses=function(el,action,xpnd){
        var expandClass=xpnd ? classes[0]+"_expanded" : "",
          scrollbar=el.closest(".mCSB_scrollTools");
        if(action==="active"){
          el.toggleClass(classes[0]+" "+expandClass); scrollbar.toggleClass(classes[1]);
          el[0]._draggable=el[0]._draggable ? 0 : 1;
        }else{
          if(!el[0]._draggable){
            if(action==="hide"){
              el.removeClass(classes[0]); scrollbar.removeClass(classes[1]);
            }else{
              el.addClass(classes[0]); scrollbar.addClass(classes[1]);
            }
          }
        }
      },
      /* -------------------- */


      /* checks if content overflows its container to determine if scrolling is required */
      _overflowed=function(){
        var $this=$(this),d=$this.data(pluginPfx),
          mCustomScrollBox=$("#mCSB_"+d.idx),
          mCSB_container=$("#mCSB_"+d.idx+"_container"),
          contentHeight=d.overflowed==null ? mCSB_container.height() : mCSB_container.outerHeight(false),
          contentWidth=d.overflowed==null ? mCSB_container.width() : mCSB_container.outerWidth(false),
          h=mCSB_container[0].scrollHeight,w=mCSB_container[0].scrollWidth;
        if(h>contentHeight){contentHeight=h;}
        if(w>contentWidth){contentWidth=w;}
        return [contentHeight>mCustomScrollBox.height(),contentWidth>mCustomScrollBox.width()];
      },
      /* -------------------- */


      /* resets content position to 0 */
      _resetContentPosition=function(){
        var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
          mCustomScrollBox=$("#mCSB_"+d.idx),
          mCSB_container=$("#mCSB_"+d.idx+"_container"),
          mCSB_dragger=[$("#mCSB_"+d.idx+"_dragger_vertical"),$("#mCSB_"+d.idx+"_dragger_horizontal")];
        _stop($this); /* stop any current scrolling before resetting */
        if((o.axis!=="x" && !d.overflowed[0]) || (o.axis==="y" && d.overflowed[0])){ /* reset y */
          mCSB_dragger[0].add(mCSB_container).css("top",0);
          _scrollTo($this,"_resetY");
        }
        if((o.axis!=="y" && !d.overflowed[1]) || (o.axis==="x" && d.overflowed[1])){ /* reset x */
          var cx=dx=0;
          if(d.langDir==="rtl"){ /* adjust left position for rtl direction */
            cx=mCustomScrollBox.width()-mCSB_container.outerWidth(false);
            dx=Math.abs(cx/d.scrollRatio.x);
          }
          mCSB_container.css("left",cx);
          mCSB_dragger[1].css("left",dx);
          _scrollTo($this,"_resetX");
        }
      },
      /* -------------------- */


      /* binds scrollbar events */
      _bindEvents=function(){
        var $this=$(this),d=$this.data(pluginPfx),o=d.opt;
        if(!d.bindEvents){ /* check if events are already bound */
          _draggable.call(this);
          if(o.contentTouchScroll){_contentDraggable.call(this);}
          _selectable.call(this);
          if(o.mouseWheel.enable){ /* bind mousewheel fn when plugin is available */
            function _mwt(){
              mousewheelTimeout=setTimeout(function(){
                if(!$.event.special.mousewheel){
                  _mwt();
                }else{
                  clearTimeout(mousewheelTimeout);
                  _mousewheel.call($this[0]);
                }
              },100);
            }
            var mousewheelTimeout;
            _mwt();
          }
          _draggerRail.call(this);
          _wrapperScroll.call(this);
          if(o.advanced.autoScrollOnFocus){_focus.call(this);}
          if(o.scrollButtons.enable){_buttons.call(this);}
          if(o.keyboard.enable){_keyboard.call(this);}
          d.bindEvents=true;
        }
      },
      /* -------------------- */


      /* unbinds scrollbar events */
      _unbindEvents=function(){
        var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
          namespace=pluginPfx+"_"+d.idx,
          sb=".mCSB_"+d.idx+"_scrollbar",
          sel=$("#mCSB_"+d.idx+",#mCSB_"+d.idx+"_container,#mCSB_"+d.idx+"_container_wrapper,"+sb+" ."+classes[12]+",#mCSB_"+d.idx+"_dragger_vertical,#mCSB_"+d.idx+"_dragger_horizontal,"+sb+">a"),
          mCSB_container=$("#mCSB_"+d.idx+"_container");
        if(o.advanced.releaseDraggableSelectors){sel.add($(o.advanced.releaseDraggableSelectors));}
        if(o.advanced.extraDraggableSelectors){sel.add($(o.advanced.extraDraggableSelectors));}
        if(d.bindEvents){ /* check if events are bound */
          /* unbind namespaced events from document/selectors */
          $(document).add($(!_canAccessIFrame() || top.document)).unbind("."+namespace);
          sel.each(function(){
            $(this).unbind("."+namespace);
          });
          /* clear and delete timeouts/objects */
          clearTimeout($this[0]._focusTimeout); _delete($this[0],"_focusTimeout");
          clearTimeout(d.sequential.step); _delete(d.sequential,"step");
          clearTimeout(mCSB_container[0].onCompleteTimeout); _delete(mCSB_container[0],"onCompleteTimeout");
          d.bindEvents=false;
        }
      },
      /* -------------------- */


      /* toggles scrollbar visibility */
      _scrollbarVisibility=function(disabled){
        var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
          contentWrapper=$("#mCSB_"+d.idx+"_container_wrapper"),
          content=contentWrapper.length ? contentWrapper : $("#mCSB_"+d.idx+"_container"),
          scrollbar=[$("#mCSB_"+d.idx+"_scrollbar_vertical"),$("#mCSB_"+d.idx+"_scrollbar_horizontal")],
          mCSB_dragger=[scrollbar[0].find(".mCSB_dragger"),scrollbar[1].find(".mCSB_dragger")];
        if(o.axis!=="x"){
          if(d.overflowed[0] && !disabled){
            scrollbar[0].add(mCSB_dragger[0]).add(scrollbar[0].children("a")).css("display","block");
            content.removeClass(classes[8]+" "+classes[10]);
          }else{
            if(o.alwaysShowScrollbar){
              if(o.alwaysShowScrollbar!==2){mCSB_dragger[0].css("display","none");}
              content.removeClass(classes[10]);
            }else{
              scrollbar[0].css("display","none");
              content.addClass(classes[10]);
            }
            content.addClass(classes[8]);
          }
        }
        if(o.axis!=="y"){
          if(d.overflowed[1] && !disabled){
            scrollbar[1].add(mCSB_dragger[1]).add(scrollbar[1].children("a")).css("display","block");
            content.removeClass(classes[9]+" "+classes[11]);
          }else{
            if(o.alwaysShowScrollbar){
              if(o.alwaysShowScrollbar!==2){mCSB_dragger[1].css("display","none");}
              content.removeClass(classes[11]);
            }else{
              scrollbar[1].css("display","none");
              content.addClass(classes[11]);
            }
            content.addClass(classes[9]);
          }
        }
        if(!d.overflowed[0] && !d.overflowed[1]){
          $this.addClass(classes[5]);
        }else{
          $this.removeClass(classes[5]);
        }
      },
      /* -------------------- */


      /* returns input coordinates of pointer, touch and mouse events (relative to document) */
      _coordinates=function(e){
        var t=e.type,o=e.target.ownerDocument!==document && frameElement!==null ? [$(frameElement).offset().top,$(frameElement).offset().left] : null,
          io=_canAccessIFrame() && e.target.ownerDocument!==top.document && frameElement!==null ? [$(e.view.frameElement).offset().top,$(e.view.frameElement).offset().left] : [0,0];
        switch(t){
          case "pointerdown": case "MSPointerDown": case "pointermove": case "MSPointerMove": case "pointerup": case "MSPointerUp":
            return o ? [e.originalEvent.pageY-o[0]+io[0],e.originalEvent.pageX-o[1]+io[1],false] : [e.originalEvent.pageY,e.originalEvent.pageX,false];
            break;
          case "touchstart": case "touchmove": case "touchend":
            var touch=e.originalEvent.touches[0] || e.originalEvent.changedTouches[0],
              touches=e.originalEvent.touches.length || e.originalEvent.changedTouches.length;
            return e.target.ownerDocument!==document ? [touch.screenY,touch.screenX,touches>1] : [touch.pageY,touch.pageX,touches>1];
            break;
          default:
            return o ? [e.pageY-o[0]+io[0],e.pageX-o[1]+io[1],false] : [e.pageY,e.pageX,false];
        }
      },
      /* -------------------- */


      /*
		SCROLLBAR DRAG EVENTS
		scrolls content via scrollbar dragging
		*/
      _draggable=function(){
        var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
          namespace=pluginPfx+"_"+d.idx,
          draggerId=["mCSB_"+d.idx+"_dragger_vertical","mCSB_"+d.idx+"_dragger_horizontal"],
          mCSB_container=$("#mCSB_"+d.idx+"_container"),
          mCSB_dragger=$("#"+draggerId[0]+",#"+draggerId[1]),
          draggable,dragY,dragX,
          rds=o.advanced.releaseDraggableSelectors ? mCSB_dragger.add($(o.advanced.releaseDraggableSelectors)) : mCSB_dragger,
          eds=o.advanced.extraDraggableSelectors ? $(!_canAccessIFrame() || top.document).add($(o.advanced.extraDraggableSelectors)) : $(!_canAccessIFrame() || top.document);
        mCSB_dragger.bind("contextmenu."+namespace,function(e){
          e.preventDefault(); //prevent right click
        }).bind("mousedown."+namespace+" touchstart."+namespace+" pointerdown."+namespace+" MSPointerDown."+namespace,function(e){
          e.stopImmediatePropagation();
          e.preventDefault();
          if(!_mouseBtnLeft(e)){return;} /* left mouse button only */
          touchActive=true;
          if(oldIE){document.onselectstart=function(){return false;}} /* disable text selection for IE < 9 */
          _iframe.call(mCSB_container,false); /* enable scrollbar dragging over iframes by disabling their events */
          _stop($this);
          draggable=$(this);
          var offset=draggable.offset(),y=_coordinates(e)[0]-offset.top,x=_coordinates(e)[1]-offset.left,
            h=draggable.height()+offset.top,w=draggable.width()+offset.left;
          if(y<h && y>0 && x<w && x>0){
            dragY=y;
            dragX=x;
          }
          _onDragClasses(draggable,"active",o.autoExpandScrollbar);
        }).bind("touchmove."+namespace,function(e){
          e.stopImmediatePropagation();
          e.preventDefault();
          var offset=draggable.offset(),y=_coordinates(e)[0]-offset.top,x=_coordinates(e)[1]-offset.left;
          _drag(dragY,dragX,y,x);
        });
        $(document).add(eds).bind("mousemove."+namespace+" pointermove."+namespace+" MSPointerMove."+namespace,function(e){
          if(draggable){
            var offset=draggable.offset(),y=_coordinates(e)[0]-offset.top,x=_coordinates(e)[1]-offset.left;
            if(dragY===y && dragX===x){return;} /* has it really moved? */
            _drag(dragY,dragX,y,x);
          }
        }).add(rds).bind("mouseup."+namespace+" touchend."+namespace+" pointerup."+namespace+" MSPointerUp."+namespace,function(e){
          if(draggable){
            _onDragClasses(draggable,"active",o.autoExpandScrollbar);
            draggable=null;
          }
          touchActive=false;
          if(oldIE){document.onselectstart=null;} /* enable text selection for IE < 9 */
          _iframe.call(mCSB_container,true); /* enable iframes events */
        });
        function _drag(dragY,dragX,y,x){
          mCSB_container[0].idleTimer=o.scrollInertia<233 ? 250 : 0;
          if(draggable.attr("id")===draggerId[1]){
            var dir="x",to=((draggable[0].offsetLeft-dragX)+x)*d.scrollRatio.x;
          }else{
            var dir="y",to=((draggable[0].offsetTop-dragY)+y)*d.scrollRatio.y;
          }
          _scrollTo($this,to.toString(),{dir:dir,drag:true});
        }
      },
      /* -------------------- */


      /*
		TOUCH SWIPE EVENTS
		scrolls content via touch swipe
		Emulates the native touch-swipe scrolling with momentum found in iOS, Android and WP devices
		*/
      _contentDraggable=function(){
        var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
          namespace=pluginPfx+"_"+d.idx,
          mCustomScrollBox=$("#mCSB_"+d.idx),
          mCSB_container=$("#mCSB_"+d.idx+"_container"),
          mCSB_dragger=[$("#mCSB_"+d.idx+"_dragger_vertical"),$("#mCSB_"+d.idx+"_dragger_horizontal")],
          draggable,dragY,dragX,touchStartY,touchStartX,touchMoveY=[],touchMoveX=[],startTime,runningTime,endTime,distance,speed,amount,
          durA=0,durB,overwrite=o.axis==="yx" ? "none" : "all",touchIntent=[],touchDrag,docDrag,
          iframe=mCSB_container.find("iframe"),
          events=[
            "touchstart."+namespace+" pointerdown."+namespace+" MSPointerDown."+namespace, //start
            "touchmove."+namespace+" pointermove."+namespace+" MSPointerMove."+namespace, //move
            "touchend."+namespace+" pointerup."+namespace+" MSPointerUp."+namespace //end
          ],
          touchAction=document.body.style.touchAction!==undefined && document.body.style.touchAction!=="";
        mCSB_container.bind(events[0],function(e){
          _onTouchstart(e);
        }).bind(events[1],function(e){
          _onTouchmove(e);
        });
        mCustomScrollBox.bind(events[0],function(e){
          _onTouchstart2(e);
        }).bind(events[2],function(e){
          _onTouchend(e);
        });
        if(iframe.length){
          iframe.each(function(){
            $(this).bind("load",function(){
              /* bind events on accessible iframes */
              if(_canAccessIFrame(this)){
                $(this.contentDocument || this.contentWindow.document).bind(events[0],function(e){
                  _onTouchstart(e);
                  _onTouchstart2(e);
                }).bind(events[1],function(e){
                  _onTouchmove(e);
                }).bind(events[2],function(e){
                  _onTouchend(e);
                });
              }
            });
          });
        }
        function _onTouchstart(e){
          if(!_pointerTouch(e) || touchActive || _coordinates(e)[2]){touchable=0; return;}
          touchable=1; touchDrag=0; docDrag=0; draggable=1;
          $this.removeClass("mCS_touch_action");
          var offset=mCSB_container.offset();
          dragY=_coordinates(e)[0]-offset.top;
          dragX=_coordinates(e)[1]-offset.left;
          touchIntent=[_coordinates(e)[0],_coordinates(e)[1]];
        }
        function _onTouchmove(e){
          if(!_pointerTouch(e) || touchActive || _coordinates(e)[2]){return;}
          if(!o.documentTouchScroll){e.preventDefault();}
          e.stopImmediatePropagation();
          if(docDrag && !touchDrag){return;}
          if(draggable){
            runningTime=_getTime();
            var offset=mCustomScrollBox.offset(),y=_coordinates(e)[0]-offset.top,x=_coordinates(e)[1]-offset.left,
              easing="mcsLinearOut";
            touchMoveY.push(y);
            touchMoveX.push(x);
            touchIntent[2]=Math.abs(_coordinates(e)[0]-touchIntent[0]); touchIntent[3]=Math.abs(_coordinates(e)[1]-touchIntent[1]);
            if(d.overflowed[0]){
              var limit=mCSB_dragger[0].parent().height()-mCSB_dragger[0].height(),
                prevent=((dragY-y)>0 && (y-dragY)>-(limit*d.scrollRatio.y) && (touchIntent[3]*2<touchIntent[2] || o.axis==="yx"));
            }
            if(d.overflowed[1]){
              var limitX=mCSB_dragger[1].parent().width()-mCSB_dragger[1].width(),
                preventX=((dragX-x)>0 && (x-dragX)>-(limitX*d.scrollRatio.x) && (touchIntent[2]*2<touchIntent[3] || o.axis==="yx"));
            }
            if(prevent || preventX){ /* prevent native document scrolling */
              if(!touchAction){e.preventDefault();}
              touchDrag=1;
            }else{
              docDrag=1;
              $this.addClass("mCS_touch_action");
            }
            if(touchAction){e.preventDefault();}
            amount=o.axis==="yx" ? [(dragY-y),(dragX-x)] : o.axis==="x" ? [null,(dragX-x)] : [(dragY-y),null];
            mCSB_container[0].idleTimer=250;
            if(d.overflowed[0]){_drag(amount[0],durA,easing,"y","all",true);}
            if(d.overflowed[1]){_drag(amount[1],durA,easing,"x",overwrite,true);}
          }
        }
        function _onTouchstart2(e){
          if(!_pointerTouch(e) || touchActive || _coordinates(e)[2]){touchable=0; return;}
          touchable=1;
          e.stopImmediatePropagation();
          _stop($this);
          startTime=_getTime();
          var offset=mCustomScrollBox.offset();
          touchStartY=_coordinates(e)[0]-offset.top;
          touchStartX=_coordinates(e)[1]-offset.left;
          touchMoveY=[]; touchMoveX=[];
        }
        function _onTouchend(e){
          if(!_pointerTouch(e) || touchActive || _coordinates(e)[2]){return;}
          draggable=0;
          e.stopImmediatePropagation();
          touchDrag=0; docDrag=0;
          endTime=_getTime();
          var offset=mCustomScrollBox.offset(),y=_coordinates(e)[0]-offset.top,x=_coordinates(e)[1]-offset.left;
          if((endTime-runningTime)>30){return;}
          speed=1000/(endTime-startTime);
          var easing="mcsEaseOut",slow=speed<2.5,
            diff=slow ? [touchMoveY[touchMoveY.length-2],touchMoveX[touchMoveX.length-2]] : [0,0];
          distance=slow ? [(y-diff[0]),(x-diff[1])] : [y-touchStartY,x-touchStartX];
          var absDistance=[Math.abs(distance[0]),Math.abs(distance[1])];
          speed=slow ? [Math.abs(distance[0]/4),Math.abs(distance[1]/4)] : [speed,speed];
          var a=[
            Math.abs(mCSB_container[0].offsetTop)-(distance[0]*_m((absDistance[0]/speed[0]),speed[0])),
            Math.abs(mCSB_container[0].offsetLeft)-(distance[1]*_m((absDistance[1]/speed[1]),speed[1]))
          ];
          amount=o.axis==="yx" ? [a[0],a[1]] : o.axis==="x" ? [null,a[1]] : [a[0],null];
          durB=[(absDistance[0]*4)+o.scrollInertia,(absDistance[1]*4)+o.scrollInertia];
          var md=parseInt(o.contentTouchScroll) || 0; /* absolute minimum distance required */
          amount[0]=absDistance[0]>md ? amount[0] : 0;
          amount[1]=absDistance[1]>md ? amount[1] : 0;
          if(d.overflowed[0]){_drag(amount[0],durB[0],easing,"y",overwrite,false);}
          if(d.overflowed[1]){_drag(amount[1],durB[1],easing,"x",overwrite,false);}
        }
        function _m(ds,s){
          var r=[s*1.5,s*2,s/1.5,s/2];
          if(ds>90){
            return s>4 ? r[0] : r[3];
          }else if(ds>60){
            return s>3 ? r[3] : r[2];
          }else if(ds>30){
            return s>8 ? r[1] : s>6 ? r[0] : s>4 ? s : r[2];
          }else{
            return s>8 ? s : r[3];
          }
        }
        function _drag(amount,dur,easing,dir,overwrite,drag){
          if(!amount){return;}
          _scrollTo($this,amount.toString(),{dur:dur,scrollEasing:easing,dir:dir,overwrite:overwrite,drag:drag});
        }
      },
      /* -------------------- */


      /*
		SELECT TEXT EVENTS
		scrolls content when text is selected
		*/
      _selectable=function(){
        var $this=$(this),d=$this.data(pluginPfx),o=d.opt,seq=d.sequential,
          namespace=pluginPfx+"_"+d.idx,
          mCSB_container=$("#mCSB_"+d.idx+"_container"),
          wrapper=mCSB_container.parent(),
          action;
        mCSB_container.bind("mousedown."+namespace,function(e){
          if(touchable){return;}
          if(!action){action=1; touchActive=true;}
        }).add(document).bind("mousemove."+namespace,function(e){
          if(!touchable && action && _sel()){
            var offset=mCSB_container.offset(),
              y=_coordinates(e)[0]-offset.top+mCSB_container[0].offsetTop,x=_coordinates(e)[1]-offset.left+mCSB_container[0].offsetLeft;
            if(y>0 && y<wrapper.height() && x>0 && x<wrapper.width()){
              if(seq.step){_seq("off",null,"stepped");}
            }else{
              if(o.axis!=="x" && d.overflowed[0]){
                if(y<0){
                  _seq("on",38);
                }else if(y>wrapper.height()){
                  _seq("on",40);
                }
              }
              if(o.axis!=="y" && d.overflowed[1]){
                if(x<0){
                  _seq("on",37);
                }else if(x>wrapper.width()){
                  _seq("on",39);
                }
              }
            }
          }
        }).bind("mouseup."+namespace+" dragend."+namespace,function(e){
          if(touchable){return;}
          if(action){action=0; _seq("off",null);}
          touchActive=false;
        });
        function _sel(){
          return 	window.getSelection ? window.getSelection().toString() :
            document.selection && document.selection.type!="Control" ? document.selection.createRange().text : 0;
        }
        function _seq(a,c,s){
          seq.type=s && action ? "stepped" : "stepless";
          seq.scrollAmount=10;
          _sequentialScroll($this,a,c,"mcsLinearOut",s ? 60 : null);
        }
      },
      /* -------------------- */


      /*
		MOUSE WHEEL EVENT
		scrolls content via mouse-wheel
		via mouse-wheel plugin (https://github.com/brandonaaron/jquery-mousewheel)
		*/
      _mousewheel=function(){
        if(!$(this).data(pluginPfx)){return;} /* Check if the scrollbar is ready to use mousewheel events (issue: #185) */
        var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
          namespace=pluginPfx+"_"+d.idx,
          mCustomScrollBox=$("#mCSB_"+d.idx),
          mCSB_dragger=[$("#mCSB_"+d.idx+"_dragger_vertical"),$("#mCSB_"+d.idx+"_dragger_horizontal")],
          iframe=$("#mCSB_"+d.idx+"_container").find("iframe");
        if(iframe.length){
          iframe.each(function(){
            $(this).bind("load",function(){
              /* bind events on accessible iframes */
              if(_canAccessIFrame(this)){
                $(this.contentDocument || this.contentWindow.document).bind("mousewheel."+namespace,function(e,delta){
                  _onMousewheel(e,delta);
                });
              }
            });
          });
        }
        mCustomScrollBox.bind("mousewheel."+namespace,function(e,delta){
          _onMousewheel(e,delta);
        });
        function _onMousewheel(e,delta){
          _stop($this);
          if(_disableMousewheel($this,e.target)){return;} /* disables mouse-wheel when hovering specific elements */
          var deltaFactor=o.mouseWheel.deltaFactor!=="auto" ? parseInt(o.mouseWheel.deltaFactor) : (oldIE && e.deltaFactor<100) ? 100 : e.deltaFactor || 100,
            dur=o.scrollInertia;
          if(o.axis==="x" || o.mouseWheel.axis==="x"){
            var dir="x",
              px=[Math.round(deltaFactor*d.scrollRatio.x),parseInt(o.mouseWheel.scrollAmount)],
              amount=o.mouseWheel.scrollAmount!=="auto" ? px[1] : px[0]>=mCustomScrollBox.width() ? mCustomScrollBox.width()*0.9 : px[0],
              contentPos=Math.abs($("#mCSB_"+d.idx+"_container")[0].offsetLeft),
              draggerPos=mCSB_dragger[1][0].offsetLeft,
              limit=mCSB_dragger[1].parent().width()-mCSB_dragger[1].width(),
              dlt=o.mouseWheel.axis==="y" ? (e.deltaY || delta) : e.deltaX;
          }else{
            var dir="y",
              px=[Math.round(deltaFactor*d.scrollRatio.y),parseInt(o.mouseWheel.scrollAmount)],
              amount=o.mouseWheel.scrollAmount!=="auto" ? px[1] : px[0]>=mCustomScrollBox.height() ? mCustomScrollBox.height()*0.9 : px[0],
              contentPos=Math.abs($("#mCSB_"+d.idx+"_container")[0].offsetTop),
              draggerPos=mCSB_dragger[0][0].offsetTop,
              limit=mCSB_dragger[0].parent().height()-mCSB_dragger[0].height(),
              dlt=e.deltaY || delta;
          }
          if((dir==="y" && !d.overflowed[0]) || (dir==="x" && !d.overflowed[1])){return;}
          if(o.mouseWheel.invert || e.webkitDirectionInvertedFromDevice){dlt=-dlt;}
          if(o.mouseWheel.normalizeDelta){dlt=dlt<0 ? -1 : 1;}
          if((dlt>0 && draggerPos!==0) || (dlt<0 && draggerPos!==limit) || o.mouseWheel.preventDefault){
            e.stopImmediatePropagation();
            e.preventDefault();
          }
          if(e.deltaFactor<5 && !o.mouseWheel.normalizeDelta){
            //very low deltaFactor values mean some kind of delta acceleration (e.g. osx trackpad), so adjusting scrolling accordingly
            amount=e.deltaFactor; dur=17;
          }
          _scrollTo($this,(contentPos-(dlt*amount)).toString(),{dir:dir,dur:dur});
        }
      },
      /* -------------------- */


      /* checks if iframe can be accessed */
      _canAccessIFrameCache=new Object(),
      _canAccessIFrame=function(iframe){
        var result=false,cacheKey=false,html=null;
        if(iframe===undefined){
          cacheKey="#empty";
        }else if($(iframe).attr("id")!==undefined){
          cacheKey=$(iframe).attr("id");
        }
        if(cacheKey!==false && _canAccessIFrameCache[cacheKey]!==undefined){
          return _canAccessIFrameCache[cacheKey];
        }
        if(!iframe){
          try{
            var doc=top.document;
            html=doc.body.innerHTML;
          }catch(err){/* do nothing */}
          result=(html!==null);
        }else{
          try{
            var doc=iframe.contentDocument || iframe.contentWindow.document;
            html=doc.body.innerHTML;
          }catch(err){/* do nothing */}
          result=(html!==null);
        }
        if(cacheKey!==false){_canAccessIFrameCache[cacheKey]=result;}
        return result;
      },
      /* -------------------- */


      /* switches iframe's pointer-events property (drag, mousewheel etc. over cross-domain iframes) */
      _iframe=function(evt){
        var el=this.find("iframe");
        if(!el.length){return;} /* check if content contains iframes */
        var val=!evt ? "none" : "auto";
        el.css("pointer-events",val); /* for IE11, iframe's display property should not be "block" */
      },
      /* -------------------- */


      /* disables mouse-wheel when hovering specific elements like select, datalist etc. */
      _disableMousewheel=function(el,target){
        var tag=target.nodeName.toLowerCase(),
          tags=el.data(pluginPfx).opt.mouseWheel.disableOver,
          /* elements that require focus */
          focusTags=["select","textarea"];
        return $.inArray(tag,tags) > -1 && !($.inArray(tag,focusTags) > -1 && !$(target).is(":focus"));
      },
      /* -------------------- */


      /*
		DRAGGER RAIL CLICK EVENT
		scrolls content via dragger rail
		*/
      _draggerRail=function(){
        var $this=$(this),d=$this.data(pluginPfx),
          namespace=pluginPfx+"_"+d.idx,
          mCSB_container=$("#mCSB_"+d.idx+"_container"),
          wrapper=mCSB_container.parent(),
          mCSB_draggerContainer=$(".mCSB_"+d.idx+"_scrollbar ."+classes[12]),
          clickable;
        mCSB_draggerContainer.bind("mousedown."+namespace+" touchstart."+namespace+" pointerdown."+namespace+" MSPointerDown."+namespace,function(e){
          touchActive=true;
          if(!$(e.target).hasClass("mCSB_dragger")){clickable=1;}
        }).bind("touchend."+namespace+" pointerup."+namespace+" MSPointerUp."+namespace,function(e){
          touchActive=false;
        }).bind("click."+namespace,function(e){
          if(!clickable){return;}
          clickable=0;
          if($(e.target).hasClass(classes[12]) || $(e.target).hasClass("mCSB_draggerRail")){
            _stop($this);
            var el=$(this),mCSB_dragger=el.find(".mCSB_dragger");
            if(el.parent(".mCSB_scrollTools_horizontal").length>0){
              if(!d.overflowed[1]){return;}
              var dir="x",
                clickDir=e.pageX>mCSB_dragger.offset().left ? -1 : 1,
                to=Math.abs(mCSB_container[0].offsetLeft)-(clickDir*(wrapper.width()*0.9));
            }else{
              if(!d.overflowed[0]){return;}
              var dir="y",
                clickDir=e.pageY>mCSB_dragger.offset().top ? -1 : 1,
                to=Math.abs(mCSB_container[0].offsetTop)-(clickDir*(wrapper.height()*0.9));
            }
            _scrollTo($this,to.toString(),{dir:dir,scrollEasing:"mcsEaseInOut"});
          }
        });
      },
      /* -------------------- */


      /*
		FOCUS EVENT
		scrolls content via element focus (e.g. clicking an input, pressing TAB key etc.)
		*/
      _focus=function(){
        var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
          namespace=pluginPfx+"_"+d.idx,
          mCSB_container=$("#mCSB_"+d.idx+"_container"),
          wrapper=mCSB_container.parent();
        mCSB_container.bind("focusin."+namespace,function(e){
          var el=$(document.activeElement),
            nested=mCSB_container.find(".mCustomScrollBox").length,
            dur=0;
          if(!el.is(o.advanced.autoScrollOnFocus)){return;}
          _stop($this);
          clearTimeout($this[0]._focusTimeout);
          $this[0]._focusTimer=nested ? (dur+17)*nested : 0;
          $this[0]._focusTimeout=setTimeout(function(){
            var	to=[_childPos(el)[0],_childPos(el)[1]],
              contentPos=[mCSB_container[0].offsetTop,mCSB_container[0].offsetLeft],
              isVisible=[
                (contentPos[0]+to[0]>=0 && contentPos[0]+to[0]<wrapper.height()-el.outerHeight(false)),
                (contentPos[1]+to[1]>=0 && contentPos[0]+to[1]<wrapper.width()-el.outerWidth(false))
              ],
              overwrite=(o.axis==="yx" && !isVisible[0] && !isVisible[1]) ? "none" : "all";
            if(o.axis!=="x" && !isVisible[0]){
              _scrollTo($this,to[0].toString(),{dir:"y",scrollEasing:"mcsEaseInOut",overwrite:overwrite,dur:dur});
            }
            if(o.axis!=="y" && !isVisible[1]){
              _scrollTo($this,to[1].toString(),{dir:"x",scrollEasing:"mcsEaseInOut",overwrite:overwrite,dur:dur});
            }
          },$this[0]._focusTimer);
        });
      },
      /* -------------------- */


      /* sets content wrapper scrollTop/scrollLeft always to 0 */
      _wrapperScroll=function(){
        var $this=$(this),d=$this.data(pluginPfx),
          namespace=pluginPfx+"_"+d.idx,
          wrapper=$("#mCSB_"+d.idx+"_container").parent();
        wrapper.bind("scroll."+namespace,function(e){
          if(wrapper.scrollTop()!==0 || wrapper.scrollLeft()!==0){
            $(".mCSB_"+d.idx+"_scrollbar").css("visibility","hidden"); /* hide scrollbar(s) */
          }
        });
      },
      /* -------------------- */


      /*
		BUTTONS EVENTS
		scrolls content via up, down, left and right buttons
		*/
      _buttons=function(){
        var $this=$(this),d=$this.data(pluginPfx),o=d.opt,seq=d.sequential,
          namespace=pluginPfx+"_"+d.idx,
          sel=".mCSB_"+d.idx+"_scrollbar",
          btn=$(sel+">a");
        btn.bind("contextmenu."+namespace,function(e){
          e.preventDefault(); //prevent right click
        }).bind("mousedown."+namespace+" touchstart."+namespace+" pointerdown."+namespace+" MSPointerDown."+namespace+" mouseup."+namespace+" touchend."+namespace+" pointerup."+namespace+" MSPointerUp."+namespace+" mouseout."+namespace+" pointerout."+namespace+" MSPointerOut."+namespace+" click."+namespace,function(e){
          e.preventDefault();
          if(!_mouseBtnLeft(e)){return;} /* left mouse button only */
          var btnClass=$(this).attr("class");
          seq.type=o.scrollButtons.scrollType;
          switch(e.type){
            case "mousedown": case "touchstart": case "pointerdown": case "MSPointerDown":
              if(seq.type==="stepped"){return;}
              touchActive=true;
              d.tweenRunning=false;
              _seq("on",btnClass);
              break;
            case "mouseup": case "touchend": case "pointerup": case "MSPointerUp":
            case "mouseout": case "pointerout": case "MSPointerOut":
              if(seq.type==="stepped"){return;}
              touchActive=false;
              if(seq.dir){_seq("off",btnClass);}
              break;
            case "click":
              if(seq.type!=="stepped" || d.tweenRunning){return;}
              _seq("on",btnClass);
              break;
          }
          function _seq(a,c){
            seq.scrollAmount=o.scrollButtons.scrollAmount;
            _sequentialScroll($this,a,c);
          }
        });
      },
      /* -------------------- */


      /*
		KEYBOARD EVENTS
		scrolls content via keyboard
		Keys: up arrow, down arrow, left arrow, right arrow, PgUp, PgDn, Home, End
		*/
      _keyboard=function(){
        var $this=$(this),d=$this.data(pluginPfx),o=d.opt,seq=d.sequential,
          namespace=pluginPfx+"_"+d.idx,
          mCustomScrollBox=$("#mCSB_"+d.idx),
          mCSB_container=$("#mCSB_"+d.idx+"_container"),
          wrapper=mCSB_container.parent(),
          editables="input,textarea,select,datalist,keygen,[contenteditable='true']",
          iframe=mCSB_container.find("iframe"),
          events=["blur."+namespace+" keydown."+namespace+" keyup."+namespace];
        if(iframe.length){
          iframe.each(function(){
            $(this).bind("load",function(){
              /* bind events on accessible iframes */
              if(_canAccessIFrame(this)){
                $(this.contentDocument || this.contentWindow.document).bind(events[0],function(e){
                  _onKeyboard(e);
                });
              }
            });
          });
        }
        mCustomScrollBox.attr("tabindex","0").bind(events[0],function(e){
          _onKeyboard(e);
        });
        function _onKeyboard(e){
          switch(e.type){
            case "blur":
              if(d.tweenRunning && seq.dir){_seq("off",null);}
              break;
            case "keydown": case "keyup":
              var code=e.keyCode ? e.keyCode : e.which,action="on";
              if((o.axis!=="x" && (code===38 || code===40)) || (o.axis!=="y" && (code===37 || code===39))){
                /* up (38), down (40), left (37), right (39) arrows */
                if(((code===38 || code===40) && !d.overflowed[0]) || ((code===37 || code===39) && !d.overflowed[1])){return;}
                if(e.type==="keyup"){action="off";}
                if(!$(document.activeElement).is(editables)){
                  e.preventDefault();
                  e.stopImmediatePropagation();
                  _seq(action,code);
                }
              }else if(code===33 || code===34){
                /* PgUp (33), PgDn (34) */
                if(d.overflowed[0] || d.overflowed[1]){
                  e.preventDefault();
                  e.stopImmediatePropagation();
                }
                if(e.type==="keyup"){
                  _stop($this);
                  var keyboardDir=code===34 ? -1 : 1;
                  if(o.axis==="x" || (o.axis==="yx" && d.overflowed[1] && !d.overflowed[0])){
                    var dir="x",to=Math.abs(mCSB_container[0].offsetLeft)-(keyboardDir*(wrapper.width()*0.9));
                  }else{
                    var dir="y",to=Math.abs(mCSB_container[0].offsetTop)-(keyboardDir*(wrapper.height()*0.9));
                  }
                  _scrollTo($this,to.toString(),{dir:dir,scrollEasing:"mcsEaseInOut"});
                }
              }else if(code===35 || code===36){
                /* End (35), Home (36) */
                if(!$(document.activeElement).is(editables)){
                  if(d.overflowed[0] || d.overflowed[1]){
                    e.preventDefault();
                    e.stopImmediatePropagation();
                  }
                  if(e.type==="keyup"){
                    if(o.axis==="x" || (o.axis==="yx" && d.overflowed[1] && !d.overflowed[0])){
                      var dir="x",to=code===35 ? Math.abs(wrapper.width()-mCSB_container.outerWidth(false)) : 0;
                    }else{
                      var dir="y",to=code===35 ? Math.abs(wrapper.height()-mCSB_container.outerHeight(false)) : 0;
                    }
                    _scrollTo($this,to.toString(),{dir:dir,scrollEasing:"mcsEaseInOut"});
                  }
                }
              }
              break;
          }
          function _seq(a,c){
            seq.type=o.keyboard.scrollType;
            seq.scrollAmount=o.keyboard.scrollAmount;
            if(seq.type==="stepped" && d.tweenRunning){return;}
            _sequentialScroll($this,a,c);
          }
        }
      },
      /* -------------------- */


      /* scrolls content sequentially (used when scrolling via buttons, keyboard arrows etc.) */
      _sequentialScroll=function(el,action,trigger,e,s){
        var d=el.data(pluginPfx),o=d.opt,seq=d.sequential,
          mCSB_container=$("#mCSB_"+d.idx+"_container"),
          once=seq.type==="stepped" ? true : false,
          steplessSpeed=o.scrollInertia < 26 ? 26 : o.scrollInertia, /* 26/1.5=17 */
          steppedSpeed=o.scrollInertia < 1 ? 17 : o.scrollInertia;
        switch(action){
          case "on":
            seq.dir=[
              (trigger===classes[16] || trigger===classes[15] || trigger===39 || trigger===37 ? "x" : "y"),
              (trigger===classes[13] || trigger===classes[15] || trigger===38 || trigger===37 ? -1 : 1)
            ];
            _stop(el);
            if(_isNumeric(trigger) && seq.type==="stepped"){return;}
            _on(once);
            break;
          case "off":
            _off();
            if(once || (d.tweenRunning && seq.dir)){
              _on(true);
            }
            break;
        }

        /* starts sequence */
        function _on(once){
          if(o.snapAmount){seq.scrollAmount=!(o.snapAmount instanceof Array) ? o.snapAmount : seq.dir[0]==="x" ? o.snapAmount[1] : o.snapAmount[0];} /* scrolling snapping */
          var c=seq.type!=="stepped", /* continuous scrolling */
            t=s ? s : !once ? 1000/60 : c ? steplessSpeed/1.5 : steppedSpeed, /* timer */
            m=!once ? 2.5 : c ? 7.5 : 40, /* multiplier */
            contentPos=[Math.abs(mCSB_container[0].offsetTop),Math.abs(mCSB_container[0].offsetLeft)],
            ratio=[d.scrollRatio.y>10 ? 10 : d.scrollRatio.y,d.scrollRatio.x>10 ? 10 : d.scrollRatio.x],
            amount=seq.dir[0]==="x" ? contentPos[1]+(seq.dir[1]*(ratio[1]*m)) : contentPos[0]+(seq.dir[1]*(ratio[0]*m)),
            px=seq.dir[0]==="x" ? contentPos[1]+(seq.dir[1]*parseInt(seq.scrollAmount)) : contentPos[0]+(seq.dir[1]*parseInt(seq.scrollAmount)),
            to=seq.scrollAmount!=="auto" ? px : amount,
            easing=e ? e : !once ? "mcsLinear" : c ? "mcsLinearOut" : "mcsEaseInOut",
            onComplete=!once ? false : true;
          if(once && t<17){
            to=seq.dir[0]==="x" ? contentPos[1] : contentPos[0];
          }
          _scrollTo(el,to.toString(),{dir:seq.dir[0],scrollEasing:easing,dur:t,onComplete:onComplete});
          if(once){
            seq.dir=false;
            return;
          }
          clearTimeout(seq.step);
          seq.step=setTimeout(function(){
            _on();
          },t);
        }
        /* stops sequence */
        function _off(){
          clearTimeout(seq.step);
          _delete(seq,"step");
          _stop(el);
        }
      },
      /* -------------------- */


      /* returns a yx array from value */
      _arr=function(val){
        var o=$(this).data(pluginPfx).opt,vals=[];
        if(typeof val==="function"){val=val();} /* check if the value is a single anonymous function */
        /* check if value is object or array, its length and create an array with yx values */
        if(!(val instanceof Array)){ /* object value (e.g. {y:"100",x:"100"}, 100 etc.) */
          vals[0]=val.y ? val.y : val.x || o.axis==="x" ? null : val;
          vals[1]=val.x ? val.x : val.y || o.axis==="y" ? null : val;
        }else{ /* array value (e.g. [100,100]) */
          vals=val.length>1 ? [val[0],val[1]] : o.axis==="x" ? [null,val[0]] : [val[0],null];
        }
        /* check if array values are anonymous functions */
        if(typeof vals[0]==="function"){vals[0]=vals[0]();}
        if(typeof vals[1]==="function"){vals[1]=vals[1]();}
        return vals;
      },
      /* -------------------- */


      /* translates values (e.g. "top", 100, "100px", "#id") to actual scroll-to positions */
      _to=function(val,dir){
        if(val==null || typeof val=="undefined"){return;}
        var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
          mCSB_container=$("#mCSB_"+d.idx+"_container"),
          wrapper=mCSB_container.parent(),
          t=typeof val;
        if(!dir){dir=o.axis==="x" ? "x" : "y";}
        var contentLength=dir==="x" ? mCSB_container.outerWidth(false)-wrapper.width() : mCSB_container.outerHeight(false)-wrapper.height(),
          contentPos=dir==="x" ? mCSB_container[0].offsetLeft : mCSB_container[0].offsetTop,
          cssProp=dir==="x" ? "left" : "top";
        switch(t){
          case "function": /* this currently is not used. Consider removing it */
            return val();
            break;
          case "object": /* js/jquery object */
            var obj=val.jquery ? val : $(val);
            if(!obj.length){return;}
            return dir==="x" ? _childPos(obj)[1] : _childPos(obj)[0];
            break;
          case "string": case "number":
            if(_isNumeric(val)){ /* numeric value */
              return Math.abs(val);
            }else if(val.indexOf("%")!==-1){ /* percentage value */
              return Math.abs(contentLength*parseInt(val)/100);
            }else if(val.indexOf("-=")!==-1){ /* decrease value */
              return Math.abs(contentPos-parseInt(val.split("-=")[1]));
            }else if(val.indexOf("+=")!==-1){ /* inrease value */
              var p=(contentPos+parseInt(val.split("+=")[1]));
              return p>=0 ? 0 : Math.abs(p);
            }else if(val.indexOf("px")!==-1 && _isNumeric(val.split("px")[0])){ /* pixels string value (e.g. "100px") */
              return Math.abs(val.split("px")[0]);
            }else{
              if(val==="top" || val==="left"){ /* special strings */
                return 0;
              }else if(val==="bottom"){
                return Math.abs(wrapper.height()-mCSB_container.outerHeight(false));
              }else if(val==="right"){
                return Math.abs(wrapper.width()-mCSB_container.outerWidth(false));
              }else if(val==="first" || val==="last"){
                var obj=mCSB_container.find(":"+val);
                return dir==="x" ? _childPos(obj)[1] : _childPos(obj)[0];
              }else{
                if($(val).length){ /* jquery selector */
                  return dir==="x" ? _childPos($(val))[1] : _childPos($(val))[0];
                }else{ /* other values (e.g. "100em") */
                  mCSB_container.css(cssProp,val);
                  methods.update.call(null,$this[0]);
                  return;
                }
              }
            }
            break;
        }
      },
      /* -------------------- */


      /* calls the update method automatically */
      _autoUpdate=function(rem){
        var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
          mCSB_container=$("#mCSB_"+d.idx+"_container");
        if(rem){
          /*
				removes autoUpdate timer
				usage: _autoUpdate.call(this,"remove");
				*/
          clearTimeout(mCSB_container[0].autoUpdate);
          _delete(mCSB_container[0],"autoUpdate");
          return;
        }
        upd();
        function upd(){
          clearTimeout(mCSB_container[0].autoUpdate);
          if($this.parents("html").length===0){
            /* check element in dom tree */
            $this=null;
            return;
          }
          mCSB_container[0].autoUpdate=setTimeout(function(){
            /* update on specific selector(s) length and size change */
            if(o.advanced.updateOnSelectorChange){
              d.poll.change.n=sizesSum();
              if(d.poll.change.n!==d.poll.change.o){
                d.poll.change.o=d.poll.change.n;
                doUpd(3);
                return;
              }
            }
            /* update on main element and scrollbar size changes */
            if(o.advanced.updateOnContentResize){
              d.poll.size.n=$this[0].scrollHeight+$this[0].scrollWidth+mCSB_container[0].offsetHeight+$this[0].offsetHeight+$this[0].offsetWidth;
              if(d.poll.size.n!==d.poll.size.o){
                d.poll.size.o=d.poll.size.n;
                doUpd(1);
                return;
              }
            }
            /* update on image load */
            if(o.advanced.updateOnImageLoad){
              if(!(o.advanced.updateOnImageLoad==="auto" && o.axis==="y")){ //by default, it doesn't run on vertical content
                d.poll.img.n=mCSB_container.find("img").length;
                if(d.poll.img.n!==d.poll.img.o){
                  d.poll.img.o=d.poll.img.n;
                  mCSB_container.find("img").each(function(){
                    imgLoader(this);
                  });
                  return;
                }
              }
            }
            if(o.advanced.updateOnSelectorChange || o.advanced.updateOnContentResize || o.advanced.updateOnImageLoad){upd();}
          },o.advanced.autoUpdateTimeout);
        }
        /* a tiny image loader */
        function imgLoader(el){
          if($(el).hasClass(classes[2])){doUpd(); return;}
          var img=new Image();
          function createDelegate(contextObject,delegateMethod){
            return function(){return delegateMethod.apply(contextObject,arguments);}
          }
          function imgOnLoad(){
            this.onload=null;
            $(el).addClass(classes[2]);
            doUpd(2);
          }
          img.onload=createDelegate(img,imgOnLoad);
          img.src=el.src;
        }
        /* returns the total height and width sum of all elements matching the selector */
        function sizesSum(){
          if(o.advanced.updateOnSelectorChange===true){o.advanced.updateOnSelectorChange="*";}
          var total=0,sel=mCSB_container.find(o.advanced.updateOnSelectorChange);
          if(o.advanced.updateOnSelectorChange && sel.length>0){sel.each(function(){total+=this.offsetHeight+this.offsetWidth;});}
          return total;
        }
        /* calls the update method */
        function doUpd(cb){
          clearTimeout(mCSB_container[0].autoUpdate);
          methods.update.call(null,$this[0],cb);
        }
      },
      /* -------------------- */


      /* snaps scrolling to a multiple of a pixels number */
      _snapAmount=function(to,amount,offset){
        return (Math.round(to/amount)*amount-offset);
      },
      /* -------------------- */


      /* stops content and scrollbar animations */
      _stop=function(el){
        var d=el.data(pluginPfx),
          sel=$("#mCSB_"+d.idx+"_container,#mCSB_"+d.idx+"_container_wrapper,#mCSB_"+d.idx+"_dragger_vertical,#mCSB_"+d.idx+"_dragger_horizontal");
        sel.each(function(){
          _stopTween.call(this);
        });
      },
      /* -------------------- */


      /*
		ANIMATES CONTENT
		This is where the actual scrolling happens
		*/
      _scrollTo=function(el,to,options){
        var d=el.data(pluginPfx),o=d.opt,
          defaults={
            trigger:"internal",
            dir:"y",
            scrollEasing:"mcsEaseOut",
            drag:false,
            dur:o.scrollInertia,
            overwrite:"all",
            callbacks:true,
            onStart:true,
            onUpdate:true,
            onComplete:true
          },
          options=$.extend(defaults,options),
          dur=[options.dur,(options.drag ? 0 : options.dur)],
          mCustomScrollBox=$("#mCSB_"+d.idx),
          mCSB_container=$("#mCSB_"+d.idx+"_container"),
          wrapper=mCSB_container.parent(),
          totalScrollOffsets=o.callbacks.onTotalScrollOffset ? _arr.call(el,o.callbacks.onTotalScrollOffset) : [0,0],
          totalScrollBackOffsets=o.callbacks.onTotalScrollBackOffset ? _arr.call(el,o.callbacks.onTotalScrollBackOffset) : [0,0];
        d.trigger=options.trigger;
        if(wrapper.scrollTop()!==0 || wrapper.scrollLeft()!==0){ /* always reset scrollTop/Left */
          $(".mCSB_"+d.idx+"_scrollbar").css("visibility","visible");
          wrapper.scrollTop(0).scrollLeft(0);
        }
        if(to==="_resetY" && !d.contentReset.y){
          /* callbacks: onOverflowYNone */
          if(_cb("onOverflowYNone")){o.callbacks.onOverflowYNone.call(el[0]);}
          d.contentReset.y=1;
        }
        if(to==="_resetX" && !d.contentReset.x){
          /* callbacks: onOverflowXNone */
          if(_cb("onOverflowXNone")){o.callbacks.onOverflowXNone.call(el[0]);}
          d.contentReset.x=1;
        }
        if(to==="_resetY" || to==="_resetX"){return;}
        if((d.contentReset.y || !el[0].mcs) && d.overflowed[0]){
          /* callbacks: onOverflowY */
          if(_cb("onOverflowY")){o.callbacks.onOverflowY.call(el[0]);}
          d.contentReset.x=null;
        }
        if((d.contentReset.x || !el[0].mcs) && d.overflowed[1]){
          /* callbacks: onOverflowX */
          if(_cb("onOverflowX")){o.callbacks.onOverflowX.call(el[0]);}
          d.contentReset.x=null;
        }
        if(o.snapAmount){ /* scrolling snapping */
          var snapAmount=!(o.snapAmount instanceof Array) ? o.snapAmount : options.dir==="x" ? o.snapAmount[1] : o.snapAmount[0];
          to=_snapAmount(to,snapAmount,o.snapOffset);
        }
        switch(options.dir){
          case "x":
            var mCSB_dragger=$("#mCSB_"+d.idx+"_dragger_horizontal"),
              property="left",
              contentPos=mCSB_container[0].offsetLeft,
              limit=[
                mCustomScrollBox.width()-mCSB_container.outerWidth(false),
                mCSB_dragger.parent().width()-mCSB_dragger.width()
              ],
              scrollTo=[to,to===0 ? 0 : (to/d.scrollRatio.x)],
              tso=totalScrollOffsets[1],
              tsbo=totalScrollBackOffsets[1],
              totalScrollOffset=tso>0 ? tso/d.scrollRatio.x : 0,
              totalScrollBackOffset=tsbo>0 ? tsbo/d.scrollRatio.x : 0;
            break;
          case "y":
            var mCSB_dragger=$("#mCSB_"+d.idx+"_dragger_vertical"),
              property="top",
              contentPos=mCSB_container[0].offsetTop,
              limit=[
                mCustomScrollBox.height()-mCSB_container.outerHeight(false),
                mCSB_dragger.parent().height()-mCSB_dragger.height()
              ],
              scrollTo=[to,to===0 ? 0 : (to/d.scrollRatio.y)],
              tso=totalScrollOffsets[0],
              tsbo=totalScrollBackOffsets[0],
              totalScrollOffset=tso>0 ? tso/d.scrollRatio.y : 0,
              totalScrollBackOffset=tsbo>0 ? tsbo/d.scrollRatio.y : 0;
            break;
        }
        if(scrollTo[1]<0 || (scrollTo[0]===0 && scrollTo[1]===0)){
          scrollTo=[0,0];
        }else if(scrollTo[1]>=limit[1]){
          scrollTo=[limit[0],limit[1]];
        }else{
          scrollTo[0]=-scrollTo[0];
        }
        if(!el[0].mcs){
          _mcs();  /* init mcs object (once) to make it available before callbacks */
          if(_cb("onInit")){o.callbacks.onInit.call(el[0]);} /* callbacks: onInit */
        }
        clearTimeout(mCSB_container[0].onCompleteTimeout);
        _tweenTo(mCSB_dragger[0],property,Math.round(scrollTo[1]),dur[1],options.scrollEasing);
        if(!d.tweenRunning && ((contentPos===0 && scrollTo[0]>=0) || (contentPos===limit[0] && scrollTo[0]<=limit[0]))){return;}
        _tweenTo(mCSB_container[0],property,Math.round(scrollTo[0]),dur[0],options.scrollEasing,options.overwrite,{
          onStart:function(){
            if(options.callbacks && options.onStart && !d.tweenRunning){
              /* callbacks: onScrollStart */
              if(_cb("onScrollStart")){_mcs(); o.callbacks.onScrollStart.call(el[0]);}
              d.tweenRunning=true;
              _onDragClasses(mCSB_dragger);
              d.cbOffsets=_cbOffsets();
            }
          },onUpdate:function(){
            if(options.callbacks && options.onUpdate){
              /* callbacks: whileScrolling */
              if(_cb("whileScrolling")){_mcs(); o.callbacks.whileScrolling.call(el[0]);}
            }
          },onComplete:function(){
            if(options.callbacks && options.onComplete){
              if(o.axis==="yx"){clearTimeout(mCSB_container[0].onCompleteTimeout);}
              var t=mCSB_container[0].idleTimer || 0;
              mCSB_container[0].onCompleteTimeout=setTimeout(function(){
                /* callbacks: onScroll, onTotalScroll, onTotalScrollBack */
                if(_cb("onScroll")){_mcs(); o.callbacks.onScroll.call(el[0]);}
                if(_cb("onTotalScroll") && scrollTo[1]>=limit[1]-totalScrollOffset && d.cbOffsets[0]){_mcs(); o.callbacks.onTotalScroll.call(el[0]);}
                if(_cb("onTotalScrollBack") && scrollTo[1]<=totalScrollBackOffset && d.cbOffsets[1]){_mcs(); o.callbacks.onTotalScrollBack.call(el[0]);}
                d.tweenRunning=false;
                mCSB_container[0].idleTimer=0;
                _onDragClasses(mCSB_dragger,"hide");
              },t);
            }
          }
        });
        /* checks if callback function exists */
        function _cb(cb){
          return d && o.callbacks[cb] && typeof o.callbacks[cb]==="function";
        }
        /* checks whether callback offsets always trigger */
        function _cbOffsets(){
          return [o.callbacks.alwaysTriggerOffsets || contentPos>=limit[0]+tso,o.callbacks.alwaysTriggerOffsets || contentPos<=-tsbo];
        }
        /*
			populates object with useful values for the user
			values:
				content: this.mcs.content
				content top position: this.mcs.top
				content left position: this.mcs.left
				dragger top position: this.mcs.draggerTop
				dragger left position: this.mcs.draggerLeft
				scrolling y percentage: this.mcs.topPct
				scrolling x percentage: this.mcs.leftPct
				scrolling direction: this.mcs.direction
			*/
        function _mcs(){
          var cp=[mCSB_container[0].offsetTop,mCSB_container[0].offsetLeft], /* content position */
            dp=[mCSB_dragger[0].offsetTop,mCSB_dragger[0].offsetLeft], /* dragger position */
            cl=[mCSB_container.outerHeight(false),mCSB_container.outerWidth(false)], /* content length */
            pl=[mCustomScrollBox.height(),mCustomScrollBox.width()]; /* content parent length */
          el[0].mcs={
            content:mCSB_container, /* original content wrapper as jquery object */
            top:cp[0],left:cp[1],draggerTop:dp[0],draggerLeft:dp[1],
            topPct:Math.round((100*Math.abs(cp[0]))/(Math.abs(cl[0])-pl[0])),leftPct:Math.round((100*Math.abs(cp[1]))/(Math.abs(cl[1])-pl[1])),
            direction:options.dir
          };
          /*
				this refers to the original element containing the scrollbar(s)
				usage: this.mcs.top, this.mcs.leftPct etc.
				*/
        }
      },
      /* -------------------- */


      /*
		CUSTOM JAVASCRIPT ANIMATION TWEEN
		Lighter and faster than jquery animate() and css transitions
		Animates top/left properties and includes easings
		*/
      _tweenTo=function(el,prop,to,duration,easing,overwrite,callbacks){
        if(!el._mTween){el._mTween={top:{},left:{}};}
        var callbacks=callbacks || {},
          onStart=callbacks.onStart || function(){},onUpdate=callbacks.onUpdate || function(){},onComplete=callbacks.onComplete || function(){},
          startTime=_getTime(),_delay,progress=0,from=el.offsetTop,elStyle=el.style,_request,tobj=el._mTween[prop];
        if(prop==="left"){from=el.offsetLeft;}
        var diff=to-from;
        tobj.stop=0;
        if(overwrite!=="none"){_cancelTween();}
        _startTween();
        function _step(){
          if(tobj.stop){return;}
          if(!progress){onStart.call();}
          progress=_getTime()-startTime;
          _tween();
          if(progress>=tobj.time){
            tobj.time=(progress>tobj.time) ? progress+_delay-(progress-tobj.time) : progress+_delay-1;
            if(tobj.time<progress+1){tobj.time=progress+1;}
          }
          if(tobj.time<duration){tobj.id=_request(_step);}else{onComplete.call();}
        }
        function _tween(){
          if(duration>0){
            tobj.currVal=_ease(tobj.time,from,diff,duration,easing);
            elStyle[prop]=Math.round(tobj.currVal)+"px";
          }else{
            elStyle[prop]=to+"px";
          }
          onUpdate.call();
        }
        function _startTween(){
          _delay=1000/60;
          tobj.time=progress+_delay;
          _request=(!window.requestAnimationFrame) ? function(f){_tween(); return setTimeout(f,0.01);} : window.requestAnimationFrame;
          tobj.id=_request(_step);
        }
        function _cancelTween(){
          if(tobj.id==null){return;}
          if(!window.requestAnimationFrame){clearTimeout(tobj.id);
          }else{window.cancelAnimationFrame(tobj.id);}
          tobj.id=null;
        }
        function _ease(t,b,c,d,type){
          switch(type){
            case "linear": case "mcsLinear":
              return c*t/d + b;
              break;
            case "mcsLinearOut":
              t/=d; t--; return c * Math.sqrt(1 - t*t) + b;
              break;
            case "easeInOutSmooth":
              t/=d/2;
              if(t<1) return c/2*t*t + b;
              t--;
              return -c/2 * (t*(t-2) - 1) + b;
              break;
            case "easeInOutStrong":
              t/=d/2;
              if(t<1) return c/2 * Math.pow( 2, 10 * (t - 1) ) + b;
              t--;
              return c/2 * ( -Math.pow( 2, -10 * t) + 2 ) + b;
              break;
            case "easeInOut": case "mcsEaseInOut":
              t/=d/2;
              if(t<1) return c/2*t*t*t + b;
              t-=2;
              return c/2*(t*t*t + 2) + b;
              break;
            case "easeOutSmooth":
              t/=d; t--;
              return -c * (t*t*t*t - 1) + b;
              break;
            case "easeOutStrong":
              return c * ( -Math.pow( 2, -10 * t/d ) + 1 ) + b;
              break;
            case "easeOut": case "mcsEaseOut": default:
              var ts=(t/=d)*t,tc=ts*t;
              return b+c*(0.499999999999997*tc*ts + -2.5*ts*ts + 5.5*tc + -6.5*ts + 4*t);
          }
        }
      },
      /* -------------------- */


      /* returns current time */
      _getTime=function(){
        if(window.performance && window.performance.now){
          return window.performance.now();
        }else{
          if(window.performance && window.performance.webkitNow){
            return window.performance.webkitNow();
          }else{
            if(Date.now){return Date.now();}else{return new Date().getTime();}
          }
        }
      },
      /* -------------------- */


      /* stops a tween */
      _stopTween=function(){
        var el=this;
        if(!el._mTween){el._mTween={top:{},left:{}};}
        var props=["top","left"];
        for(var i=0; i<props.length; i++){
          var prop=props[i];
          if(el._mTween[prop].id){
            if(!window.requestAnimationFrame){clearTimeout(el._mTween[prop].id);
            }else{window.cancelAnimationFrame(el._mTween[prop].id);}
            el._mTween[prop].id=null;
            el._mTween[prop].stop=1;
          }
        }
      },
      /* -------------------- */


      /* deletes a property (avoiding the exception thrown by IE) */
      _delete=function(c,m){
        try{delete c[m];}catch(e){c[m]=null;}
      },
      /* -------------------- */


      /* detects left mouse button */
      _mouseBtnLeft=function(e){
        return !(e.which && e.which!==1);
      },
      /* -------------------- */


      /* detects if pointer type event is touch */
      _pointerTouch=function(e){
        var t=e.originalEvent.pointerType;
        return !(t && t!=="touch" && t!==2);
      },
      /* -------------------- */


      /* checks if value is numeric */
      _isNumeric=function(val){
        return !isNaN(parseFloat(val)) && isFinite(val);
      },
      /* -------------------- */


      /* returns element position according to content */
      _childPos=function(el){
        var p=el.parents(".mCSB_container");
        return [el.offset().top-p.offset().top,el.offset().left-p.offset().left];
      },
      /* -------------------- */


      /* checks if browser tab is hidden/inactive via Page Visibility API */
      _isTabHidden=function(){
        var prop=_getHiddenProp();
        if(!prop) return false;
        return document[prop];
        function _getHiddenProp(){
          var pfx=["webkit","moz","ms","o"];
          if("hidden" in document) return "hidden"; //natively supported
          for(var i=0; i<pfx.length; i++){ //prefixed
            if((pfx[i]+"Hidden") in document)
              return pfx[i]+"Hidden";
          }
          return null; //not supported
        }
      };
    /* -------------------- */





    /*
	----------------------------------------
	PLUGIN SETUP
	----------------------------------------
	*/

    /* plugin constructor functions */
    $.fn[pluginNS]=function(method){ /* usage: $(selector).mCustomScrollbar(); */
      if(methods[method]){
        return methods[method].apply(this,Array.prototype.slice.call(arguments,1));
      }else if(typeof method==="object" || !method){
        return methods.init.apply(this,arguments);
      }else{
        $.error("Method "+method+" does not exist");
      }
    };
    $[pluginNS]=function(method){ /* usage: $.mCustomScrollbar(); */
      if(methods[method]){
        return methods[method].apply(this,Array.prototype.slice.call(arguments,1));
      }else if(typeof method==="object" || !method){
        return methods.init.apply(this,arguments);
      }else{
        $.error("Method "+method+" does not exist");
      }
    };

    /*
	allow setting plugin default options.
	usage: $.mCustomScrollbar.defaults.scrollInertia=500;
	to apply any changed default options on default selectors (below), use inside document ready fn
	e.g.: $(document).ready(function(){ $.mCustomScrollbar.defaults.scrollInertia=500; });
	*/
    $[pluginNS].defaults=defaults;

    /*
	add window object (window.mCustomScrollbar)
	usage: if(window.mCustomScrollbar){console.log("custom scrollbar plugin loaded");}
	*/
    window[pluginNS]=true;

    $(window).bind("load",function(){

      $(defaultSelector)[pluginNS](); /* add scrollbars automatically on default selector */

      /* extend jQuery expressions */
      $.extend($.expr[":"],{
        /* checks if element is within scrollable viewport */
        mcsInView:$.expr[":"].mcsInView || function(el){
          var $el=$(el),content=$el.parents(".mCSB_container"),wrapper,cPos;
          if(!content.length){return;}
          wrapper=content.parent();
          cPos=[content[0].offsetTop,content[0].offsetLeft];
          return 	cPos[0]+_childPos($el)[0]>=0 && cPos[0]+_childPos($el)[0]<wrapper.height()-$el.outerHeight(false) &&
            cPos[1]+_childPos($el)[1]>=0 && cPos[1]+_childPos($el)[1]<wrapper.width()-$el.outerWidth(false);
        },
        /* checks if element or part of element is in view of scrollable viewport */
        mcsInSight:$.expr[":"].mcsInSight || function(el,i,m){
          var $el=$(el),elD,content=$el.parents(".mCSB_container"),wrapperView,pos,wrapperViewPct,
            pctVals=m[3]==="exact" ? [[1,0],[1,0]] : [[0.9,0.1],[0.6,0.4]];
          if(!content.length){return;}
          elD=[$el.outerHeight(false),$el.outerWidth(false)];
          pos=[content[0].offsetTop+_childPos($el)[0],content[0].offsetLeft+_childPos($el)[1]];
          wrapperView=[content.parent()[0].offsetHeight,content.parent()[0].offsetWidth];
          wrapperViewPct=[elD[0]<wrapperView[0] ? pctVals[0] : pctVals[1],elD[1]<wrapperView[1] ? pctVals[0] : pctVals[1]];
          return 	pos[0]-(wrapperView[0]*wrapperViewPct[0][0])<0 && pos[0]+elD[0]-(wrapperView[0]*wrapperViewPct[0][1])>=0 &&
            pos[1]-(wrapperView[1]*wrapperViewPct[1][0])<0 && pos[1]+elD[1]-(wrapperView[1]*wrapperViewPct[1][1])>=0;
        },
        /* checks if element is overflowed having visible scrollbar(s) */
        mcsOverflow:$.expr[":"].mcsOverflow || function(el){
          var d=$(el).data(pluginPfx);
          if(!d){return;}
          return d.overflowed[0] || d.overflowed[1];
        }
      });

    });

  }))}));
/*! Magnific Popup - v1.1.0 - 2016-02-20
* http://dimsemenov.com/plugins/magnific-popup/
* Copyright (c) 2016 Dmitry Semenov; */
;(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // Node/CommonJS
    factory(require('jquery'));
  } else {
    // Browser globals
    factory(window.jQuery || window.Zepto);
  }
}(function($) {

  /*>>core*/
  /**
   *
   * Magnific Popup Core JS file
   *
   */


  /**
   * Private static constants
   */
  var CLOSE_EVENT = 'Close',
    BEFORE_CLOSE_EVENT = 'BeforeClose',
    AFTER_CLOSE_EVENT = 'AfterClose',
    BEFORE_APPEND_EVENT = 'BeforeAppend',
    MARKUP_PARSE_EVENT = 'MarkupParse',
    OPEN_EVENT = 'Open',
    CHANGE_EVENT = 'Change',
    NS = 'mfp',
    EVENT_NS = '.' + NS,
    READY_CLASS = 'mfp-ready',
    REMOVING_CLASS = 'mfp-removing',
    PREVENT_CLOSE_CLASS = 'mfp-prevent-close';


  /**
   * Private vars
   */
  /*jshint -W079 */
  var mfp, // As we have only one instance of MagnificPopup object, we define it locally to not to use 'this'
    MagnificPopup = function(){},
    _isJQ = !!(window.jQuery),
    _prevStatus,
    _window = $(window),
    _document,
    _prevContentType,
    _wrapClasses,
    _currPopupType;


  /**
   * Private functions
   */
  var _mfpOn = function(name, f) {
      mfp.ev.on(NS + name + EVENT_NS, f);
    },
    _getEl = function(className, appendTo, html, raw) {
      var el = document.createElement('div');
      el.className = 'mfp-'+className;
      if(html) {
        el.innerHTML = html;
      }
      if(!raw) {
        el = $(el);
        if(appendTo) {
          el.appendTo(appendTo);
        }
      } else if(appendTo) {
        appendTo.appendChild(el);
      }
      return el;
    },
    _mfpTrigger = function(e, data) {
      mfp.ev.triggerHandler(NS + e, data);

      if(mfp.st.callbacks) {
        // converts "mfpEventName" to "eventName" callback and triggers it if it's present
        e = e.charAt(0).toLowerCase() + e.slice(1);
        if(mfp.st.callbacks[e]) {
          mfp.st.callbacks[e].apply(mfp, $.isArray(data) ? data : [data]);
        }
      }
    },
    _getCloseBtn = function(type) {
      if(type !== _currPopupType || !mfp.currTemplate.closeBtn) {
        mfp.currTemplate.closeBtn = $( mfp.st.closeMarkup.replace('%title%', mfp.st.tClose ) );
        _currPopupType = type;
      }
      return mfp.currTemplate.closeBtn;
    },
    // Initialize Magnific Popup only when called at least once
    _checkInstance = function() {
      if(!$.magnificPopup.instance) {
        /*jshint -W020 */
        mfp = new MagnificPopup();
        mfp.init();
        $.magnificPopup.instance = mfp;
      }
    },
    // CSS transition detection, http://stackoverflow.com/questions/7264899/detect-css-transitions-using-javascript-and-without-modernizr
    supportsTransitions = function() {
      var s = document.createElement('p').style, // 's' for style. better to create an element if body yet to exist
        v = ['ms','O','Moz','Webkit']; // 'v' for vendor

      if( s['transition'] !== undefined ) {
        return true;
      }

      while( v.length ) {
        if( v.pop() + 'Transition' in s ) {
          return true;
        }
      }

      return false;
    };



  /**
   * Public functions
   */
  MagnificPopup.prototype = {

    constructor: MagnificPopup,

    /**
     * Initializes Magnific Popup plugin.
     * This function is triggered only once when $.fn.magnificPopup or $.magnificPopup is executed
     */
    init: function() {
      var appVersion = navigator.appVersion;
      mfp.isLowIE = mfp.isIE8 = document.all && !document.addEventListener;
      mfp.isAndroid = (/android/gi).test(appVersion);
      mfp.isIOS = (/iphone|ipad|ipod/gi).test(appVersion);
      mfp.supportsTransition = supportsTransitions();

      // We disable fixed positioned lightbox on devices that don't handle it nicely.
      // If you know a better way of detecting this - let me know.
      mfp.probablyMobile = (mfp.isAndroid || mfp.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent) );
      _document = $(document);

      mfp.popupsCache = {};
    },

    /**
     * Opens popup
     * @param  data [description]
     */
    open: function(data) {

      var i;

      if(data.isObj === false) {
        // convert jQuery collection to array to avoid conflicts later
        mfp.items = data.items.toArray();

        mfp.index = 0;
        var items = data.items,
          item;
        for(i = 0; i < items.length; i++) {
          item = items[i];
          if(item.parsed) {
            item = item.el[0];
          }
          if(item === data.el[0]) {
            mfp.index = i;
            break;
          }
        }
      } else {
        mfp.items = $.isArray(data.items) ? data.items : [data.items];
        mfp.index = data.index || 0;
      }

      // if popup is already opened - we just update the content
      if(mfp.isOpen) {
        mfp.updateItemHTML();
        return;
      }

      mfp.types = [];
      _wrapClasses = '';
      if(data.mainEl && data.mainEl.length) {
        mfp.ev = data.mainEl.eq(0);
      } else {
        mfp.ev = _document;
      }

      if(data.key) {
        if(!mfp.popupsCache[data.key]) {
          mfp.popupsCache[data.key] = {};
        }
        mfp.currTemplate = mfp.popupsCache[data.key];
      } else {
        mfp.currTemplate = {};
      }



      mfp.st = $.extend(true, {}, $.magnificPopup.defaults, data );
      mfp.fixedContentPos = mfp.st.fixedContentPos === 'auto' ? !mfp.probablyMobile : mfp.st.fixedContentPos;

      if(mfp.st.modal) {
        mfp.st.closeOnContentClick = false;
        mfp.st.closeOnBgClick = false;
        mfp.st.showCloseBtn = false;
        mfp.st.enableEscapeKey = false;
      }


      // Building markup
      // main containers are created only once
      if(!mfp.bgOverlay) {

        // Dark overlay
        mfp.bgOverlay = _getEl('bg').on('click'+EVENT_NS, function() {
          mfp.close();
        });

        mfp.wrap = _getEl('wrap').attr('tabindex', -1).on('click'+EVENT_NS, function(e) {
          if(mfp._checkIfClose(e.target)) {
            mfp.close();
          }
        });

        mfp.container = _getEl('container', mfp.wrap);
      }

      mfp.contentContainer = _getEl('content');
      if(mfp.st.preloader) {
        mfp.preloader = _getEl('preloader', mfp.container, mfp.st.tLoading);
      }


      // Initializing modules
      var modules = $.magnificPopup.modules;
      for(i = 0; i < modules.length; i++) {
        var n = modules[i];
        n = n.charAt(0).toUpperCase() + n.slice(1);
        mfp['init'+n].call(mfp);
      }
      _mfpTrigger('BeforeOpen');


      if(mfp.st.showCloseBtn) {
        // Close button
        if(!mfp.st.closeBtnInside) {
          mfp.wrap.append( _getCloseBtn() );
        } else {
          _mfpOn(MARKUP_PARSE_EVENT, function(e, template, values, item) {
            values.close_replaceWith = _getCloseBtn(item.type);
          });
          _wrapClasses += ' mfp-close-btn-in';
        }
      }

      if(mfp.st.alignTop) {
        _wrapClasses += ' mfp-align-top';
      }



      if(mfp.fixedContentPos) {
        mfp.wrap.css({
          overflow: mfp.st.overflowY,
          overflowX: 'hidden',
          overflowY: mfp.st.overflowY
        });
      } else {
        mfp.wrap.css({
          top: _window.scrollTop(),
          position: 'absolute'
        });
      }
      if( mfp.st.fixedBgPos === false || (mfp.st.fixedBgPos === 'auto' && !mfp.fixedContentPos) ) {
        mfp.bgOverlay.css({
          height: _document.height(),
          position: 'absolute'
        });
      }



      if(mfp.st.enableEscapeKey) {
        // Close on ESC key
        _document.on('keyup' + EVENT_NS, function(e) {
          if(e.keyCode === 27) {
            mfp.close();
          }
        });
      }

      _window.on('resize' + EVENT_NS, function() {
        mfp.updateSize();
      });


      if(!mfp.st.closeOnContentClick) {
        _wrapClasses += ' mfp-auto-cursor';
      }

      if(_wrapClasses)
        mfp.wrap.addClass(_wrapClasses);


      // this triggers recalculation of layout, so we get it once to not to trigger twice
      var windowHeight = mfp.wH = _window.height();


      var windowStyles = {};

      if( mfp.fixedContentPos ) {
        if(mfp._hasScrollBar(windowHeight)){
          var s = mfp._getScrollbarSize();
          if(s) {
            windowStyles.marginRight = s;
          }
        }
      }

      if(mfp.fixedContentPos) {
        if(!mfp.isIE7) {
          windowStyles.overflow = 'hidden';
        } else {
          // ie7 double-scroll bug
          $('body, html').css('overflow', 'hidden');
        }
      }



      var classesToadd = mfp.st.mainClass;
      if(mfp.isIE7) {
        classesToadd += ' mfp-ie7';
      }
      if(classesToadd) {
        mfp._addClassToMFP( classesToadd );
      }

      // add content
      mfp.updateItemHTML();

      _mfpTrigger('BuildControls');

      // remove scrollbar, add margin e.t.c
      $('html').css(windowStyles);

      // add everything to DOM
      mfp.bgOverlay.add(mfp.wrap).prependTo( mfp.st.prependTo || $(document.body) );

      // Save last focused element
      mfp._lastFocusedEl = document.activeElement;

      // Wait for next cycle to allow CSS transition
      setTimeout(function() {

        if(mfp.content) {
          mfp._addClassToMFP(READY_CLASS);
          mfp._setFocus();
        } else {
          // if content is not defined (not loaded e.t.c) we add class only for BG
          mfp.bgOverlay.addClass(READY_CLASS);
        }

        // Trap the focus in popup
        _document.on('focusin' + EVENT_NS, mfp._onFocusIn);

      }, 16);

      mfp.isOpen = true;
      mfp.updateSize(windowHeight);
      _mfpTrigger(OPEN_EVENT);

      return data;
    },

    /**
     * Closes the popup
     */
    close: function() {
      if(!mfp.isOpen) return;
      _mfpTrigger(BEFORE_CLOSE_EVENT);

      mfp.isOpen = false;
      // for CSS3 animation
      if(mfp.st.removalDelay && !mfp.isLowIE && mfp.supportsTransition )  {
        mfp._addClassToMFP(REMOVING_CLASS);
        setTimeout(function() {
          mfp._close();
        }, mfp.st.removalDelay);
      } else {
        mfp._close();
      }
    },

    /**
     * Helper for close() function
     */
    _close: function() {
      _mfpTrigger(CLOSE_EVENT);

      var classesToRemove = REMOVING_CLASS + ' ' + READY_CLASS + ' ';

      mfp.bgOverlay.detach();
      mfp.wrap.detach();
      mfp.container.empty();

      if(mfp.st.mainClass) {
        classesToRemove += mfp.st.mainClass + ' ';
      }

      mfp._removeClassFromMFP(classesToRemove);

      if(mfp.fixedContentPos) {
        var windowStyles = {marginRight: ''};
        if(mfp.isIE7) {
          $('body, html').css('overflow', '');
        } else {
          windowStyles.overflow = '';
        }
        $('html').css(windowStyles);
      }

      _document.off('keyup' + EVENT_NS + ' focusin' + EVENT_NS);
      mfp.ev.off(EVENT_NS);

      // clean up DOM elements that aren't removed
      mfp.wrap.attr('class', 'mfp-wrap').removeAttr('style');
      mfp.bgOverlay.attr('class', 'mfp-bg');
      mfp.container.attr('class', 'mfp-container');

      // remove close button from target element
      if(mfp.st.showCloseBtn &&
        (!mfp.st.closeBtnInside || mfp.currTemplate[mfp.currItem.type] === true)) {
        if(mfp.currTemplate.closeBtn)
          mfp.currTemplate.closeBtn.detach();
      }


      if(mfp.st.autoFocusLast && mfp._lastFocusedEl) {
        $(mfp._lastFocusedEl).focus(); // put tab focus back
      }
      mfp.currItem = null;
      mfp.content = null;
      mfp.currTemplate = null;
      mfp.prevHeight = 0;

      _mfpTrigger(AFTER_CLOSE_EVENT);
    },

    updateSize: function(winHeight) {

      if(mfp.isIOS) {
        // fixes iOS nav bars https://github.com/dimsemenov/Magnific-Popup/issues/2
        var zoomLevel = document.documentElement.clientWidth / window.innerWidth;
        var height = window.innerHeight * zoomLevel;
        mfp.wrap.css('height', height);
        mfp.wH = height;
      } else {
        mfp.wH = winHeight || _window.height();
      }
      // Fixes #84: popup incorrectly positioned with position:relative on body
      if(!mfp.fixedContentPos) {
        mfp.wrap.css('height', mfp.wH);
      }

      _mfpTrigger('Resize');

    },

    /**
     * Set content of popup based on current index
     */
    updateItemHTML: function() {
      var item = mfp.items[mfp.index];

      // Detach and perform modifications
      mfp.contentContainer.detach();

      if(mfp.content)
        mfp.content.detach();

      if(!item.parsed) {
        item = mfp.parseEl( mfp.index );
      }

      var type = item.type;

      _mfpTrigger('BeforeChange', [mfp.currItem ? mfp.currItem.type : '', type]);
      // BeforeChange event works like so:
      // _mfpOn('BeforeChange', function(e, prevType, newType) { });

      mfp.currItem = item;

      if(!mfp.currTemplate[type]) {
        var markup = mfp.st[type] ? mfp.st[type].markup : false;

        // allows to modify markup
        _mfpTrigger('FirstMarkupParse', markup);

        if(markup) {
          mfp.currTemplate[type] = $(markup);
        } else {
          // if there is no markup found we just define that template is parsed
          mfp.currTemplate[type] = true;
        }
      }

      if(_prevContentType && _prevContentType !== item.type) {
        mfp.container.removeClass('mfp-'+_prevContentType+'-holder');
      }

      var newContent = mfp['get' + type.charAt(0).toUpperCase() + type.slice(1)](item, mfp.currTemplate[type]);
      mfp.appendContent(newContent, type);

      item.preloaded = true;

      _mfpTrigger(CHANGE_EVENT, item);
      _prevContentType = item.type;

      // Append container back after its content changed
      mfp.container.prepend(mfp.contentContainer);

      _mfpTrigger('AfterChange');
    },


    /**
     * Set HTML content of popup
     */
    appendContent: function(newContent, type) {
      mfp.content = newContent;

      if(newContent) {
        if(mfp.st.showCloseBtn && mfp.st.closeBtnInside &&
          mfp.currTemplate[type] === true) {
          // if there is no markup, we just append close button element inside
          if(!mfp.content.find('.mfp-close').length) {
            mfp.content.append(_getCloseBtn());
          }
        } else {
          mfp.content = newContent;
        }
      } else {
        mfp.content = '';
      }

      _mfpTrigger(BEFORE_APPEND_EVENT);
      mfp.container.addClass('mfp-'+type+'-holder');

      mfp.contentContainer.append(mfp.content);
    },


    /**
     * Creates Magnific Popup data object based on given data
     * @param  {int} index Index of item to parse
     */
    parseEl: function(index) {
      var item = mfp.items[index],
        type;

      if(item.tagName) {
        item = { el: $(item) };
      } else {
        type = item.type;
        item = { data: item, src: item.src };
      }

      if(item.el) {
        var types = mfp.types;

        // check for 'mfp-TYPE' class
        for(var i = 0; i < types.length; i++) {
          if( item.el.hasClass('mfp-'+types[i]) ) {
            type = types[i];
            break;
          }
        }

        item.src = item.el.attr('data-mfp-src');
        if(!item.src) {
          item.src = item.el.attr('href');
        }
      }

      item.type = type || mfp.st.type || 'inline';
      item.index = index;
      item.parsed = true;
      mfp.items[index] = item;
      _mfpTrigger('ElementParse', item);

      return mfp.items[index];
    },


    /**
     * Initializes single popup or a group of popups
     */
    addGroup: function(el, options) {
      var eHandler = function(e) {
        e.mfpEl = this;
        mfp._openClick(e, el, options);
      };

      if(!options) {
        options = {};
      }

      var eName = 'click.magnificPopup';
      options.mainEl = el;

      if(options.items) {
        options.isObj = true;
        el.off(eName).on(eName, eHandler);
      } else {
        options.isObj = false;
        if(options.delegate) {
          el.off(eName).on(eName, options.delegate , eHandler);
        } else {
          options.items = el;
          el.off(eName).on(eName, eHandler);
        }
      }
    },
    _openClick: function(e, el, options) {
      var midClick = options.midClick !== undefined ? options.midClick : $.magnificPopup.defaults.midClick;


      if(!midClick && ( e.which === 2 || e.ctrlKey || e.metaKey || e.altKey || e.shiftKey ) ) {
        return;
      }

      var disableOn = options.disableOn !== undefined ? options.disableOn : $.magnificPopup.defaults.disableOn;

      if(disableOn) {
        if($.isFunction(disableOn)) {
          if( !disableOn.call(mfp) ) {
            return true;
          }
        } else { // else it's number
          if( _window.width() < disableOn ) {
            return true;
          }
        }
      }

      if(e.type) {
        e.preventDefault();

        // This will prevent popup from closing if element is inside and popup is already opened
        if(mfp.isOpen) {
          e.stopPropagation();
        }
      }

      options.el = $(e.mfpEl);
      if(options.delegate) {
        options.items = el.find(options.delegate);
      }
      mfp.open(options);
    },


    /**
     * Updates text on preloader
     */
    updateStatus: function(status, text) {

      if(mfp.preloader) {
        if(_prevStatus !== status) {
          mfp.container.removeClass('mfp-s-'+_prevStatus);
        }

        if(!text && status === 'loading') {
          text = mfp.st.tLoading;
        }

        var data = {
          status: status,
          text: text
        };
        // allows to modify status
        _mfpTrigger('UpdateStatus', data);

        status = data.status;
        text = data.text;

        mfp.preloader.html(text);

        mfp.preloader.find('a').on('click', function(e) {
          e.stopImmediatePropagation();
        });

        mfp.container.addClass('mfp-s-'+status);
        _prevStatus = status;
      }
    },


    /*
		"Private" helpers that aren't private at all
	 */
    // Check to close popup or not
    // "target" is an element that was clicked
    _checkIfClose: function(target) {

      if($(target).hasClass(PREVENT_CLOSE_CLASS)) {
        return;
      }

      var closeOnContent = mfp.st.closeOnContentClick;
      var closeOnBg = mfp.st.closeOnBgClick;

      if(closeOnContent && closeOnBg) {
        return true;
      } else {

        // We close the popup if click is on close button or on preloader. Or if there is no content.
        if(!mfp.content || $(target).hasClass('mfp-close') || (mfp.preloader && target === mfp.preloader[0]) ) {
          return true;
        }

        // if click is outside the content
        if(  (target !== mfp.content[0] && !$.contains(mfp.content[0], target))  ) {
          if(closeOnBg) {
            // last check, if the clicked element is in DOM, (in case it's removed onclick)
            if( $.contains(document, target) ) {
              return true;
            }
          }
        } else if(closeOnContent) {
          return true;
        }

      }
      return false;
    },
    _addClassToMFP: function(cName) {
      mfp.bgOverlay.addClass(cName);
      mfp.wrap.addClass(cName);
    },
    _removeClassFromMFP: function(cName) {
      this.bgOverlay.removeClass(cName);
      mfp.wrap.removeClass(cName);
    },
    _hasScrollBar: function(winHeight) {
      return (  (mfp.isIE7 ? _document.height() : document.body.scrollHeight) > (winHeight || _window.height()) );
    },
    _setFocus: function() {
      (mfp.st.focus ? mfp.content.find(mfp.st.focus).eq(0) : mfp.wrap).focus();
    },
    _onFocusIn: function(e) {
      if( e.target !== mfp.wrap[0] && !$.contains(mfp.wrap[0], e.target) ) {
        mfp._setFocus();
        return false;
      }
    },
    _parseMarkup: function(template, values, item) {
      var arr;
      if(item.data) {
        values = $.extend(item.data, values);
      }
      _mfpTrigger(MARKUP_PARSE_EVENT, [template, values, item] );

      $.each(values, function(key, value) {
        if(value === undefined || value === false) {
          return true;
        }
        arr = key.split('_');
        if(arr.length > 1) {
          var el = template.find(EVENT_NS + '-'+arr[0]);

          if(el.length > 0) {
            var attr = arr[1];
            if(attr === 'replaceWith') {
              if(el[0] !== value[0]) {
                el.replaceWith(value);
              }
            } else if(attr === 'img') {
              if(el.is('img')) {
                el.attr('src', value);
              } else {
                el.replaceWith( $('<img>').attr('src', value).attr('class', el.attr('class')) );
              }
            } else {
              el.attr(arr[1], value);
            }
          }

        } else {
          template.find(EVENT_NS + '-'+key).html(value);
        }
      });
    },

    _getScrollbarSize: function() {
      // thx David
      if(mfp.scrollbarSize === undefined) {
        var scrollDiv = document.createElement("div");
        scrollDiv.style.cssText = 'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;';
        document.body.appendChild(scrollDiv);
        mfp.scrollbarSize = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        document.body.removeChild(scrollDiv);
      }
      return mfp.scrollbarSize;
    }

  }; /* MagnificPopup core prototype end */




  /**
   * Public static functions
   */
  $.magnificPopup = {
    instance: null,
    proto: MagnificPopup.prototype,
    modules: [],

    open: function(options, index) {
      _checkInstance();

      if(!options) {
        options = {};
      } else {
        options = $.extend(true, {}, options);
      }

      options.isObj = true;
      options.index = index || 0;
      return this.instance.open(options);
    },

    close: function() {
      return $.magnificPopup.instance && $.magnificPopup.instance.close();
    },

    registerModule: function(name, module) {
      if(module.options) {
        $.magnificPopup.defaults[name] = module.options;
      }
      $.extend(this.proto, module.proto);
      this.modules.push(name);
    },

    defaults: {

      // Info about options is in docs:
      // http://dimsemenov.com/plugins/magnific-popup/documentation.html#options

      disableOn: 0,

      key: null,

      midClick: false,

      mainClass: '',

      preloader: true,

      focus: '', // CSS selector of input to focus after popup is opened

      closeOnContentClick: false,

      closeOnBgClick: true,

      closeBtnInside: true,

      showCloseBtn: true,

      enableEscapeKey: true,

      modal: false,

      alignTop: false,

      removalDelay: 0,

      prependTo: null,

      fixedContentPos: 'auto',

      fixedBgPos: 'auto',

      overflowY: 'auto',

      closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',

      tClose: 'Close (Esc)',

      tLoading: 'Loading...',

      autoFocusLast: true

    }
  };



  $.fn.magnificPopup = function(options) {
    _checkInstance();

    var jqEl = $(this);

    // We call some API method of first param is a string
    if (typeof options === "string" ) {

      if(options === 'open') {
        var items,
          itemOpts = _isJQ ? jqEl.data('magnificPopup') : jqEl[0].magnificPopup,
          index = parseInt(arguments[1], 10) || 0;

        if(itemOpts.items) {
          items = itemOpts.items[index];
        } else {
          items = jqEl;
          if(itemOpts.delegate) {
            items = items.find(itemOpts.delegate);
          }
          items = items.eq( index );
        }
        mfp._openClick({mfpEl:items}, jqEl, itemOpts);
      } else {
        if(mfp.isOpen)
          mfp[options].apply(mfp, Array.prototype.slice.call(arguments, 1));
      }

    } else {
      // clone options obj
      options = $.extend(true, {}, options);

      /*
		 * As Zepto doesn't support .data() method for objects
		 * and it works only in normal browsers
		 * we assign "options" object directly to the DOM element. FTW!
		 */
      if(_isJQ) {
        jqEl.data('magnificPopup', options);
      } else {
        jqEl[0].magnificPopup = options;
      }

      mfp.addGroup(jqEl, options);

    }
    return jqEl;
  };

  /*>>core*/

  /*>>inline*/

  var INLINE_NS = 'inline',
    _hiddenClass,
    _inlinePlaceholder,
    _lastInlineElement,
    _putInlineElementsBack = function() {
      if(_lastInlineElement) {
        _inlinePlaceholder.after( _lastInlineElement.addClass(_hiddenClass) ).detach();
        _lastInlineElement = null;
      }
    };

  $.magnificPopup.registerModule(INLINE_NS, {
    options: {
      hiddenClass: 'hide', // will be appended with `mfp-` prefix
      markup: '',
      tNotFound: 'Content not found'
    },
    proto: {

      initInline: function() {
        mfp.types.push(INLINE_NS);

        _mfpOn(CLOSE_EVENT+'.'+INLINE_NS, function() {
          _putInlineElementsBack();
        });
      },

      getInline: function(item, template) {

        _putInlineElementsBack();

        if(item.src) {
          var inlineSt = mfp.st.inline,
            el = $(item.src);

          if(el.length) {

            // If target element has parent - we replace it with placeholder and put it back after popup is closed
            var parent = el[0].parentNode;
            if(parent && parent.tagName) {
              if(!_inlinePlaceholder) {
                _hiddenClass = inlineSt.hiddenClass;
                _inlinePlaceholder = _getEl(_hiddenClass);
                _hiddenClass = 'mfp-'+_hiddenClass;
              }
              // replace target inline element with placeholder
              _lastInlineElement = el.after(_inlinePlaceholder).detach().removeClass(_hiddenClass);
            }

            mfp.updateStatus('ready');
          } else {
            mfp.updateStatus('error', inlineSt.tNotFound);
            el = $('<div>');
          }

          item.inlineElement = el;
          return el;
        }

        mfp.updateStatus('ready');
        mfp._parseMarkup(template, {}, item);
        return template;
      }
    }
  });

  /*>>inline*/

  /*>>ajax*/
  var AJAX_NS = 'ajax',
    _ajaxCur,
    _removeAjaxCursor = function() {
      if(_ajaxCur) {
        $(document.body).removeClass(_ajaxCur);
      }
    },
    _destroyAjaxRequest = function() {
      _removeAjaxCursor();
      if(mfp.req) {
        mfp.req.abort();
      }
    };

  $.magnificPopup.registerModule(AJAX_NS, {

    options: {
      settings: null,
      cursor: 'mfp-ajax-cur',
      tError: '<a href="%url%">The content</a> could not be loaded.'
    },

    proto: {
      initAjax: function() {
        mfp.types.push(AJAX_NS);
        _ajaxCur = mfp.st.ajax.cursor;

        _mfpOn(CLOSE_EVENT+'.'+AJAX_NS, _destroyAjaxRequest);
        _mfpOn('BeforeChange.' + AJAX_NS, _destroyAjaxRequest);
      },
      getAjax: function(item) {

        if(_ajaxCur) {
          $(document.body).addClass(_ajaxCur);
        }

        mfp.updateStatus('loading');

        var opts = $.extend({
          url: item.src,
          success: function(data, textStatus, jqXHR) {
            var temp = {
              data:data,
              xhr:jqXHR
            };

            _mfpTrigger('ParseAjax', temp);

            mfp.appendContent( $(temp.data), AJAX_NS );

            item.finished = true;

            _removeAjaxCursor();

            mfp._setFocus();

            setTimeout(function() {
              mfp.wrap.addClass(READY_CLASS);
            }, 16);

            mfp.updateStatus('ready');

            _mfpTrigger('AjaxContentAdded');
          },
          error: function() {
            _removeAjaxCursor();
            item.finished = item.loadError = true;
            mfp.updateStatus('error', mfp.st.ajax.tError.replace('%url%', item.src));
          }
        }, mfp.st.ajax.settings);

        mfp.req = $.ajax(opts);

        return '';
      }
    }
  });

  /*>>ajax*/

  /*>>image*/
  var _imgInterval,
    _getTitle = function(item) {
      if(item.data && item.data.title !== undefined)
        return item.data.title;

      var src = mfp.st.image.titleSrc;

      if(src) {
        if($.isFunction(src)) {
          return src.call(mfp, item);
        } else if(item.el) {
          return item.el.attr(src) || '';
        }
      }
      return '';
    };

  $.magnificPopup.registerModule('image', {

    options: {
      markup: '<div class="mfp-figure">'+
        '<div class="mfp-close"></div>'+
        '<figure>'+
        '<div class="mfp-img"></div>'+
        '<figcaption>'+
        '<div class="mfp-bottom-bar">'+
        '<div class="mfp-title"></div>'+
        '<div class="mfp-counter"></div>'+
        '</div>'+
        '</figcaption>'+
        '</figure>'+
        '</div>',
      cursor: 'mfp-zoom-out-cur',
      titleSrc: 'title',
      verticalFit: true,
      tError: '<a href="%url%">The image</a> could not be loaded.'
    },

    proto: {
      initImage: function() {
        var imgSt = mfp.st.image,
          ns = '.image';

        mfp.types.push('image');

        _mfpOn(OPEN_EVENT+ns, function() {
          if(mfp.currItem.type === 'image' && imgSt.cursor) {
            $(document.body).addClass(imgSt.cursor);
          }
        });

        _mfpOn(CLOSE_EVENT+ns, function() {
          if(imgSt.cursor) {
            $(document.body).removeClass(imgSt.cursor);
          }
          _window.off('resize' + EVENT_NS);
        });

        _mfpOn('Resize'+ns, mfp.resizeImage);
        if(mfp.isLowIE) {
          _mfpOn('AfterChange', mfp.resizeImage);
        }
      },
      resizeImage: function() {
        var item = mfp.currItem;
        if(!item || !item.img) return;

        if(mfp.st.image.verticalFit) {
          var decr = 0;
          // fix box-sizing in ie7/8
          if(mfp.isLowIE) {
            decr = parseInt(item.img.css('padding-top'), 10) + parseInt(item.img.css('padding-bottom'),10);
          }
          item.img.css('max-height', mfp.wH-decr);
        }
      },
      _onImageHasSize: function(item) {
        if(item.img) {

          item.hasSize = true;

          if(_imgInterval) {
            clearInterval(_imgInterval);
          }

          item.isCheckingImgSize = false;

          _mfpTrigger('ImageHasSize', item);

          if(item.imgHidden) {
            if(mfp.content)
              mfp.content.removeClass('mfp-loading');

            item.imgHidden = false;
          }

        }
      },

      /**
       * Function that loops until the image has size to display elements that rely on it asap
       */
      findImageSize: function(item) {

        var counter = 0,
          img = item.img[0],
          mfpSetInterval = function(delay) {

            if(_imgInterval) {
              clearInterval(_imgInterval);
            }
            // decelerating interval that checks for size of an image
            _imgInterval = setInterval(function() {
              if(img.naturalWidth > 0) {
                mfp._onImageHasSize(item);
                return;
              }

              if(counter > 200) {
                clearInterval(_imgInterval);
              }

              counter++;
              if(counter === 3) {
                mfpSetInterval(10);
              } else if(counter === 40) {
                mfpSetInterval(50);
              } else if(counter === 100) {
                mfpSetInterval(500);
              }
            }, delay);
          };

        mfpSetInterval(1);
      },

      getImage: function(item, template) {

        var guard = 0,

          // image load complete handler
          onLoadComplete = function() {
            if(item) {
              if (item.img[0].complete) {
                item.img.off('.mfploader');

                if(item === mfp.currItem){
                  mfp._onImageHasSize(item);

                  mfp.updateStatus('ready');
                }

                item.hasSize = true;
                item.loaded = true;

                _mfpTrigger('ImageLoadComplete');

              }
              else {
                // if image complete check fails 200 times (20 sec), we assume that there was an error.
                guard++;
                if(guard < 200) {
                  setTimeout(onLoadComplete,100);
                } else {
                  onLoadError();
                }
              }
            }
          },

          // image error handler
          onLoadError = function() {
            if(item) {
              item.img.off('.mfploader');
              if(item === mfp.currItem){
                mfp._onImageHasSize(item);
                mfp.updateStatus('error', imgSt.tError.replace('%url%', item.src) );
              }

              item.hasSize = true;
              item.loaded = true;
              item.loadError = true;
            }
          },
          imgSt = mfp.st.image;


        var el = template.find('.mfp-img');
        if(el.length) {
          var img = document.createElement('img');
          img.className = 'mfp-img';
          if(item.el && item.el.find('img').length) {
            img.alt = item.el.find('img').attr('alt');
          }
          item.img = $(img).on('load.mfploader', onLoadComplete).on('error.mfploader', onLoadError);
          img.src = item.src;

          // without clone() "error" event is not firing when IMG is replaced by new IMG
          // TODO: find a way to avoid such cloning
          if(el.is('img')) {
            item.img = item.img.clone();
          }

          img = item.img[0];
          if(img.naturalWidth > 0) {
            item.hasSize = true;
          } else if(!img.width) {
            item.hasSize = false;
          }
        }

        mfp._parseMarkup(template, {
          title: _getTitle(item),
          img_replaceWith: item.img
        }, item);

        mfp.resizeImage();

        if(item.hasSize) {
          if(_imgInterval) clearInterval(_imgInterval);

          if(item.loadError) {
            template.addClass('mfp-loading');
            mfp.updateStatus('error', imgSt.tError.replace('%url%', item.src) );
          } else {
            template.removeClass('mfp-loading');
            mfp.updateStatus('ready');
          }
          return template;
        }

        mfp.updateStatus('loading');
        item.loading = true;

        if(!item.hasSize) {
          item.imgHidden = true;
          template.addClass('mfp-loading');
          mfp.findImageSize(item);
        }

        return template;
      }
    }
  });

  /*>>image*/

  /*>>zoom*/
  var hasMozTransform,
    getHasMozTransform = function() {
      if(hasMozTransform === undefined) {
        hasMozTransform = document.createElement('p').style.MozTransform !== undefined;
      }
      return hasMozTransform;
    };

  $.magnificPopup.registerModule('zoom', {

    options: {
      enabled: false,
      easing: 'ease-in-out',
      duration: 300,
      opener: function(element) {
        return element.is('img') ? element : element.find('img');
      }
    },

    proto: {

      initZoom: function() {
        var zoomSt = mfp.st.zoom,
          ns = '.zoom',
          image;

        if(!zoomSt.enabled || !mfp.supportsTransition) {
          return;
        }

        var duration = zoomSt.duration,
          getElToAnimate = function(image) {
            var newImg = image.clone().removeAttr('style').removeAttr('class').addClass('mfp-animated-image'),
              transition = 'all '+(zoomSt.duration/1000)+'s ' + zoomSt.easing,
              cssObj = {
                position: 'fixed',
                zIndex: 9999,
                left: 0,
                top: 0,
                '-webkit-backface-visibility': 'hidden'
              },
              t = 'transition';

            cssObj['-webkit-'+t] = cssObj['-moz-'+t] = cssObj['-o-'+t] = cssObj[t] = transition;

            newImg.css(cssObj);
            return newImg;
          },
          showMainContent = function() {
            mfp.content.css('visibility', 'visible');
          },
          openTimeout,
          animatedImg;

        _mfpOn('BuildControls'+ns, function() {
          if(mfp._allowZoom()) {

            clearTimeout(openTimeout);
            mfp.content.css('visibility', 'hidden');

            // Basically, all code below does is clones existing image, puts in on top of the current one and animated it

            image = mfp._getItemToZoom();

            if(!image) {
              showMainContent();
              return;
            }

            animatedImg = getElToAnimate(image);

            animatedImg.css( mfp._getOffset() );

            mfp.wrap.append(animatedImg);

            openTimeout = setTimeout(function() {
              animatedImg.css( mfp._getOffset( true ) );
              openTimeout = setTimeout(function() {

                showMainContent();

                setTimeout(function() {
                  animatedImg.remove();
                  image = animatedImg = null;
                  _mfpTrigger('ZoomAnimationEnded');
                }, 16); // avoid blink when switching images

              }, duration); // this timeout equals animation duration

            }, 16); // by adding this timeout we avoid short glitch at the beginning of animation


            // Lots of timeouts...
          }
        });
        _mfpOn(BEFORE_CLOSE_EVENT+ns, function() {
          if(mfp._allowZoom()) {

            clearTimeout(openTimeout);

            mfp.st.removalDelay = duration;

            if(!image) {
              image = mfp._getItemToZoom();
              if(!image) {
                return;
              }
              animatedImg = getElToAnimate(image);
            }

            animatedImg.css( mfp._getOffset(true) );
            mfp.wrap.append(animatedImg);
            mfp.content.css('visibility', 'hidden');

            setTimeout(function() {
              animatedImg.css( mfp._getOffset() );
            }, 16);
          }

        });

        _mfpOn(CLOSE_EVENT+ns, function() {
          if(mfp._allowZoom()) {
            showMainContent();
            if(animatedImg) {
              animatedImg.remove();
            }
            image = null;
          }
        });
      },

      _allowZoom: function() {
        return mfp.currItem.type === 'image';
      },

      _getItemToZoom: function() {
        if(mfp.currItem.hasSize) {
          return mfp.currItem.img;
        } else {
          return false;
        }
      },

      // Get element postion relative to viewport
      _getOffset: function(isLarge) {
        var el;
        if(isLarge) {
          el = mfp.currItem.img;
        } else {
          el = mfp.st.zoom.opener(mfp.currItem.el || mfp.currItem);
        }

        var offset = el.offset();
        var paddingTop = parseInt(el.css('padding-top'),10);
        var paddingBottom = parseInt(el.css('padding-bottom'),10);
        offset.top -= ( $(window).scrollTop() - paddingTop );


        /*

			Animating left + top + width/height looks glitchy in Firefox, but perfect in Chrome. And vice-versa.

			 */
        var obj = {
          width: el.width(),
          // fix Zepto height+padding issue
          height: (_isJQ ? el.innerHeight() : el[0].offsetHeight) - paddingBottom - paddingTop
        };

        // I hate to do this, but there is no another option
        if( getHasMozTransform() ) {
          obj['-moz-transform'] = obj['transform'] = 'translate(' + offset.left + 'px,' + offset.top + 'px)';
        } else {
          obj.left = offset.left;
          obj.top = offset.top;
        }
        return obj;
      }

    }
  });



  /*>>zoom*/

  /*>>iframe*/

  var IFRAME_NS = 'iframe',
    _emptyPage = '//about:blank',

    _fixIframeBugs = function(isShowing) {
      if(mfp.currTemplate[IFRAME_NS]) {
        var el = mfp.currTemplate[IFRAME_NS].find('iframe');
        if(el.length) {
          // reset src after the popup is closed to avoid "video keeps playing after popup is closed" bug
          if(!isShowing) {
            el[0].src = _emptyPage;
          }

          // IE8 black screen bug fix
          if(mfp.isIE8) {
            el.css('display', isShowing ? 'block' : 'none');
          }
        }
      }
    };

  $.magnificPopup.registerModule(IFRAME_NS, {

    options: {
      markup: '<div class="mfp-iframe-scaler">'+
        '<div class="mfp-close"></div>'+
        '<iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe>'+
        '</div>',

      srcAction: 'iframe_src',

      // we don't care and support only one default type of URL by default
      patterns: {
        youtube: {
          index: 'youtube.com',
          id: 'v=',
          src: '//www.youtube.com/embed/%id%?autoplay=1'
        },
        vimeo: {
          index: 'vimeo.com/',
          id: '/',
          src: '//player.vimeo.com/video/%id%?autoplay=1'
        },
        gmaps: {
          index: '//maps.google.',
          src: '%id%&output=embed'
        }
      }
    },

    proto: {
      initIframe: function() {
        mfp.types.push(IFRAME_NS);

        _mfpOn('BeforeChange', function(e, prevType, newType) {
          if(prevType !== newType) {
            if(prevType === IFRAME_NS) {
              _fixIframeBugs(); // iframe if removed
            } else if(newType === IFRAME_NS) {
              _fixIframeBugs(true); // iframe is showing
            }
          }// else {
          // iframe source is switched, don't do anything
          //}
        });

        _mfpOn(CLOSE_EVENT + '.' + IFRAME_NS, function() {
          _fixIframeBugs();
        });
      },

      getIframe: function(item, template) {
        var embedSrc = item.src;
        var iframeSt = mfp.st.iframe;

        $.each(iframeSt.patterns, function() {
          if(embedSrc.indexOf( this.index ) > -1) {
            if(this.id) {
              if(typeof this.id === 'string') {
                embedSrc = embedSrc.substr(embedSrc.lastIndexOf(this.id)+this.id.length, embedSrc.length);
              } else {
                embedSrc = this.id.call( this, embedSrc );
              }
            }
            embedSrc = this.src.replace('%id%', embedSrc );
            return false; // break;
          }
        });

        var dataObj = {};
        if(iframeSt.srcAction) {
          dataObj[iframeSt.srcAction] = embedSrc;
        }
        mfp._parseMarkup(template, dataObj, item);

        mfp.updateStatus('ready');

        return template;
      }
    }
  });



  /*>>iframe*/

  /*>>gallery*/
  /**
   * Get looped index depending on number of slides
   */
  var _getLoopedId = function(index) {
      var numSlides = mfp.items.length;
      if(index > numSlides - 1) {
        return index - numSlides;
      } else  if(index < 0) {
        return numSlides + index;
      }
      return index;
    },
    _replaceCurrTotal = function(text, curr, total) {
      return text.replace(/%curr%/gi, curr + 1).replace(/%total%/gi, total);
    };

  $.magnificPopup.registerModule('gallery', {

    options: {
      enabled: false,
      arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
      preload: [0,2],
      navigateByImgClick: true,
      arrows: true,

      tPrev: 'Previous (Left arrow key)',
      tNext: 'Next (Right arrow key)',
      tCounter: '%curr% of %total%'
    },

    proto: {
      initGallery: function() {

        var gSt = mfp.st.gallery,
          ns = '.mfp-gallery';

        mfp.direction = true; // true - next, false - prev

        if(!gSt || !gSt.enabled ) return false;

        _wrapClasses += ' mfp-gallery';

        _mfpOn(OPEN_EVENT+ns, function() {

          if(gSt.navigateByImgClick) {
            mfp.wrap.on('click'+ns, '.mfp-img', function() {
              if(mfp.items.length > 1) {
                mfp.next();
                return false;
              }
            });
          }

          _document.on('keydown'+ns, function(e) {
            if (e.keyCode === 37) {
              mfp.prev();
            } else if (e.keyCode === 39) {
              mfp.next();
            }
          });
        });

        _mfpOn('UpdateStatus'+ns, function(e, data) {
          if(data.text) {
            data.text = _replaceCurrTotal(data.text, mfp.currItem.index, mfp.items.length);
          }
        });

        _mfpOn(MARKUP_PARSE_EVENT+ns, function(e, element, values, item) {
          var l = mfp.items.length;
          values.counter = l > 1 ? _replaceCurrTotal(gSt.tCounter, item.index, l) : '';
        });

        _mfpOn('BuildControls' + ns, function() {
          if(mfp.items.length > 1 && gSt.arrows && !mfp.arrowLeft) {
            var markup = gSt.arrowMarkup,
              arrowLeft = mfp.arrowLeft = $( markup.replace(/%title%/gi, gSt.tPrev).replace(/%dir%/gi, 'left') ).addClass(PREVENT_CLOSE_CLASS),
              arrowRight = mfp.arrowRight = $( markup.replace(/%title%/gi, gSt.tNext).replace(/%dir%/gi, 'right') ).addClass(PREVENT_CLOSE_CLASS);

            arrowLeft.click(function() {
              mfp.prev();
            });
            arrowRight.click(function() {
              mfp.next();
            });

            mfp.container.append(arrowLeft.add(arrowRight));
          }
        });

        _mfpOn(CHANGE_EVENT+ns, function() {
          if(mfp._preloadTimeout) clearTimeout(mfp._preloadTimeout);

          mfp._preloadTimeout = setTimeout(function() {
            mfp.preloadNearbyImages();
            mfp._preloadTimeout = null;
          }, 16);
        });


        _mfpOn(CLOSE_EVENT+ns, function() {
          _document.off(ns);
          mfp.wrap.off('click'+ns);
          mfp.arrowRight = mfp.arrowLeft = null;
        });

      },
      next: function() {
        mfp.direction = true;
        mfp.index = _getLoopedId(mfp.index + 1);
        mfp.updateItemHTML();
      },
      prev: function() {
        mfp.direction = false;
        mfp.index = _getLoopedId(mfp.index - 1);
        mfp.updateItemHTML();
      },
      goTo: function(newIndex) {
        mfp.direction = (newIndex >= mfp.index);
        mfp.index = newIndex;
        mfp.updateItemHTML();
      },
      preloadNearbyImages: function() {
        var p = mfp.st.gallery.preload,
          preloadBefore = Math.min(p[0], mfp.items.length),
          preloadAfter = Math.min(p[1], mfp.items.length),
          i;

        for(i = 1; i <= (mfp.direction ? preloadAfter : preloadBefore); i++) {
          mfp._preloadItem(mfp.index+i);
        }
        for(i = 1; i <= (mfp.direction ? preloadBefore : preloadAfter); i++) {
          mfp._preloadItem(mfp.index-i);
        }
      },
      _preloadItem: function(index) {
        index = _getLoopedId(index);

        if(mfp.items[index].preloaded) {
          return;
        }

        var item = mfp.items[index];
        if(!item.parsed) {
          item = mfp.parseEl( index );
        }

        _mfpTrigger('LazyLoad', item);

        if(item.type === 'image') {
          item.img = $('<img class="mfp-img" />').on('load.mfploader', function() {
            item.hasSize = true;
          }).on('error.mfploader', function() {
            item.hasSize = true;
            item.loadError = true;
            _mfpTrigger('LazyLoadError', item);
          }).attr('src', item.src);
        }


        item.preloaded = true;
      }
    }
  });

  /*>>gallery*/

  /*>>retina*/

  var RETINA_NS = 'retina';

  $.magnificPopup.registerModule(RETINA_NS, {
    options: {
      replaceSrc: function(item) {
        return item.src.replace(/\.\w+$/, function(m) { return '@2x' + m; });
      },
      ratio: 1 // Function or number.  Set to 1 to disable.
    },
    proto: {
      initRetina: function() {
        if(window.devicePixelRatio > 1) {

          var st = mfp.st.retina,
            ratio = st.ratio;

          ratio = !isNaN(ratio) ? ratio : ratio();

          if(ratio > 1) {
            _mfpOn('ImageHasSize' + '.' + RETINA_NS, function(e, item) {
              item.img.css({
                'max-width': item.img[0].naturalWidth / ratio,
                'width': '100%'
              });
            });
            _mfpOn('ElementParse' + '.' + RETINA_NS, function(e, item) {
              item.src = st.replaceSrc(item, ratio);
            });
          }
        }

      }
    }
  });

  /*>>retina*/
  _checkInstance(); }));
/*!
 * JavaScript Cookie v2.2.1
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;(function (factory) {
  var registeredInModuleLoader;
  if (typeof define === 'function' && define.amd) {
    define(factory);
    registeredInModuleLoader = true;
  }
  if (typeof exports === 'object') {
    module.exports = factory();
    registeredInModuleLoader = true;
  }
  if (!registeredInModuleLoader) {
    var OldCookies = window.Cookies;
    var api = window.Cookies = factory();
    api.noConflict = function () {
      window.Cookies = OldCookies;
      return api;
    };
  }
}(function () {
  function extend () {
    var i = 0;
    var result = {};
    for (; i < arguments.length; i++) {
      var attributes = arguments[ i ];
      for (var key in attributes) {
        result[key] = attributes[key];
      }
    }
    return result;
  }

  function decode (s) {
    return s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
  }

  function init (converter) {
    function api() {}

    function set (key, value, attributes) {
      if (typeof document === 'undefined') {
        return;
      }

      attributes = extend({
        path: '/'
      }, api.defaults, attributes);

      if (typeof attributes.expires === 'number') {
        attributes.expires = new Date(new Date() * 1 + attributes.expires * 864e+5);
      }

      // We're using "expires" because "max-age" is not supported by IE
      attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

      try {
        var result = JSON.stringify(value);
        if (/^[\{\[]/.test(result)) {
          value = result;
        }
      } catch (e) {}

      value = converter.write ?
        converter.write(value, key) :
        encodeURIComponent(String(value))
          .replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);

      key = encodeURIComponent(String(key))
        .replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
        .replace(/[\(\)]/g, escape);

      var stringifiedAttributes = '';
      for (var attributeName in attributes) {
        if (!attributes[attributeName]) {
          continue;
        }
        stringifiedAttributes += '; ' + attributeName;
        if (attributes[attributeName] === true) {
          continue;
        }

        // Considers RFC 6265 section 5.2:
        // ...
        // 3.  If the remaining unparsed-attributes contains a %x3B (";")
        //     character:
        // Consume the characters of the unparsed-attributes up to,
        // not including, the first %x3B (";") character.
        // ...
        stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
      }

      return (document.cookie = key + '=' + value + stringifiedAttributes);
    }

    function get (key, json) {
      if (typeof document === 'undefined') {
        return;
      }

      var jar = {};
      // To prevent the for loop in the first place assign an empty array
      // in case there are no cookies at all.
      var cookies = document.cookie ? document.cookie.split('; ') : [];
      var i = 0;

      for (; i < cookies.length; i++) {
        var parts = cookies[i].split('=');
        var cookie = parts.slice(1).join('=');

        if (!json && cookie.charAt(0) === '"') {
          cookie = cookie.slice(1, -1);
        }

        try {
          var name = decode(parts[0]);
          cookie = (converter.read || converter)(cookie, name) ||
            decode(cookie);

          if (json) {
            try {
              cookie = JSON.parse(cookie);
            } catch (e) {}
          }

          jar[name] = cookie;

          if (key === name) {
            break;
          }
        } catch (e) {}
      }

      return key ? jar[key] : jar;
    }

    api.set = set;
    api.get = function (key) {
      return get(key, false /* read as raw */);
    };
    api.getJSON = function (key) {
      return get(key, true /* read as json */);
    };
    api.remove = function (key, attributes) {
      set(key, '', extend(attributes, {
        expires: -1
      }));
    };

    api.defaults = {};

    api.withConverter = init;

    return api;
  }

  return init(function () {});
}));

!function(a,b){function c(){y=D=z=A=B=C=K}function d(a,b){for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c])}function e(a){return parseFloat(a)||0}function f(){F={top:b.pageYOffset,left:b.pageXOffset}}function g(){return b.pageXOffset!=F.left?(f(),void z()):void(b.pageYOffset!=F.top&&(f(),i()))}function h(a){setTimeout(function(){b.pageYOffset!=F.top&&(F.top=b.pageYOffset,i())},0)}function i(){for(var a=H.length-1;a>=0;a--)j(H[a])}function j(a){if(a.inited){var b=F.top<=a.limit.start?0:F.top>=a.limit.end?2:1;a.mode!=b&&p(a,b)}}function k(){for(var a=H.length-1;a>=0;a--)if(H[a].inited){var b=Math.abs(t(H[a].clone)-H[a].docOffsetTop),c=Math.abs(H[a].parent.node.offsetHeight-H[a].parent.height);if(b>=2||c>=2)return!1}return!0}function l(a){isNaN(parseFloat(a.computed.top))||a.isCell||"none"==a.computed.display||(a.inited=!0,a.clone||q(a),"absolute"!=a.parent.computed.position&&"relative"!=a.parent.computed.position&&(a.parent.node.style.position="relative"),j(a),a.parent.height=a.parent.node.offsetHeight,a.docOffsetTop=t(a.clone))}function m(a){var b=!0;a.clone&&r(a),d(a.node.style,a.css);for(var c=H.length-1;c>=0;c--)if(H[c].node!==a.node&&H[c].parent.node===a.parent.node){b=!1;break}b&&(a.parent.node.style.position=a.parent.css.position),a.mode=-1}function n(){for(var a=H.length-1;a>=0;a--)l(H[a])}function o(){for(var a=H.length-1;a>=0;a--)m(H[a])}function p(a,b){var c=a.node.style;switch(b){case 0:c.position="absolute",c.left=a.offset.left+"px",c.right=a.offset.right+"px",c.top=a.offset.top+"px",c.bottom="auto",c.width="auto",c.marginLeft=0,c.marginRight=0,c.marginTop=0;break;case 1:c.position="fixed",c.left=a.box.left+"px",c.right=a.box.right+"px",c.top=a.css.top,c.bottom="auto",c.width="auto",c.marginLeft=0,c.marginRight=0,c.marginTop=0;break;case 2:c.position="absolute",c.left=a.offset.left+"px",c.right=a.offset.right+"px",c.top="auto",c.bottom=0,c.width="auto",c.marginLeft=0,c.marginRight=0}a.mode=b}function q(a){a.clone=document.createElement("div");var b=a.node.nextSibling||a.node,c=a.clone.style;c.height=a.height+"px",c.width=a.width+"px",c.marginTop=a.computed.marginTop,c.marginBottom=a.computed.marginBottom,c.marginLeft=a.computed.marginLeft,c.marginRight=a.computed.marginRight,c.padding=c.border=c.borderSpacing=0,c.fontSize="1em",c.position="static",c.cssFloat=a.computed.cssFloat,a.node.parentNode.insertBefore(a.clone,b)}function r(a){a.clone.parentNode.removeChild(a.clone),a.clone=void 0}function s(a){var b=getComputedStyle(a),c=a.parentNode,d=getComputedStyle(c),f=a.style.position;a.style.position="relative";var g={top:b.top,marginTop:b.marginTop,marginBottom:b.marginBottom,marginLeft:b.marginLeft,marginRight:b.marginRight,cssFloat:b.cssFloat,display:b.display},h={top:e(b.top),marginBottom:e(b.marginBottom),paddingLeft:e(b.paddingLeft),paddingRight:e(b.paddingRight),borderLeftWidth:e(b.borderLeftWidth),borderRightWidth:e(b.borderRightWidth)};a.style.position=f;var i={position:a.style.position,top:a.style.top,bottom:a.style.bottom,left:a.style.left,right:a.style.right,width:a.style.width,marginTop:a.style.marginTop,marginLeft:a.style.marginLeft,marginRight:a.style.marginRight},j=u(a),k=u(c),l={node:c,css:{position:c.style.position},computed:{position:d.position},numeric:{borderLeftWidth:e(d.borderLeftWidth),borderRightWidth:e(d.borderRightWidth),borderTopWidth:e(d.borderTopWidth),borderBottomWidth:e(d.borderBottomWidth)}},m={node:a,box:{left:j.win.left,right:J.clientWidth-j.win.right},offset:{top:j.win.top-k.win.top-l.numeric.borderTopWidth,left:j.win.left-k.win.left-l.numeric.borderLeftWidth,right:-j.win.right+k.win.right-l.numeric.borderRightWidth},css:i,isCell:"table-cell"==b.display,computed:g,numeric:h,width:j.win.right-j.win.left,height:j.win.bottom-j.win.top,mode:-1,inited:!1,parent:l,limit:{start:j.doc.top-h.top,end:k.doc.top+c.offsetHeight-l.numeric.borderBottomWidth-a.offsetHeight-h.top-h.marginBottom}};return m}function t(a){for(var b=0;a;)b+=a.offsetTop,a=a.offsetParent;return b}function u(a){var c=a.getBoundingClientRect();return{doc:{top:c.top+b.pageYOffset,left:c.left+b.pageXOffset},win:c}}function v(){G=setInterval(function(){!k()&&z()},500)}function w(){clearInterval(G)}function x(){I&&(document[L]?w():v())}function y(){I||(f(),n(),b.addEventListener("scroll",g),b.addEventListener("wheel",h),b.addEventListener("resize",z),b.addEventListener("orientationchange",z),a.addEventListener(M,x),v(),I=!0)}function z(){if(I){o();for(var a=H.length-1;a>=0;a--)H[a]=s(H[a].node);n()}}function A(){b.removeEventListener("scroll",g),b.removeEventListener("wheel",h),b.removeEventListener("resize",z),b.removeEventListener("orientationchange",z),a.removeEventListener(M,x),w(),I=!1}function B(){A(),o()}function C(){for(B();H.length;)H.pop()}function D(a){for(var b=H.length-1;b>=0;b--)if(H[b].node===a)return;var c=s(a);H.push(c),I?l(c):y()}function E(a){for(var b=H.length-1;b>=0;b--)H[b].node===a&&(m(H[b]),H.splice(b,1))}var F,G,H=[],I=!1,J=a.documentElement,K=function(){},L="hidden",M="visibilitychange";void 0!==a.webkitHidden&&(L="webkitHidden",M="webkitvisibilitychange"),b.getComputedStyle||c();for(var N=["","-webkit-","-moz-","-ms-"],O=document.createElement("div"),P=N.length-1;P>=0;P--){try{O.style.position=N[P]+"sticky"}catch(Q){}""!=O.style.position&&c()}f(),b.Stickyfill={stickies:H,add:D,remove:E,init:y,rebuild:z,pause:A,stop:B,kill:C}}(document,window),window.jQuery&&!function($){$.fn.Stickyfill=function(a){return this.each(function(){Stickyfill.add(this)}),this}}(window.jQuery);
!function(root, factory) {
  "function" == typeof define && define.amd ? // AMD. Register as an anonymous module unless amdModuleId is set
    define([], function() {
      return root.svg4everybody = factory();
    }) : "object" == typeof module && module.exports ? // Node. Does not work with strict CommonJS, but
      // only CommonJS-like environments that support module.exports,
      // like Node.
      module.exports = factory() : root.svg4everybody = factory();
}(this, function() {
  /*! svg4everybody v2.1.4 | github.com/jonathantneal/svg4everybody */
  function embed(parent, svg, target) {
    // if the target exists
    if (target) {
      // create a document fragment to hold the contents of the target
      var fragment = document.createDocumentFragment(), viewBox = !svg.hasAttribute("viewBox") && target.getAttribute("viewBox");
      // conditionally set the viewBox on the svg
      viewBox && svg.setAttribute("viewBox", viewBox);
      // copy the contents of the clone into the fragment
      for (// clone the target
        var clone = target.cloneNode(!0); clone.childNodes.length; ) {
        fragment.appendChild(clone.firstChild);
      }
      // append the fragment into the svg
      parent.appendChild(fragment);
    }
  }
  function loadreadystatechange(xhr) {
    // listen to changes in the request
    xhr.onreadystatechange = function() {
      // if the request is ready
      if (4 === xhr.readyState) {
        // get the cached html document
        var cachedDocument = xhr._cachedDocument;
        // ensure the cached html document based on the xhr response
        cachedDocument || (cachedDocument = xhr._cachedDocument = document.implementation.createHTMLDocument(""),
          cachedDocument.body.innerHTML = xhr.responseText, xhr._cachedTarget = {}), // clear the xhr embeds list and embed each item
          xhr._embeds.splice(0).map(function(item) {
            // get the cached target
            var target = xhr._cachedTarget[item.id];
            // ensure the cached target
            target || (target = xhr._cachedTarget[item.id] = cachedDocument.getElementById(item.id)),
              // embed the target into the svg
              embed(item.parent, item.svg, target);
          });
      }
    }, // test the ready state change immediately
      xhr.onreadystatechange();
  }
  function svg4everybody(rawopts) {
    function oninterval() {
      // while the index exists in the live <use> collection
      for (// get the cached <use> index
        var index = 0; index < uses.length; ) {
        // get the current <use>
        var use = uses[index], parent = use.parentNode, svg = getSVGAncestor(parent);
        if (svg) {
          var src = use.getAttribute("xlink:href") || use.getAttribute("href");
          if (polyfill && (!opts.validate || opts.validate(src, svg, use))) {
            // remove the <use> element
            parent.removeChild(use);
            // parse the src and get the url and id
            var srcSplit = src.split("#"), url = srcSplit.shift(), id = srcSplit.join("#");
            // if the link is external
            if (url.length) {
              // get the cached xhr request
              var xhr = requests[url];
              // ensure the xhr request exists
              xhr || (xhr = requests[url] = new XMLHttpRequest(), xhr.open("GET", url), xhr.send(),
                xhr._embeds = []), // add the svg and id as an item to the xhr embeds list
                xhr._embeds.push({
                  parent: parent,
                  svg: svg,
                  id: id
                }), // prepare the xhr ready state change event
                loadreadystatechange(xhr);
            } else {
              // embed the local id into the svg
              embed(parent, document.getElementById(id));
            }
          }
        } else {
          // increase the index when the previous value was not "valid"
          ++index;
        }
      }
      // continue the interval
      requestAnimationFrame(oninterval, 67);
    }
    var polyfill, opts = Object(rawopts), newerIEUA = /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/, webkitUA = /\bAppleWebKit\/(\d+)\b/, olderEdgeUA = /\bEdge\/12\.(\d+)\b/;
    polyfill = "polyfill" in opts ? opts.polyfill : newerIEUA.test(navigator.userAgent) || (navigator.userAgent.match(olderEdgeUA) || [])[1] < 10547 || (navigator.userAgent.match(webkitUA) || [])[1] < 537;
    // create xhr requests object
    var requests = {}, requestAnimationFrame = window.requestAnimationFrame || setTimeout, uses = document.getElementsByTagName("use");
    // conditionally start the interval if the polyfill is active
    polyfill && oninterval();
  }
  function getSVGAncestor(node) {
    for (var svg = node; "svg" !== svg.nodeName.toLowerCase() && (svg = svg.parentNode); ) {}
    return svg;
  }
  return svg4everybody;
});
/**
 * Swiper 4.4.1
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * http://www.idangero.us/swiper/
 *
 * Copyright 2014-2018 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: September 14, 2018
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
      (global.Swiper = factory());
}(this, (function () { 'use strict';

  /**
   * SSR Window 1.0.1
   * Better handling for window object in SSR environment
   * https://github.com/nolimits4web/ssr-window
   *
   * Copyright 2018, Vladimir Kharlampidi
   *
   * Licensed under MIT
   *
   * Released on: July 18, 2018
   */
  var doc = (typeof document === 'undefined') ? {
    body: {},
    addEventListener: function addEventListener() {},
    removeEventListener: function removeEventListener() {},
    activeElement: {
      blur: function blur() {},
      nodeName: '',
    },
    querySelector: function querySelector() {
      return null;
    },
    querySelectorAll: function querySelectorAll() {
      return [];
    },
    getElementById: function getElementById() {
      return null;
    },
    createEvent: function createEvent() {
      return {
        initEvent: function initEvent() {},
      };
    },
    createElement: function createElement() {
      return {
        children: [],
        childNodes: [],
        style: {},
        setAttribute: function setAttribute() {},
        getElementsByTagName: function getElementsByTagName() {
          return [];
        },
      };
    },
    location: { hash: '' },
  } : document; // eslint-disable-line

  var win = (typeof window === 'undefined') ? {
    document: doc,
    navigator: {
      userAgent: '',
    },
    location: {},
    history: {},
    CustomEvent: function CustomEvent() {
      return this;
    },
    addEventListener: function addEventListener() {},
    removeEventListener: function removeEventListener() {},
    getComputedStyle: function getComputedStyle() {
      return {
        getPropertyValue: function getPropertyValue() {
          return '';
        },
      };
    },
    Image: function Image() {},
    Date: function Date() {},
    screen: {},
    setTimeout: function setTimeout() {},
    clearTimeout: function clearTimeout() {},
  } : window; // eslint-disable-line

  /**
   * Dom7 2.1.2
   * Minimalistic JavaScript library for DOM manipulation, with a jQuery-compatible API
   * http://framework7.io/docs/dom.html
   *
   * Copyright 2018, Vladimir Kharlampidi
   * The iDangero.us
   * http://www.idangero.us/
   *
   * Licensed under MIT
   *
   * Released on: September 13, 2018
   */

  var Dom7 = function Dom7(arr) {
    var self = this;
    // Create array-like object
    for (var i = 0; i < arr.length; i += 1) {
      self[i] = arr[i];
    }
    self.length = arr.length;
    // Return collection with methods
    return this;
  };

  function $(selector, context) {
    var arr = [];
    var i = 0;
    if (selector && !context) {
      if (selector instanceof Dom7) {
        return selector;
      }
    }
    if (selector) {
      // String
      if (typeof selector === 'string') {
        var els;
        var tempParent;
        var html = selector.trim();
        if (html.indexOf('<') >= 0 && html.indexOf('>') >= 0) {
          var toCreate = 'div';
          if (html.indexOf('<li') === 0) { toCreate = 'ul'; }
          if (html.indexOf('<tr') === 0) { toCreate = 'tbody'; }
          if (html.indexOf('<td') === 0 || html.indexOf('<th') === 0) { toCreate = 'tr'; }
          if (html.indexOf('<tbody') === 0) { toCreate = 'table'; }
          if (html.indexOf('<option') === 0) { toCreate = 'select'; }
          tempParent = doc.createElement(toCreate);
          tempParent.innerHTML = html;
          for (i = 0; i < tempParent.childNodes.length; i += 1) {
            arr.push(tempParent.childNodes[i]);
          }
        } else {
          if (!context && selector[0] === '#' && !selector.match(/[ .<>:~]/)) {
            // Pure ID selector
            els = [doc.getElementById(selector.trim().split('#')[1])];
          } else {
            // Other selectors
            els = (context || doc).querySelectorAll(selector.trim());
          }
          for (i = 0; i < els.length; i += 1) {
            if (els[i]) { arr.push(els[i]); }
          }
        }
      } else if (selector.nodeType || selector === win || selector === doc) {
        // Node/element
        arr.push(selector);
      } else if (selector.length > 0 && selector[0].nodeType) {
        // Array of elements or instance of Dom
        for (i = 0; i < selector.length; i += 1) {
          arr.push(selector[i]);
        }
      }
    }
    return new Dom7(arr);
  }

  $.fn = Dom7.prototype;
  $.Class = Dom7;
  $.Dom7 = Dom7;

  function unique(arr) {
    var uniqueArray = [];
    for (var i = 0; i < arr.length; i += 1) {
      if (uniqueArray.indexOf(arr[i]) === -1) { uniqueArray.push(arr[i]); }
    }
    return uniqueArray;
  }

  // Classes and attributes
  function addClass(className) {
    var this$1 = this;

    if (typeof className === 'undefined') {
      return this;
    }
    var classes = className.split(' ');
    for (var i = 0; i < classes.length; i += 1) {
      for (var j = 0; j < this.length; j += 1) {
        if (typeof this$1[j] !== 'undefined' && typeof this$1[j].classList !== 'undefined') { this$1[j].classList.add(classes[i]); }
      }
    }
    return this;
  }
  function removeClass(className) {
    var this$1 = this;

    var classes = className.split(' ');
    for (var i = 0; i < classes.length; i += 1) {
      for (var j = 0; j < this.length; j += 1) {
        if (typeof this$1[j] !== 'undefined' && typeof this$1[j].classList !== 'undefined') { this$1[j].classList.remove(classes[i]); }
      }
    }
    return this;
  }
  function hasClass(className) {
    if (!this[0]) { return false; }
    return this[0].classList.contains(className);
  }
  function toggleClass(className) {
    var this$1 = this;

    var classes = className.split(' ');
    for (var i = 0; i < classes.length; i += 1) {
      for (var j = 0; j < this.length; j += 1) {
        if (typeof this$1[j] !== 'undefined' && typeof this$1[j].classList !== 'undefined') { this$1[j].classList.toggle(classes[i]); }
      }
    }
    return this;
  }
  function attr(attrs, value) {
    var arguments$1 = arguments;
    var this$1 = this;

    if (arguments.length === 1 && typeof attrs === 'string') {
      // Get attr
      if (this[0]) { return this[0].getAttribute(attrs); }
      return undefined;
    }

    // Set attrs
    for (var i = 0; i < this.length; i += 1) {
      if (arguments$1.length === 2) {
        // String
        this$1[i].setAttribute(attrs, value);
      } else {
        // Object
        // eslint-disable-next-line
        for (var attrName in attrs) {
          this$1[i][attrName] = attrs[attrName];
          this$1[i].setAttribute(attrName, attrs[attrName]);
        }
      }
    }
    return this;
  }
  // eslint-disable-next-line
  function removeAttr(attr) {
    var this$1 = this;

    for (var i = 0; i < this.length; i += 1) {
      this$1[i].removeAttribute(attr);
    }
    return this;
  }
  function data(key, value) {
    var this$1 = this;

    var el;
    if (typeof value === 'undefined') {
      el = this[0];
      // Get value
      if (el) {
        if (el.dom7ElementDataStorage && (key in el.dom7ElementDataStorage)) {
          return el.dom7ElementDataStorage[key];
        }

        var dataKey = el.getAttribute(("data-" + key));
        if (dataKey) {
          return dataKey;
        }
        return undefined;
      }
      return undefined;
    }

    // Set value
    for (var i = 0; i < this.length; i += 1) {
      el = this$1[i];
      if (!el.dom7ElementDataStorage) { el.dom7ElementDataStorage = {}; }
      el.dom7ElementDataStorage[key] = value;
    }
    return this;
  }
  // Transforms
  // eslint-disable-next-line
  function transform(transform) {
    var this$1 = this;

    for (var i = 0; i < this.length; i += 1) {
      var elStyle = this$1[i].style;
      elStyle.webkitTransform = transform;
      elStyle.transform = transform;
    }
    return this;
  }
  function transition(duration) {
    var this$1 = this;

    if (typeof duration !== 'string') {
      duration = duration + "ms"; // eslint-disable-line
    }
    for (var i = 0; i < this.length; i += 1) {
      var elStyle = this$1[i].style;
      elStyle.webkitTransitionDuration = duration;
      elStyle.transitionDuration = duration;
    }
    return this;
  }
  // Events
  function on() {
    var this$1 = this;
    var assign;

    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];
    var eventType = args[0];
    var targetSelector = args[1];
    var listener = args[2];
    var capture = args[3];
    if (typeof args[1] === 'function') {
      (assign = args, eventType = assign[0], listener = assign[1], capture = assign[2]);
      targetSelector = undefined;
    }
    if (!capture) { capture = false; }

    function handleLiveEvent(e) {
      var target = e.target;
      if (!target) { return; }
      var eventData = e.target.dom7EventData || [];
      if (eventData.indexOf(e) < 0) {
        eventData.unshift(e);
      }
      if ($(target).is(targetSelector)) { listener.apply(target, eventData); }
      else {
        var parents = $(target).parents(); // eslint-disable-line
        for (var k = 0; k < parents.length; k += 1) {
          if ($(parents[k]).is(targetSelector)) { listener.apply(parents[k], eventData); }
        }
      }
    }
    function handleEvent(e) {
      var eventData = e && e.target ? e.target.dom7EventData || [] : [];
      if (eventData.indexOf(e) < 0) {
        eventData.unshift(e);
      }
      listener.apply(this, eventData);
    }
    var events = eventType.split(' ');
    var j;
    for (var i = 0; i < this.length; i += 1) {
      var el = this$1[i];
      if (!targetSelector) {
        for (j = 0; j < events.length; j += 1) {
          var event = events[j];
          if (!el.dom7Listeners) { el.dom7Listeners = {}; }
          if (!el.dom7Listeners[event]) { el.dom7Listeners[event] = []; }
          el.dom7Listeners[event].push({
            listener: listener,
            proxyListener: handleEvent,
          });
          el.addEventListener(event, handleEvent, capture);
        }
      } else {
        // Live events
        for (j = 0; j < events.length; j += 1) {
          var event$1 = events[j];
          if (!el.dom7LiveListeners) { el.dom7LiveListeners = {}; }
          if (!el.dom7LiveListeners[event$1]) { el.dom7LiveListeners[event$1] = []; }
          el.dom7LiveListeners[event$1].push({
            listener: listener,
            proxyListener: handleLiveEvent,
          });
          el.addEventListener(event$1, handleLiveEvent, capture);
        }
      }
    }
    return this;
  }
  function off() {
    var this$1 = this;
    var assign;

    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];
    var eventType = args[0];
    var targetSelector = args[1];
    var listener = args[2];
    var capture = args[3];
    if (typeof args[1] === 'function') {
      (assign = args, eventType = assign[0], listener = assign[1], capture = assign[2]);
      targetSelector = undefined;
    }
    if (!capture) { capture = false; }

    var events = eventType.split(' ');
    for (var i = 0; i < events.length; i += 1) {
      var event = events[i];
      for (var j = 0; j < this.length; j += 1) {
        var el = this$1[j];
        var handlers = (void 0);
        if (!targetSelector && el.dom7Listeners) {
          handlers = el.dom7Listeners[event];
        } else if (targetSelector && el.dom7LiveListeners) {
          handlers = el.dom7LiveListeners[event];
        }
        if (handlers && handlers.length) {
          for (var k = handlers.length - 1; k >= 0; k -= 1) {
            var handler = handlers[k];
            if (listener && handler.listener === listener) {
              el.removeEventListener(event, handler.proxyListener, capture);
              handlers.splice(k, 1);
            } else if (!listener) {
              el.removeEventListener(event, handler.proxyListener, capture);
              handlers.splice(k, 1);
            }
          }
        }
      }
    }
    return this;
  }
  function trigger() {
    var this$1 = this;
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var events = args[0].split(' ');
    var eventData = args[1];
    for (var i = 0; i < events.length; i += 1) {
      var event = events[i];
      for (var j = 0; j < this.length; j += 1) {
        var el = this$1[j];
        var evt = (void 0);
        try {
          evt = new win.CustomEvent(event, {
            detail: eventData,
            bubbles: true,
            cancelable: true,
          });
        } catch (e) {
          evt = doc.createEvent('Event');
          evt.initEvent(event, true, true);
          evt.detail = eventData;
        }
        // eslint-disable-next-line
        el.dom7EventData = args.filter(function (data, dataIndex) { return dataIndex > 0; });
        el.dispatchEvent(evt);
        el.dom7EventData = [];
        delete el.dom7EventData;
      }
    }
    return this;
  }
  function transitionEnd(callback) {
    var events = ['webkitTransitionEnd', 'transitionend'];
    var dom = this;
    var i;
    function fireCallBack(e) {
      /* jshint validthis:true */
      if (e.target !== this) { return; }
      callback.call(this, e);
      for (i = 0; i < events.length; i += 1) {
        dom.off(events[i], fireCallBack);
      }
    }
    if (callback) {
      for (i = 0; i < events.length; i += 1) {
        dom.on(events[i], fireCallBack);
      }
    }
    return this;
  }
  function outerWidth(includeMargins) {
    if (this.length > 0) {
      if (includeMargins) {
        // eslint-disable-next-line
        var styles = this.styles();
        return this[0].offsetWidth + parseFloat(styles.getPropertyValue('margin-right')) + parseFloat(styles.getPropertyValue('margin-left'));
      }
      return this[0].offsetWidth;
    }
    return null;
  }
  function outerHeight(includeMargins) {
    if (this.length > 0) {
      if (includeMargins) {
        // eslint-disable-next-line
        var styles = this.styles();
        return this[0].offsetHeight + parseFloat(styles.getPropertyValue('margin-top')) + parseFloat(styles.getPropertyValue('margin-bottom'));
      }
      return this[0].offsetHeight;
    }
    return null;
  }
  function offset() {
    if (this.length > 0) {
      var el = this[0];
      var box = el.getBoundingClientRect();
      var body = doc.body;
      var clientTop = el.clientTop || body.clientTop || 0;
      var clientLeft = el.clientLeft || body.clientLeft || 0;
      var scrollTop = el === win ? win.scrollY : el.scrollTop;
      var scrollLeft = el === win ? win.scrollX : el.scrollLeft;
      return {
        top: (box.top + scrollTop) - clientTop,
        left: (box.left + scrollLeft) - clientLeft,
      };
    }

    return null;
  }
  function styles() {
    if (this[0]) { return win.getComputedStyle(this[0], null); }
    return {};
  }
  function css(props, value) {
    var this$1 = this;

    var i;
    if (arguments.length === 1) {
      if (typeof props === 'string') {
        if (this[0]) { return win.getComputedStyle(this[0], null).getPropertyValue(props); }
      } else {
        for (i = 0; i < this.length; i += 1) {
          // eslint-disable-next-line
          for (var prop in props) {
            this$1[i].style[prop] = props[prop];
          }
        }
        return this;
      }
    }
    if (arguments.length === 2 && typeof props === 'string') {
      for (i = 0; i < this.length; i += 1) {
        this$1[i].style[props] = value;
      }
      return this;
    }
    return this;
  }
  // Iterate over the collection passing elements to `callback`
  function each(callback) {
    var this$1 = this;

    // Don't bother continuing without a callback
    if (!callback) { return this; }
    // Iterate over the current collection
    for (var i = 0; i < this.length; i += 1) {
      // If the callback returns false
      if (callback.call(this$1[i], i, this$1[i]) === false) {
        // End the loop early
        return this$1;
      }
    }
    // Return `this` to allow chained DOM operations
    return this;
  }
  // eslint-disable-next-line
  function html(html) {
    var this$1 = this;

    if (typeof html === 'undefined') {
      return this[0] ? this[0].innerHTML : undefined;
    }

    for (var i = 0; i < this.length; i += 1) {
      this$1[i].innerHTML = html;
    }
    return this;
  }
  // eslint-disable-next-line
  function text(text) {
    var this$1 = this;

    if (typeof text === 'undefined') {
      if (this[0]) {
        return this[0].textContent.trim();
      }
      return null;
    }

    for (var i = 0; i < this.length; i += 1) {
      this$1[i].textContent = text;
    }
    return this;
  }
  function is(selector) {
    var el = this[0];
    var compareWith;
    var i;
    if (!el || typeof selector === 'undefined') { return false; }
    if (typeof selector === 'string') {
      if (el.matches) { return el.matches(selector); }
      else if (el.webkitMatchesSelector) { return el.webkitMatchesSelector(selector); }
      else if (el.msMatchesSelector) { return el.msMatchesSelector(selector); }

      compareWith = $(selector);
      for (i = 0; i < compareWith.length; i += 1) {
        if (compareWith[i] === el) { return true; }
      }
      return false;
    } else if (selector === doc) { return el === doc; }
    else if (selector === win) { return el === win; }

    if (selector.nodeType || selector instanceof Dom7) {
      compareWith = selector.nodeType ? [selector] : selector;
      for (i = 0; i < compareWith.length; i += 1) {
        if (compareWith[i] === el) { return true; }
      }
      return false;
    }
    return false;
  }
  function index() {
    var child = this[0];
    var i;
    if (child) {
      i = 0;
      // eslint-disable-next-line
      while ((child = child.previousSibling) !== null) {
        if (child.nodeType === 1) { i += 1; }
      }
      return i;
    }
    return undefined;
  }
  // eslint-disable-next-line
  function eq(index) {
    if (typeof index === 'undefined') { return this; }
    var length = this.length;
    var returnIndex;
    if (index > length - 1) {
      return new Dom7([]);
    }
    if (index < 0) {
      returnIndex = length + index;
      if (returnIndex < 0) { return new Dom7([]); }
      return new Dom7([this[returnIndex]]);
    }
    return new Dom7([this[index]]);
  }
  function append() {
    var this$1 = this;
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var newChild;

    for (var k = 0; k < args.length; k += 1) {
      newChild = args[k];
      for (var i = 0; i < this.length; i += 1) {
        if (typeof newChild === 'string') {
          var tempDiv = doc.createElement('div');
          tempDiv.innerHTML = newChild;
          while (tempDiv.firstChild) {
            this$1[i].appendChild(tempDiv.firstChild);
          }
        } else if (newChild instanceof Dom7) {
          for (var j = 0; j < newChild.length; j += 1) {
            this$1[i].appendChild(newChild[j]);
          }
        } else {
          this$1[i].appendChild(newChild);
        }
      }
    }

    return this;
  }
  function prepend(newChild) {
    var this$1 = this;

    var i;
    var j;
    for (i = 0; i < this.length; i += 1) {
      if (typeof newChild === 'string') {
        var tempDiv = doc.createElement('div');
        tempDiv.innerHTML = newChild;
        for (j = tempDiv.childNodes.length - 1; j >= 0; j -= 1) {
          this$1[i].insertBefore(tempDiv.childNodes[j], this$1[i].childNodes[0]);
        }
      } else if (newChild instanceof Dom7) {
        for (j = 0; j < newChild.length; j += 1) {
          this$1[i].insertBefore(newChild[j], this$1[i].childNodes[0]);
        }
      } else {
        this$1[i].insertBefore(newChild, this$1[i].childNodes[0]);
      }
    }
    return this;
  }
  function next(selector) {
    if (this.length > 0) {
      if (selector) {
        if (this[0].nextElementSibling && $(this[0].nextElementSibling).is(selector)) {
          return new Dom7([this[0].nextElementSibling]);
        }
        return new Dom7([]);
      }

      if (this[0].nextElementSibling) { return new Dom7([this[0].nextElementSibling]); }
      return new Dom7([]);
    }
    return new Dom7([]);
  }
  function nextAll(selector) {
    var nextEls = [];
    var el = this[0];
    if (!el) { return new Dom7([]); }
    while (el.nextElementSibling) {
      var next = el.nextElementSibling; // eslint-disable-line
      if (selector) {
        if ($(next).is(selector)) { nextEls.push(next); }
      } else { nextEls.push(next); }
      el = next;
    }
    return new Dom7(nextEls);
  }
  function prev(selector) {
    if (this.length > 0) {
      var el = this[0];
      if (selector) {
        if (el.previousElementSibling && $(el.previousElementSibling).is(selector)) {
          return new Dom7([el.previousElementSibling]);
        }
        return new Dom7([]);
      }

      if (el.previousElementSibling) { return new Dom7([el.previousElementSibling]); }
      return new Dom7([]);
    }
    return new Dom7([]);
  }
  function prevAll(selector) {
    var prevEls = [];
    var el = this[0];
    if (!el) { return new Dom7([]); }
    while (el.previousElementSibling) {
      var prev = el.previousElementSibling; // eslint-disable-line
      if (selector) {
        if ($(prev).is(selector)) { prevEls.push(prev); }
      } else { prevEls.push(prev); }
      el = prev;
    }
    return new Dom7(prevEls);
  }
  function parent(selector) {
    var this$1 = this;

    var parents = []; // eslint-disable-line
    for (var i = 0; i < this.length; i += 1) {
      if (this$1[i].parentNode !== null) {
        if (selector) {
          if ($(this$1[i].parentNode).is(selector)) { parents.push(this$1[i].parentNode); }
        } else {
          parents.push(this$1[i].parentNode);
        }
      }
    }
    return $(unique(parents));
  }
  function parents(selector) {
    var this$1 = this;

    var parents = []; // eslint-disable-line
    for (var i = 0; i < this.length; i += 1) {
      var parent = this$1[i].parentNode; // eslint-disable-line
      while (parent) {
        if (selector) {
          if ($(parent).is(selector)) { parents.push(parent); }
        } else {
          parents.push(parent);
        }
        parent = parent.parentNode;
      }
    }
    return $(unique(parents));
  }
  function closest(selector) {
    var closest = this; // eslint-disable-line
    if (typeof selector === 'undefined') {
      return new Dom7([]);
    }
    if (!closest.is(selector)) {
      closest = closest.parents(selector).eq(0);
    }
    return closest;
  }
  function find(selector) {
    var this$1 = this;

    var foundElements = [];
    for (var i = 0; i < this.length; i += 1) {
      var found = this$1[i].querySelectorAll(selector);
      for (var j = 0; j < found.length; j += 1) {
        foundElements.push(found[j]);
      }
    }
    return new Dom7(foundElements);
  }
  function children(selector) {
    var this$1 = this;

    var children = []; // eslint-disable-line
    for (var i = 0; i < this.length; i += 1) {
      var childNodes = this$1[i].childNodes;

      for (var j = 0; j < childNodes.length; j += 1) {
        if (!selector) {
          if (childNodes[j].nodeType === 1) { children.push(childNodes[j]); }
        } else if (childNodes[j].nodeType === 1 && $(childNodes[j]).is(selector)) {
          children.push(childNodes[j]);
        }
      }
    }
    return new Dom7(unique(children));
  }
  function remove() {
    var this$1 = this;

    for (var i = 0; i < this.length; i += 1) {
      if (this$1[i].parentNode) { this$1[i].parentNode.removeChild(this$1[i]); }
    }
    return this;
  }
  function add() {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var dom = this;
    var i;
    var j;
    for (i = 0; i < args.length; i += 1) {
      var toAdd = $(args[i]);
      for (j = 0; j < toAdd.length; j += 1) {
        dom[dom.length] = toAdd[j];
        dom.length += 1;
      }
    }
    return dom;
  }

  var Methods = {
    addClass: addClass,
    removeClass: removeClass,
    hasClass: hasClass,
    toggleClass: toggleClass,
    attr: attr,
    removeAttr: removeAttr,
    data: data,
    transform: transform,
    transition: transition,
    on: on,
    off: off,
    trigger: trigger,
    transitionEnd: transitionEnd,
    outerWidth: outerWidth,
    outerHeight: outerHeight,
    offset: offset,
    css: css,
    each: each,
    html: html,
    text: text,
    is: is,
    index: index,
    eq: eq,
    append: append,
    prepend: prepend,
    next: next,
    nextAll: nextAll,
    prev: prev,
    prevAll: prevAll,
    parent: parent,
    parents: parents,
    closest: closest,
    find: find,
    children: children,
    remove: remove,
    add: add,
    styles: styles,
  };

  Object.keys(Methods).forEach(function (methodName) {
    $.fn[methodName] = Methods[methodName];
  });

  var Utils = {
    deleteProps: function deleteProps(obj) {
      var object = obj;
      Object.keys(object).forEach(function (key) {
        try {
          object[key] = null;
        } catch (e) {
          // no getter for object
        }
        try {
          delete object[key];
        } catch (e) {
          // something got wrong
        }
      });
    },
    nextTick: function nextTick(callback, delay) {
      if ( delay === void 0 ) delay = 0;

      return setTimeout(callback, delay);
    },
    now: function now() {
      return Date.now();
    },
    getTranslate: function getTranslate(el, axis) {
      if ( axis === void 0 ) axis = 'x';

      var matrix;
      var curTransform;
      var transformMatrix;

      var curStyle = win.getComputedStyle(el, null);

      if (win.WebKitCSSMatrix) {
        curTransform = curStyle.transform || curStyle.webkitTransform;
        if (curTransform.split(',').length > 6) {
          curTransform = curTransform.split(', ').map(function (a) { return a.replace(',', '.'); }).join(', ');
        }
        // Some old versions of Webkit choke when 'none' is passed; pass
        // empty string instead in this case
        transformMatrix = new win.WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
      } else {
        transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
        matrix = transformMatrix.toString().split(',');
      }

      if (axis === 'x') {
        // Latest Chrome and webkits Fix
        if (win.WebKitCSSMatrix) { curTransform = transformMatrix.m41; }
        // Crazy IE10 Matrix
        else if (matrix.length === 16) { curTransform = parseFloat(matrix[12]); }
        // Normal Browsers
        else { curTransform = parseFloat(matrix[4]); }
      }
      if (axis === 'y') {
        // Latest Chrome and webkits Fix
        if (win.WebKitCSSMatrix) { curTransform = transformMatrix.m42; }
        // Crazy IE10 Matrix
        else if (matrix.length === 16) { curTransform = parseFloat(matrix[13]); }
        // Normal Browsers
        else { curTransform = parseFloat(matrix[5]); }
      }
      return curTransform || 0;
    },
    parseUrlQuery: function parseUrlQuery(url) {
      var query = {};
      var urlToParse = url || win.location.href;
      var i;
      var params;
      var param;
      var length;
      if (typeof urlToParse === 'string' && urlToParse.length) {
        urlToParse = urlToParse.indexOf('?') > -1 ? urlToParse.replace(/\S*\?/, '') : '';
        params = urlToParse.split('&').filter(function (paramsPart) { return paramsPart !== ''; });
        length = params.length;

        for (i = 0; i < length; i += 1) {
          param = params[i].replace(/#\S+/g, '').split('=');
          query[decodeURIComponent(param[0])] = typeof param[1] === 'undefined' ? undefined : decodeURIComponent(param[1]) || '';
        }
      }
      return query;
    },
    isObject: function isObject(o) {
      return typeof o === 'object' && o !== null && o.constructor && o.constructor === Object;
    },
    extend: function extend() {
      var args = [], len$1 = arguments.length;
      while ( len$1-- ) args[ len$1 ] = arguments[ len$1 ];

      var to = Object(args[0]);
      for (var i = 1; i < args.length; i += 1) {
        var nextSource = args[i];
        if (nextSource !== undefined && nextSource !== null) {
          var keysArray = Object.keys(Object(nextSource));
          for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
            var nextKey = keysArray[nextIndex];
            var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
            if (desc !== undefined && desc.enumerable) {
              if (Utils.isObject(to[nextKey]) && Utils.isObject(nextSource[nextKey])) {
                Utils.extend(to[nextKey], nextSource[nextKey]);
              } else if (!Utils.isObject(to[nextKey]) && Utils.isObject(nextSource[nextKey])) {
                to[nextKey] = {};
                Utils.extend(to[nextKey], nextSource[nextKey]);
              } else {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
        }
      }
      return to;
    },
  };

  var Support = (function Support() {
    var testDiv = doc.createElement('div');
    return {
      touch: (win.Modernizr && win.Modernizr.touch === true) || (function checkTouch() {
        return !!(('ontouchstart' in win) || (win.DocumentTouch && doc instanceof win.DocumentTouch));
      }()),

      pointerEvents: !!(win.navigator.pointerEnabled || win.PointerEvent),
      prefixedPointerEvents: !!win.navigator.msPointerEnabled,

      transition: (function checkTransition() {
        var style = testDiv.style;
        return ('transition' in style || 'webkitTransition' in style || 'MozTransition' in style);
      }()),
      transforms3d: (win.Modernizr && win.Modernizr.csstransforms3d === true) || (function checkTransforms3d() {
        var style = testDiv.style;
        return ('webkitPerspective' in style || 'MozPerspective' in style || 'OPerspective' in style || 'MsPerspective' in style || 'perspective' in style);
      }()),

      flexbox: (function checkFlexbox() {
        var style = testDiv.style;
        var styles = ('alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient').split(' ');
        for (var i = 0; i < styles.length; i += 1) {
          if (styles[i] in style) { return true; }
        }
        return false;
      }()),

      observer: (function checkObserver() {
        return ('MutationObserver' in win || 'WebkitMutationObserver' in win);
      }()),

      passiveListener: (function checkPassiveListener() {
        var supportsPassive = false;
        try {
          var opts = Object.defineProperty({}, 'passive', {
            // eslint-disable-next-line
            get: function get() {
              supportsPassive = true;
            },
          });
          win.addEventListener('testPassiveListener', null, opts);
        } catch (e) {
          // No support
        }
        return supportsPassive;
      }()),

      gestures: (function checkGestures() {
        return 'ongesturestart' in win;
      }()),
    };
  }());

  var SwiperClass = function SwiperClass(params) {
    if ( params === void 0 ) params = {};

    var self = this;
    self.params = params;

    // Events
    self.eventsListeners = {};

    if (self.params && self.params.on) {
      Object.keys(self.params.on).forEach(function (eventName) {
        self.on(eventName, self.params.on[eventName]);
      });
    }
  };

  var staticAccessors = { components: { configurable: true } };

  SwiperClass.prototype.on = function on (events, handler, priority) {
    var self = this;
    if (typeof handler !== 'function') { return self; }
    var method = priority ? 'unshift' : 'push';
    events.split(' ').forEach(function (event) {
      if (!self.eventsListeners[event]) { self.eventsListeners[event] = []; }
      self.eventsListeners[event][method](handler);
    });
    return self;
  };

  SwiperClass.prototype.once = function once (events, handler, priority) {
    var self = this;
    if (typeof handler !== 'function') { return self; }
    function onceHandler() {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      handler.apply(self, args);
      self.off(events, onceHandler);
    }
    return self.on(events, onceHandler, priority);
  };

  SwiperClass.prototype.off = function off (events, handler) {
    var self = this;
    if (!self.eventsListeners) { return self; }
    events.split(' ').forEach(function (event) {
      if (typeof handler === 'undefined') {
        self.eventsListeners[event] = [];
      } else if (self.eventsListeners[event] && self.eventsListeners[event].length) {
        self.eventsListeners[event].forEach(function (eventHandler, index) {
          if (eventHandler === handler) {
            self.eventsListeners[event].splice(index, 1);
          }
        });
      }
    });
    return self;
  };

  SwiperClass.prototype.emit = function emit () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var self = this;
    if (!self.eventsListeners) { return self; }
    var events;
    var data;
    var context;
    if (typeof args[0] === 'string' || Array.isArray(args[0])) {
      events = args[0];
      data = args.slice(1, args.length);
      context = self;
    } else {
      events = args[0].events;
      data = args[0].data;
      context = args[0].context || self;
    }
    var eventsArray = Array.isArray(events) ? events : events.split(' ');
    eventsArray.forEach(function (event) {
      if (self.eventsListeners && self.eventsListeners[event]) {
        var handlers = [];
        self.eventsListeners[event].forEach(function (eventHandler) {
          handlers.push(eventHandler);
        });
        handlers.forEach(function (eventHandler) {
          eventHandler.apply(context, data);
        });
      }
    });
    return self;
  };

  SwiperClass.prototype.useModulesParams = function useModulesParams (instanceParams) {
    var instance = this;
    if (!instance.modules) { return; }
    Object.keys(instance.modules).forEach(function (moduleName) {
      var module = instance.modules[moduleName];
      // Extend params
      if (module.params) {
        Utils.extend(instanceParams, module.params);
      }
    });
  };

  SwiperClass.prototype.useModules = function useModules (modulesParams) {
    if ( modulesParams === void 0 ) modulesParams = {};

    var instance = this;
    if (!instance.modules) { return; }
    Object.keys(instance.modules).forEach(function (moduleName) {
      var module = instance.modules[moduleName];
      var moduleParams = modulesParams[moduleName] || {};
      // Extend instance methods and props
      if (module.instance) {
        Object.keys(module.instance).forEach(function (modulePropName) {
          var moduleProp = module.instance[modulePropName];
          if (typeof moduleProp === 'function') {
            instance[modulePropName] = moduleProp.bind(instance);
          } else {
            instance[modulePropName] = moduleProp;
          }
        });
      }
      // Add event listeners
      if (module.on && instance.on) {
        Object.keys(module.on).forEach(function (moduleEventName) {
          instance.on(moduleEventName, module.on[moduleEventName]);
        });
      }

      // Module create callback
      if (module.create) {
        module.create.bind(instance)(moduleParams);
      }
    });
  };

  staticAccessors.components.set = function (components) {
    var Class = this;
    if (!Class.use) { return; }
    Class.use(components);
  };

  SwiperClass.installModule = function installModule (module) {
    var params = [], len = arguments.length - 1;
    while ( len-- > 0 ) params[ len ] = arguments[ len + 1 ];

    var Class = this;
    if (!Class.prototype.modules) { Class.prototype.modules = {}; }
    var name = module.name || (((Object.keys(Class.prototype.modules).length) + "_" + (Utils.now())));
    Class.prototype.modules[name] = module;
    // Prototype
    if (module.proto) {
      Object.keys(module.proto).forEach(function (key) {
        Class.prototype[key] = module.proto[key];
      });
    }
    // Class
    if (module.static) {
      Object.keys(module.static).forEach(function (key) {
        Class[key] = module.static[key];
      });
    }
    // Callback
    if (module.install) {
      module.install.apply(Class, params);
    }
    return Class;
  };

  SwiperClass.use = function use (module) {
    var params = [], len = arguments.length - 1;
    while ( len-- > 0 ) params[ len ] = arguments[ len + 1 ];

    var Class = this;
    if (Array.isArray(module)) {
      module.forEach(function (m) { return Class.installModule(m); });
      return Class;
    }
    return Class.installModule.apply(Class, [ module ].concat( params ));
  };

  Object.defineProperties( SwiperClass, staticAccessors );

  function updateSize () {
    var swiper = this;
    var width;
    var height;
    var $el = swiper.$el;
    if (typeof swiper.params.width !== 'undefined') {
      width = swiper.params.width;
    } else {
      width = $el[0].clientWidth;
    }
    if (typeof swiper.params.height !== 'undefined') {
      height = swiper.params.height;
    } else {
      height = $el[0].clientHeight;
    }
    if ((width === 0 && swiper.isHorizontal()) || (height === 0 && swiper.isVertical())) {
      return;
    }

    // Subtract paddings
    width = width - parseInt($el.css('padding-left'), 10) - parseInt($el.css('padding-right'), 10);
    height = height - parseInt($el.css('padding-top'), 10) - parseInt($el.css('padding-bottom'), 10);

    Utils.extend(swiper, {
      width: width,
      height: height,
      size: swiper.isHorizontal() ? width : height,
    });
  }

  function updateSlides () {
    var swiper = this;
    var params = swiper.params;

    var $wrapperEl = swiper.$wrapperEl;
    var swiperSize = swiper.size;
    var rtl = swiper.rtlTranslate;
    var wrongRTL = swiper.wrongRTL;
    var isVirtual = swiper.virtual && params.virtual.enabled;
    var previousSlidesLength = isVirtual ? swiper.virtual.slides.length : swiper.slides.length;
    var slides = $wrapperEl.children(("." + (swiper.params.slideClass)));
    var slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
    var snapGrid = [];
    var slidesGrid = [];
    var slidesSizesGrid = [];

    var offsetBefore = params.slidesOffsetBefore;
    if (typeof offsetBefore === 'function') {
      offsetBefore = params.slidesOffsetBefore.call(swiper);
    }

    var offsetAfter = params.slidesOffsetAfter;
    if (typeof offsetAfter === 'function') {
      offsetAfter = params.slidesOffsetAfter.call(swiper);
    }

    var previousSnapGridLength = swiper.snapGrid.length;
    var previousSlidesGridLength = swiper.snapGrid.length;

    var spaceBetween = params.spaceBetween;
    var slidePosition = -offsetBefore;
    var prevSlideSize = 0;
    var index = 0;
    if (typeof swiperSize === 'undefined') {
      return;
    }
    if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
      spaceBetween = (parseFloat(spaceBetween.replace('%', '')) / 100) * swiperSize;
    }

    swiper.virtualSize = -spaceBetween;

    // reset margins
    if (rtl) { slides.css({ marginLeft: '', marginTop: '' }); }
    else { slides.css({ marginRight: '', marginBottom: '' }); }

    var slidesNumberEvenToRows;
    if (params.slidesPerColumn > 1) {
      if (Math.floor(slidesLength / params.slidesPerColumn) === slidesLength / swiper.params.slidesPerColumn) {
        slidesNumberEvenToRows = slidesLength;
      } else {
        slidesNumberEvenToRows = Math.ceil(slidesLength / params.slidesPerColumn) * params.slidesPerColumn;
      }
      if (params.slidesPerView !== 'auto' && params.slidesPerColumnFill === 'row') {
        slidesNumberEvenToRows = Math.max(slidesNumberEvenToRows, params.slidesPerView * params.slidesPerColumn);
      }
    }

    // Calc slides
    var slideSize;
    var slidesPerColumn = params.slidesPerColumn;
    var slidesPerRow = slidesNumberEvenToRows / slidesPerColumn;
    var numFullColumns = slidesPerRow - ((params.slidesPerColumn * slidesPerRow) - slidesLength);
    for (var i = 0; i < slidesLength; i += 1) {
      slideSize = 0;
      var slide = slides.eq(i);
      if (params.slidesPerColumn > 1) {
        // Set slides order
        var newSlideOrderIndex = (void 0);
        var column = (void 0);
        var row = (void 0);
        if (params.slidesPerColumnFill === 'column') {
          column = Math.floor(i / slidesPerColumn);
          row = i - (column * slidesPerColumn);
          if (column > numFullColumns || (column === numFullColumns && row === slidesPerColumn - 1)) {
            row += 1;
            if (row >= slidesPerColumn) {
              row = 0;
              column += 1;
            }
          }
          newSlideOrderIndex = column + ((row * slidesNumberEvenToRows) / slidesPerColumn);
          slide
            .css({
              '-webkit-box-ordinal-group': newSlideOrderIndex,
              '-moz-box-ordinal-group': newSlideOrderIndex,
              '-ms-flex-order': newSlideOrderIndex,
              '-webkit-order': newSlideOrderIndex,
              order: newSlideOrderIndex,
            });
        } else {
          row = Math.floor(i / slidesPerRow);
          column = i - (row * slidesPerRow);
        }
        slide
          .css(
            ("margin-" + (swiper.isHorizontal() ? 'top' : 'left')),
            (row !== 0 && params.spaceBetween) && (((params.spaceBetween) + "px"))
          )
          .attr('data-swiper-column', column)
          .attr('data-swiper-row', row);
      }
      if (slide.css('display') === 'none') { continue; } // eslint-disable-line

      if (params.slidesPerView === 'auto') {
        var slideStyles = win.getComputedStyle(slide[0], null);
        var currentTransform = slide[0].style.transform;
        var currentWebKitTransform = slide[0].style.webkitTransform;
        if (currentTransform) {
          slide[0].style.transform = 'none';
        }
        if (currentWebKitTransform) {
          slide[0].style.webkitTransform = 'none';
        }
        if (params.roundLengths) {
          slideSize = swiper.isHorizontal()
            ? slide.outerWidth(true)
            : slide.outerHeight(true);
        } else {
          // eslint-disable-next-line
          if (swiper.isHorizontal()) {
            slideSize = slide[0].getBoundingClientRect().width
              + parseFloat(slideStyles.getPropertyValue('margin-left'))
              + parseFloat(slideStyles.getPropertyValue('margin-right'));
          } else {
            slideSize = slide[0].getBoundingClientRect().height
              + parseFloat(slideStyles.getPropertyValue('margin-top'))
              + parseFloat(slideStyles.getPropertyValue('margin-bottom'));
          }
        }
        if (currentTransform) {
          slide[0].style.transform = currentTransform;
        }
        if (currentWebKitTransform) {
          slide[0].style.webkitTransform = currentWebKitTransform;
        }
        if (params.roundLengths) { slideSize = Math.floor(slideSize); }
      } else {
        slideSize = (swiperSize - ((params.slidesPerView - 1) * spaceBetween)) / params.slidesPerView;
        if (params.roundLengths) { slideSize = Math.floor(slideSize); }

        if (slides[i]) {
          if (swiper.isHorizontal()) {
            slides[i].style.width = slideSize + "px";
          } else {
            slides[i].style.height = slideSize + "px";
          }
        }
      }
      if (slides[i]) {
        slides[i].swiperSlideSize = slideSize;
      }
      slidesSizesGrid.push(slideSize);


      if (params.centeredSlides) {
        slidePosition = slidePosition + (slideSize / 2) + (prevSlideSize / 2) + spaceBetween;
        if (prevSlideSize === 0 && i !== 0) { slidePosition = slidePosition - (swiperSize / 2) - spaceBetween; }
        if (i === 0) { slidePosition = slidePosition - (swiperSize / 2) - spaceBetween; }
        if (Math.abs(slidePosition) < 1 / 1000) { slidePosition = 0; }
        if (params.roundLengths) { slidePosition = Math.floor(slidePosition); }
        if ((index) % params.slidesPerGroup === 0) { snapGrid.push(slidePosition); }
        slidesGrid.push(slidePosition);
      } else {
        if (params.roundLengths) { slidePosition = Math.floor(slidePosition); }
        if ((index) % params.slidesPerGroup === 0) { snapGrid.push(slidePosition); }
        slidesGrid.push(slidePosition);
        slidePosition = slidePosition + slideSize + spaceBetween;
      }

      swiper.virtualSize += slideSize + spaceBetween;

      prevSlideSize = slideSize;

      index += 1;
    }
    swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;
    var newSlidesGrid;

    if (
      rtl && wrongRTL && (params.effect === 'slide' || params.effect === 'coverflow')) {
      $wrapperEl.css({ width: ((swiper.virtualSize + params.spaceBetween) + "px") });
    }
    if (!Support.flexbox || params.setWrapperSize) {
      if (swiper.isHorizontal()) { $wrapperEl.css({ width: ((swiper.virtualSize + params.spaceBetween) + "px") }); }
      else { $wrapperEl.css({ height: ((swiper.virtualSize + params.spaceBetween) + "px") }); }
    }

    if (params.slidesPerColumn > 1) {
      swiper.virtualSize = (slideSize + params.spaceBetween) * slidesNumberEvenToRows;
      swiper.virtualSize = Math.ceil(swiper.virtualSize / params.slidesPerColumn) - params.spaceBetween;
      if (swiper.isHorizontal()) { $wrapperEl.css({ width: ((swiper.virtualSize + params.spaceBetween) + "px") }); }
      else { $wrapperEl.css({ height: ((swiper.virtualSize + params.spaceBetween) + "px") }); }
      if (params.centeredSlides) {
        newSlidesGrid = [];
        for (var i$1 = 0; i$1 < snapGrid.length; i$1 += 1) {
          var slidesGridItem = snapGrid[i$1];
          if (params.roundLengths) { slidesGridItem = Math.floor(slidesGridItem); }
          if (snapGrid[i$1] < swiper.virtualSize + snapGrid[0]) { newSlidesGrid.push(slidesGridItem); }
        }
        snapGrid = newSlidesGrid;
      }
    }

    // Remove last grid elements depending on width
    if (!params.centeredSlides) {
      newSlidesGrid = [];
      for (var i$2 = 0; i$2 < snapGrid.length; i$2 += 1) {
        var slidesGridItem$1 = snapGrid[i$2];
        if (params.roundLengths) { slidesGridItem$1 = Math.floor(slidesGridItem$1); }
        if (snapGrid[i$2] <= swiper.virtualSize - swiperSize) {
          newSlidesGrid.push(slidesGridItem$1);
        }
      }
      snapGrid = newSlidesGrid;
      if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) {
        snapGrid.push(swiper.virtualSize - swiperSize);
      }
    }
    if (snapGrid.length === 0) { snapGrid = [0]; }

    if (params.spaceBetween !== 0) {
      if (swiper.isHorizontal()) {
        if (rtl) { slides.css({ marginLeft: (spaceBetween + "px") }); }
        else { slides.css({ marginRight: (spaceBetween + "px") }); }
      } else { slides.css({ marginBottom: (spaceBetween + "px") }); }
    }

    if (params.centerInsufficientSlides) {
      var allSlidesSize = 0;
      slidesSizesGrid.forEach(function (slideSizeValue) {
        allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
      });
      allSlidesSize -= params.spaceBetween;
      if (allSlidesSize < swiperSize) {
        var allSlidesOffset = (swiperSize - allSlidesSize) / 2;
        snapGrid.forEach(function (snap, snapIndex) {
          snapGrid[snapIndex] = snap - allSlidesOffset;
        });
        slidesGrid.forEach(function (snap, snapIndex) {
          slidesGrid[snapIndex] = snap + allSlidesOffset;
        });
      }
    }

    Utils.extend(swiper, {
      slides: slides,
      snapGrid: snapGrid,
      slidesGrid: slidesGrid,
      slidesSizesGrid: slidesSizesGrid,
    });

    if (slidesLength !== previousSlidesLength) {
      swiper.emit('slidesLengthChange');
    }
    if (snapGrid.length !== previousSnapGridLength) {
      if (swiper.params.watchOverflow) { swiper.checkOverflow(); }
      swiper.emit('snapGridLengthChange');
    }
    if (slidesGrid.length !== previousSlidesGridLength) {
      swiper.emit('slidesGridLengthChange');
    }

    if (params.watchSlidesProgress || params.watchSlidesVisibility) {
      swiper.updateSlidesOffset();
    }
  }

  function updateAutoHeight (speed) {
    var swiper = this;
    var activeSlides = [];
    var newHeight = 0;
    var i;
    if (typeof speed === 'number') {
      swiper.setTransition(speed);
    } else if (speed === true) {
      swiper.setTransition(swiper.params.speed);
    }
    // Find slides currently in view
    if (swiper.params.slidesPerView !== 'auto' && swiper.params.slidesPerView > 1) {
      for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
        var index = swiper.activeIndex + i;
        if (index > swiper.slides.length) { break; }
        activeSlides.push(swiper.slides.eq(index)[0]);
      }
    } else {
      activeSlides.push(swiper.slides.eq(swiper.activeIndex)[0]);
    }

    // Find new height from highest slide in view
    for (i = 0; i < activeSlides.length; i += 1) {
      if (typeof activeSlides[i] !== 'undefined') {
        var height = activeSlides[i].offsetHeight;
        newHeight = height > newHeight ? height : newHeight;
      }
    }

    // Update Height
    if (newHeight) { swiper.$wrapperEl.css('height', (newHeight + "px")); }
  }

  function updateSlidesOffset () {
    var swiper = this;
    var slides = swiper.slides;
    for (var i = 0; i < slides.length; i += 1) {
      slides[i].swiperSlideOffset = swiper.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop;
    }
  }

  function updateSlidesProgress (translate) {
    if ( translate === void 0 ) translate = (this && this.translate) || 0;

    var swiper = this;
    var params = swiper.params;

    var slides = swiper.slides;
    var rtl = swiper.rtlTranslate;

    if (slides.length === 0) { return; }
    if (typeof slides[0].swiperSlideOffset === 'undefined') { swiper.updateSlidesOffset(); }

    var offsetCenter = -translate;
    if (rtl) { offsetCenter = translate; }

    // Visible Slides
    slides.removeClass(params.slideVisibleClass);

    swiper.visibleSlidesIndexes = [];
    swiper.visibleSlides = [];

    for (var i = 0; i < slides.length; i += 1) {
      var slide = slides[i];
      var slideProgress = (
        (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0)) - slide.swiperSlideOffset
      ) / (slide.swiperSlideSize + params.spaceBetween);
      if (params.watchSlidesVisibility) {
        var slideBefore = -(offsetCenter - slide.swiperSlideOffset);
        var slideAfter = slideBefore + swiper.slidesSizesGrid[i];
        var isVisible = (slideBefore >= 0 && slideBefore < swiper.size)
          || (slideAfter > 0 && slideAfter <= swiper.size)
          || (slideBefore <= 0 && slideAfter >= swiper.size);
        if (isVisible) {
          swiper.visibleSlides.push(slide);
          swiper.visibleSlidesIndexes.push(i);
          slides.eq(i).addClass(params.slideVisibleClass);
        }
      }
      slide.progress = rtl ? -slideProgress : slideProgress;
    }
    swiper.visibleSlides = $(swiper.visibleSlides);
  }

  function updateProgress (translate) {
    if ( translate === void 0 ) translate = (this && this.translate) || 0;

    var swiper = this;
    var params = swiper.params;

    var translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
    var progress = swiper.progress;
    var isBeginning = swiper.isBeginning;
    var isEnd = swiper.isEnd;
    var wasBeginning = isBeginning;
    var wasEnd = isEnd;
    if (translatesDiff === 0) {
      progress = 0;
      isBeginning = true;
      isEnd = true;
    } else {
      progress = (translate - swiper.minTranslate()) / (translatesDiff);
      isBeginning = progress <= 0;
      isEnd = progress >= 1;
    }
    Utils.extend(swiper, {
      progress: progress,
      isBeginning: isBeginning,
      isEnd: isEnd,
    });

    if (params.watchSlidesProgress || params.watchSlidesVisibility) { swiper.updateSlidesProgress(translate); }

    if (isBeginning && !wasBeginning) {
      swiper.emit('reachBeginning toEdge');
    }
    if (isEnd && !wasEnd) {
      swiper.emit('reachEnd toEdge');
    }
    if ((wasBeginning && !isBeginning) || (wasEnd && !isEnd)) {
      swiper.emit('fromEdge');
    }

    swiper.emit('progress', progress);
  }

  function updateSlidesClasses () {
    var swiper = this;

    var slides = swiper.slides;
    var params = swiper.params;
    var $wrapperEl = swiper.$wrapperEl;
    var activeIndex = swiper.activeIndex;
    var realIndex = swiper.realIndex;
    var isVirtual = swiper.virtual && params.virtual.enabled;

    slides.removeClass(((params.slideActiveClass) + " " + (params.slideNextClass) + " " + (params.slidePrevClass) + " " + (params.slideDuplicateActiveClass) + " " + (params.slideDuplicateNextClass) + " " + (params.slideDuplicatePrevClass)));

    var activeSlide;
    if (isVirtual) {
      activeSlide = swiper.$wrapperEl.find(("." + (params.slideClass) + "[data-swiper-slide-index=\"" + activeIndex + "\"]"));
    } else {
      activeSlide = slides.eq(activeIndex);
    }

    // Active classes
    activeSlide.addClass(params.slideActiveClass);

    if (params.loop) {
      // Duplicate to all looped slides
      if (activeSlide.hasClass(params.slideDuplicateClass)) {
        $wrapperEl
          .children(("." + (params.slideClass) + ":not(." + (params.slideDuplicateClass) + ")[data-swiper-slide-index=\"" + realIndex + "\"]"))
          .addClass(params.slideDuplicateActiveClass);
      } else {
        $wrapperEl
          .children(("." + (params.slideClass) + "." + (params.slideDuplicateClass) + "[data-swiper-slide-index=\"" + realIndex + "\"]"))
          .addClass(params.slideDuplicateActiveClass);
      }
    }
    // Next Slide
    var nextSlide = activeSlide.nextAll(("." + (params.slideClass))).eq(0).addClass(params.slideNextClass);
    if (params.loop && nextSlide.length === 0) {
      nextSlide = slides.eq(0);
      nextSlide.addClass(params.slideNextClass);
    }
    // Prev Slide
    var prevSlide = activeSlide.prevAll(("." + (params.slideClass))).eq(0).addClass(params.slidePrevClass);
    if (params.loop && prevSlide.length === 0) {
      prevSlide = slides.eq(-1);
      prevSlide.addClass(params.slidePrevClass);
    }
    if (params.loop) {
      // Duplicate to all looped slides
      if (nextSlide.hasClass(params.slideDuplicateClass)) {
        $wrapperEl
          .children(("." + (params.slideClass) + ":not(." + (params.slideDuplicateClass) + ")[data-swiper-slide-index=\"" + (nextSlide.attr('data-swiper-slide-index')) + "\"]"))
          .addClass(params.slideDuplicateNextClass);
      } else {
        $wrapperEl
          .children(("." + (params.slideClass) + "." + (params.slideDuplicateClass) + "[data-swiper-slide-index=\"" + (nextSlide.attr('data-swiper-slide-index')) + "\"]"))
          .addClass(params.slideDuplicateNextClass);
      }
      if (prevSlide.hasClass(params.slideDuplicateClass)) {
        $wrapperEl
          .children(("." + (params.slideClass) + ":not(." + (params.slideDuplicateClass) + ")[data-swiper-slide-index=\"" + (prevSlide.attr('data-swiper-slide-index')) + "\"]"))
          .addClass(params.slideDuplicatePrevClass);
      } else {
        $wrapperEl
          .children(("." + (params.slideClass) + "." + (params.slideDuplicateClass) + "[data-swiper-slide-index=\"" + (prevSlide.attr('data-swiper-slide-index')) + "\"]"))
          .addClass(params.slideDuplicatePrevClass);
      }
    }
  }

  function updateActiveIndex (newActiveIndex) {
    var swiper = this;
    var translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
    var slidesGrid = swiper.slidesGrid;
    var snapGrid = swiper.snapGrid;
    var params = swiper.params;
    var previousIndex = swiper.activeIndex;
    var previousRealIndex = swiper.realIndex;
    var previousSnapIndex = swiper.snapIndex;
    var activeIndex = newActiveIndex;
    var snapIndex;
    if (typeof activeIndex === 'undefined') {
      for (var i = 0; i < slidesGrid.length; i += 1) {
        if (typeof slidesGrid[i + 1] !== 'undefined') {
          if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1] - ((slidesGrid[i + 1] - slidesGrid[i]) / 2)) {
            activeIndex = i;
          } else if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1]) {
            activeIndex = i + 1;
          }
        } else if (translate >= slidesGrid[i]) {
          activeIndex = i;
        }
      }
      // Normalize slideIndex
      if (params.normalizeSlideIndex) {
        if (activeIndex < 0 || typeof activeIndex === 'undefined') { activeIndex = 0; }
      }
    }
    if (snapGrid.indexOf(translate) >= 0) {
      snapIndex = snapGrid.indexOf(translate);
    } else {
      snapIndex = Math.floor(activeIndex / params.slidesPerGroup);
    }
    if (snapIndex >= snapGrid.length) { snapIndex = snapGrid.length - 1; }
    if (activeIndex === previousIndex) {
      if (snapIndex !== previousSnapIndex) {
        swiper.snapIndex = snapIndex;
        swiper.emit('snapIndexChange');
      }
      return;
    }

    // Get real index
    var realIndex = parseInt(swiper.slides.eq(activeIndex).attr('data-swiper-slide-index') || activeIndex, 10);

    Utils.extend(swiper, {
      snapIndex: snapIndex,
      realIndex: realIndex,
      previousIndex: previousIndex,
      activeIndex: activeIndex,
    });
    swiper.emit('activeIndexChange');
    swiper.emit('snapIndexChange');
    if (previousRealIndex !== realIndex) {
      swiper.emit('realIndexChange');
    }
    swiper.emit('slideChange');
  }

  function updateClickedSlide (e) {
    var swiper = this;
    var params = swiper.params;
    var slide = $(e.target).closest(("." + (params.slideClass)))[0];
    var slideFound = false;
    if (slide) {
      for (var i = 0; i < swiper.slides.length; i += 1) {
        if (swiper.slides[i] === slide) { slideFound = true; }
      }
    }

    if (slide && slideFound) {
      swiper.clickedSlide = slide;
      if (swiper.virtual && swiper.params.virtual.enabled) {
        swiper.clickedIndex = parseInt($(slide).attr('data-swiper-slide-index'), 10);
      } else {
        swiper.clickedIndex = $(slide).index();
      }
    } else {
      swiper.clickedSlide = undefined;
      swiper.clickedIndex = undefined;
      return;
    }
    if (params.slideToClickedSlide && swiper.clickedIndex !== undefined && swiper.clickedIndex !== swiper.activeIndex) {
      swiper.slideToClickedSlide();
    }
  }

  var update = {
    updateSize: updateSize,
    updateSlides: updateSlides,
    updateAutoHeight: updateAutoHeight,
    updateSlidesOffset: updateSlidesOffset,
    updateSlidesProgress: updateSlidesProgress,
    updateProgress: updateProgress,
    updateSlidesClasses: updateSlidesClasses,
    updateActiveIndex: updateActiveIndex,
    updateClickedSlide: updateClickedSlide,
  };

  function getTranslate (axis) {
    if ( axis === void 0 ) axis = this.isHorizontal() ? 'x' : 'y';

    var swiper = this;

    var params = swiper.params;
    var rtl = swiper.rtlTranslate;
    var translate = swiper.translate;
    var $wrapperEl = swiper.$wrapperEl;

    if (params.virtualTranslate) {
      return rtl ? -translate : translate;
    }

    var currentTranslate = Utils.getTranslate($wrapperEl[0], axis);
    if (rtl) { currentTranslate = -currentTranslate; }

    return currentTranslate || 0;
  }

  function setTranslate (translate, byController) {
    var swiper = this;
    var rtl = swiper.rtlTranslate;
    var params = swiper.params;
    var $wrapperEl = swiper.$wrapperEl;
    var progress = swiper.progress;
    var x = 0;
    var y = 0;
    var z = 0;

    if (swiper.isHorizontal()) {
      x = rtl ? -translate : translate;
    } else {
      y = translate;
    }

    if (params.roundLengths) {
      x = Math.floor(x);
      y = Math.floor(y);
    }

    if (!params.virtualTranslate) {
      if (Support.transforms3d) { $wrapperEl.transform(("translate3d(" + x + "px, " + y + "px, " + z + "px)")); }
      else { $wrapperEl.transform(("translate(" + x + "px, " + y + "px)")); }
    }
    swiper.previousTranslate = swiper.translate;
    swiper.translate = swiper.isHorizontal() ? x : y;

    // Check if we need to update progress
    var newProgress;
    var translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
    if (translatesDiff === 0) {
      newProgress = 0;
    } else {
      newProgress = (translate - swiper.minTranslate()) / (translatesDiff);
    }
    if (newProgress !== progress) {
      swiper.updateProgress(translate);
    }

    swiper.emit('setTranslate', swiper.translate, byController);
  }

  function minTranslate () {
    return (-this.snapGrid[0]);
  }

  function maxTranslate () {
    return (-this.snapGrid[this.snapGrid.length - 1]);
  }

  var translate = {
    getTranslate: getTranslate,
    setTranslate: setTranslate,
    minTranslate: minTranslate,
    maxTranslate: maxTranslate,
  };

  function setTransition (duration, byController) {
    var swiper = this;

    swiper.$wrapperEl.transition(duration);

    swiper.emit('setTransition', duration, byController);
  }

  function transitionStart (runCallbacks, direction) {
    if ( runCallbacks === void 0 ) runCallbacks = true;

    var swiper = this;
    var activeIndex = swiper.activeIndex;
    var params = swiper.params;
    var previousIndex = swiper.previousIndex;
    if (params.autoHeight) {
      swiper.updateAutoHeight();
    }

    var dir = direction;
    if (!dir) {
      if (activeIndex > previousIndex) { dir = 'next'; }
      else if (activeIndex < previousIndex) { dir = 'prev'; }
      else { dir = 'reset'; }
    }

    swiper.emit('transitionStart');

    if (runCallbacks && activeIndex !== previousIndex) {
      if (dir === 'reset') {
        swiper.emit('slideResetTransitionStart');
        return;
      }
      swiper.emit('slideChangeTransitionStart');
      if (dir === 'next') {
        swiper.emit('slideNextTransitionStart');
      } else {
        swiper.emit('slidePrevTransitionStart');
      }
    }
  }

  function transitionEnd$1 (runCallbacks, direction) {
    if ( runCallbacks === void 0 ) runCallbacks = true;

    var swiper = this;
    var activeIndex = swiper.activeIndex;
    var previousIndex = swiper.previousIndex;
    swiper.animating = false;
    swiper.setTransition(0);

    var dir = direction;
    if (!dir) {
      if (activeIndex > previousIndex) { dir = 'next'; }
      else if (activeIndex < previousIndex) { dir = 'prev'; }
      else { dir = 'reset'; }
    }

    swiper.emit('transitionEnd');

    if (runCallbacks && activeIndex !== previousIndex) {
      if (dir === 'reset') {
        swiper.emit('slideResetTransitionEnd');
        return;
      }
      swiper.emit('slideChangeTransitionEnd');
      if (dir === 'next') {
        swiper.emit('slideNextTransitionEnd');
      } else {
        swiper.emit('slidePrevTransitionEnd');
      }
    }
  }

  var transition$1 = {
    setTransition: setTransition,
    transitionStart: transitionStart,
    transitionEnd: transitionEnd$1,
  };

  function slideTo (index, speed, runCallbacks, internal) {
    if ( index === void 0 ) index = 0;
    if ( speed === void 0 ) speed = this.params.speed;
    if ( runCallbacks === void 0 ) runCallbacks = true;

    var swiper = this;
    var slideIndex = index;
    if (slideIndex < 0) { slideIndex = 0; }

    var params = swiper.params;
    var snapGrid = swiper.snapGrid;
    var slidesGrid = swiper.slidesGrid;
    var previousIndex = swiper.previousIndex;
    var activeIndex = swiper.activeIndex;
    var rtl = swiper.rtlTranslate;
    if (swiper.animating && params.preventInteractionOnTransition) {
      return false;
    }

    var snapIndex = Math.floor(slideIndex / params.slidesPerGroup);
    if (snapIndex >= snapGrid.length) { snapIndex = snapGrid.length - 1; }

    if ((activeIndex || params.initialSlide || 0) === (previousIndex || 0) && runCallbacks) {
      swiper.emit('beforeSlideChangeStart');
    }

    var translate = -snapGrid[snapIndex];

    // Update progress
    swiper.updateProgress(translate);

    // Normalize slideIndex
    if (params.normalizeSlideIndex) {
      for (var i = 0; i < slidesGrid.length; i += 1) {
        if (-Math.floor(translate * 100) >= Math.floor(slidesGrid[i] * 100)) {
          slideIndex = i;
        }
      }
    }
    // Directions locks
    if (swiper.initialized && slideIndex !== activeIndex) {
      if (!swiper.allowSlideNext && translate < swiper.translate && translate < swiper.minTranslate()) {
        return false;
      }
      if (!swiper.allowSlidePrev && translate > swiper.translate && translate > swiper.maxTranslate()) {
        if ((activeIndex || 0) !== slideIndex) { return false; }
      }
    }

    var direction;
    if (slideIndex > activeIndex) { direction = 'next'; }
    else if (slideIndex < activeIndex) { direction = 'prev'; }
    else { direction = 'reset'; }


    // Update Index
    if ((rtl && -translate === swiper.translate) || (!rtl && translate === swiper.translate)) {
      swiper.updateActiveIndex(slideIndex);
      // Update Height
      if (params.autoHeight) {
        swiper.updateAutoHeight();
      }
      swiper.updateSlidesClasses();
      if (params.effect !== 'slide') {
        swiper.setTranslate(translate);
      }
      if (direction !== 'reset') {
        swiper.transitionStart(runCallbacks, direction);
        swiper.transitionEnd(runCallbacks, direction);
      }
      return false;
    }

    if (speed === 0 || !Support.transition) {
      swiper.setTransition(0);
      swiper.setTranslate(translate);
      swiper.updateActiveIndex(slideIndex);
      swiper.updateSlidesClasses();
      swiper.emit('beforeTransitionStart', speed, internal);
      swiper.transitionStart(runCallbacks, direction);
      swiper.transitionEnd(runCallbacks, direction);
    } else {
      swiper.setTransition(speed);
      swiper.setTranslate(translate);
      swiper.updateActiveIndex(slideIndex);
      swiper.updateSlidesClasses();
      swiper.emit('beforeTransitionStart', speed, internal);
      swiper.transitionStart(runCallbacks, direction);
      if (!swiper.animating) {
        swiper.animating = true;
        if (!swiper.onSlideToWrapperTransitionEnd) {
          swiper.onSlideToWrapperTransitionEnd = function transitionEnd(e) {
            if (!swiper || swiper.destroyed) { return; }
            if (e.target !== this) { return; }
            swiper.$wrapperEl[0].removeEventListener('transitionend', swiper.onSlideToWrapperTransitionEnd);
            swiper.$wrapperEl[0].removeEventListener('webkitTransitionEnd', swiper.onSlideToWrapperTransitionEnd);
            swiper.onSlideToWrapperTransitionEnd = null;
            delete swiper.onSlideToWrapperTransitionEnd;
            swiper.transitionEnd(runCallbacks, direction);
          };
        }
        swiper.$wrapperEl[0].addEventListener('transitionend', swiper.onSlideToWrapperTransitionEnd);
        swiper.$wrapperEl[0].addEventListener('webkitTransitionEnd', swiper.onSlideToWrapperTransitionEnd);
      }
    }

    return true;
  }

  function slideToLoop (index, speed, runCallbacks, internal) {
    if ( index === void 0 ) index = 0;
    if ( speed === void 0 ) speed = this.params.speed;
    if ( runCallbacks === void 0 ) runCallbacks = true;

    var swiper = this;
    var newIndex = index;
    if (swiper.params.loop) {
      newIndex += swiper.loopedSlides;
    }

    return swiper.slideTo(newIndex, speed, runCallbacks, internal);
  }

  /* eslint no-unused-vars: "off" */
  function slideNext (speed, runCallbacks, internal) {
    if ( speed === void 0 ) speed = this.params.speed;
    if ( runCallbacks === void 0 ) runCallbacks = true;

    var swiper = this;
    var params = swiper.params;
    var animating = swiper.animating;
    if (params.loop) {
      if (animating) { return false; }
      swiper.loopFix();
      // eslint-disable-next-line
      swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
      return swiper.slideTo(swiper.activeIndex + params.slidesPerGroup, speed, runCallbacks, internal);
    }
    return swiper.slideTo(swiper.activeIndex + params.slidesPerGroup, speed, runCallbacks, internal);
  }

  /* eslint no-unused-vars: "off" */
  function slidePrev (speed, runCallbacks, internal) {
    if ( speed === void 0 ) speed = this.params.speed;
    if ( runCallbacks === void 0 ) runCallbacks = true;

    var swiper = this;
    var params = swiper.params;
    var animating = swiper.animating;
    var snapGrid = swiper.snapGrid;
    var slidesGrid = swiper.slidesGrid;
    var rtlTranslate = swiper.rtlTranslate;

    if (params.loop) {
      if (animating) { return false; }
      swiper.loopFix();
      // eslint-disable-next-line
      swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
    }
    var translate = rtlTranslate ? swiper.translate : -swiper.translate;
    function normalize(val) {
      if (val < 0) { return -Math.floor(Math.abs(val)); }
      return Math.floor(val);
    }
    var normalizedTranslate = normalize(translate);
    var normalizedSnapGrid = snapGrid.map(function (val) { return normalize(val); });
    var normalizedSlidesGrid = slidesGrid.map(function (val) { return normalize(val); });

    var currentSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate)];
    var prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];
    var prevIndex;
    if (typeof prevSnap !== 'undefined') {
      prevIndex = slidesGrid.indexOf(prevSnap);
      if (prevIndex < 0) { prevIndex = swiper.activeIndex - 1; }
    }
    return swiper.slideTo(prevIndex, speed, runCallbacks, internal);
  }

  /* eslint no-unused-vars: "off" */
  function slideReset (speed, runCallbacks, internal) {
    if ( speed === void 0 ) speed = this.params.speed;
    if ( runCallbacks === void 0 ) runCallbacks = true;

    var swiper = this;
    return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
  }

  /* eslint no-unused-vars: "off" */
  function slideToClosest (speed, runCallbacks, internal) {
    if ( speed === void 0 ) speed = this.params.speed;
    if ( runCallbacks === void 0 ) runCallbacks = true;

    var swiper = this;
    var index = swiper.activeIndex;
    var snapIndex = Math.floor(index / swiper.params.slidesPerGroup);

    if (snapIndex < swiper.snapGrid.length - 1) {
      var translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;

      var currentSnap = swiper.snapGrid[snapIndex];
      var nextSnap = swiper.snapGrid[snapIndex + 1];

      if ((translate - currentSnap) > (nextSnap - currentSnap) / 2) {
        index = swiper.params.slidesPerGroup;
      }
    }

    return swiper.slideTo(index, speed, runCallbacks, internal);
  }

  function slideToClickedSlide () {
    var swiper = this;
    var params = swiper.params;
    var $wrapperEl = swiper.$wrapperEl;

    var slidesPerView = params.slidesPerView === 'auto' ? swiper.slidesPerViewDynamic() : params.slidesPerView;
    var slideToIndex = swiper.clickedIndex;
    var realIndex;
    if (params.loop) {
      if (swiper.animating) { return; }
      realIndex = parseInt($(swiper.clickedSlide).attr('data-swiper-slide-index'), 10);
      if (params.centeredSlides) {
        if (
          (slideToIndex < swiper.loopedSlides - (slidesPerView / 2))
          || (slideToIndex > (swiper.slides.length - swiper.loopedSlides) + (slidesPerView / 2))
        ) {
          swiper.loopFix();
          slideToIndex = $wrapperEl
            .children(("." + (params.slideClass) + "[data-swiper-slide-index=\"" + realIndex + "\"]:not(." + (params.slideDuplicateClass) + ")"))
            .eq(0)
            .index();

          Utils.nextTick(function () {
            swiper.slideTo(slideToIndex);
          });
        } else {
          swiper.slideTo(slideToIndex);
        }
      } else if (slideToIndex > swiper.slides.length - slidesPerView) {
        swiper.loopFix();
        slideToIndex = $wrapperEl
          .children(("." + (params.slideClass) + "[data-swiper-slide-index=\"" + realIndex + "\"]:not(." + (params.slideDuplicateClass) + ")"))
          .eq(0)
          .index();

        Utils.nextTick(function () {
          swiper.slideTo(slideToIndex);
        });
      } else {
        swiper.slideTo(slideToIndex);
      }
    } else {
      swiper.slideTo(slideToIndex);
    }
  }

  var slide = {
    slideTo: slideTo,
    slideToLoop: slideToLoop,
    slideNext: slideNext,
    slidePrev: slidePrev,
    slideReset: slideReset,
    slideToClosest: slideToClosest,
    slideToClickedSlide: slideToClickedSlide,
  };

  function loopCreate () {
    var swiper = this;
    var params = swiper.params;
    var $wrapperEl = swiper.$wrapperEl;
    // Remove duplicated slides
    $wrapperEl.children(("." + (params.slideClass) + "." + (params.slideDuplicateClass))).remove();

    var slides = $wrapperEl.children(("." + (params.slideClass)));

    if (params.loopFillGroupWithBlank) {
      var blankSlidesNum = params.slidesPerGroup - (slides.length % params.slidesPerGroup);
      if (blankSlidesNum !== params.slidesPerGroup) {
        for (var i = 0; i < blankSlidesNum; i += 1) {
          var blankNode = $(doc.createElement('div')).addClass(((params.slideClass) + " " + (params.slideBlankClass)));
          $wrapperEl.append(blankNode);
        }
        slides = $wrapperEl.children(("." + (params.slideClass)));
      }
    }

    if (params.slidesPerView === 'auto' && !params.loopedSlides) { params.loopedSlides = slides.length; }

    swiper.loopedSlides = parseInt(params.loopedSlides || params.slidesPerView, 10);
    swiper.loopedSlides += params.loopAdditionalSlides;
    if (swiper.loopedSlides > slides.length) {
      swiper.loopedSlides = slides.length;
    }

    var prependSlides = [];
    var appendSlides = [];
    slides.each(function (index, el) {
      var slide = $(el);
      if (index < swiper.loopedSlides) { appendSlides.push(el); }
      if (index < slides.length && index >= slides.length - swiper.loopedSlides) { prependSlides.push(el); }
      slide.attr('data-swiper-slide-index', index);
    });
    for (var i$1 = 0; i$1 < appendSlides.length; i$1 += 1) {
      $wrapperEl.append($(appendSlides[i$1].cloneNode(true)).addClass(params.slideDuplicateClass));
    }
    for (var i$2 = prependSlides.length - 1; i$2 >= 0; i$2 -= 1) {
      $wrapperEl.prepend($(prependSlides[i$2].cloneNode(true)).addClass(params.slideDuplicateClass));
    }
  }

  function loopFix () {
    var swiper = this;
    var params = swiper.params;
    var activeIndex = swiper.activeIndex;
    var slides = swiper.slides;
    var loopedSlides = swiper.loopedSlides;
    var allowSlidePrev = swiper.allowSlidePrev;
    var allowSlideNext = swiper.allowSlideNext;
    var snapGrid = swiper.snapGrid;
    var rtl = swiper.rtlTranslate;
    var newIndex;
    swiper.allowSlidePrev = true;
    swiper.allowSlideNext = true;

    var snapTranslate = -snapGrid[activeIndex];
    var diff = snapTranslate - swiper.getTranslate();


    // Fix For Negative Oversliding
    if (activeIndex < loopedSlides) {
      newIndex = (slides.length - (loopedSlides * 3)) + activeIndex;
      newIndex += loopedSlides;
      var slideChanged = swiper.slideTo(newIndex, 0, false, true);
      if (slideChanged && diff !== 0) {
        swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
      }
    } else if ((params.slidesPerView === 'auto' && activeIndex >= loopedSlides * 2) || (activeIndex >= slides.length - loopedSlides)) {
      // Fix For Positive Oversliding
      newIndex = -slides.length + activeIndex + loopedSlides;
      newIndex += loopedSlides;
      var slideChanged$1 = swiper.slideTo(newIndex, 0, false, true);
      if (slideChanged$1 && diff !== 0) {
        swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
      }
    }
    swiper.allowSlidePrev = allowSlidePrev;
    swiper.allowSlideNext = allowSlideNext;
  }

  function loopDestroy () {
    var swiper = this;
    var $wrapperEl = swiper.$wrapperEl;
    var params = swiper.params;
    var slides = swiper.slides;
    $wrapperEl.children(("." + (params.slideClass) + "." + (params.slideDuplicateClass))).remove();
    slides.removeAttr('data-swiper-slide-index');
  }

  var loop = {
    loopCreate: loopCreate,
    loopFix: loopFix,
    loopDestroy: loopDestroy,
  };

  function setGrabCursor (moving) {
    var swiper = this;
    if (Support.touch || !swiper.params.simulateTouch || (swiper.params.watchOverflow && swiper.isLocked)) { return; }
    var el = swiper.el;
    el.style.cursor = 'move';
    el.style.cursor = moving ? '-webkit-grabbing' : '-webkit-grab';
    el.style.cursor = moving ? '-moz-grabbin' : '-moz-grab';
    el.style.cursor = moving ? 'grabbing' : 'grab';
  }

  function unsetGrabCursor () {
    var swiper = this;
    if (Support.touch || (swiper.params.watchOverflow && swiper.isLocked)) { return; }
    swiper.el.style.cursor = '';
  }

  var grabCursor = {
    setGrabCursor: setGrabCursor,
    unsetGrabCursor: unsetGrabCursor,
  };

  function appendSlide (slides) {
    var swiper = this;
    var $wrapperEl = swiper.$wrapperEl;
    var params = swiper.params;
    if (params.loop) {
      swiper.loopDestroy();
    }
    if (typeof slides === 'object' && 'length' in slides) {
      for (var i = 0; i < slides.length; i += 1) {
        if (slides[i]) { $wrapperEl.append(slides[i]); }
      }
    } else {
      $wrapperEl.append(slides);
    }
    if (params.loop) {
      swiper.loopCreate();
    }
    if (!(params.observer && Support.observer)) {
      swiper.update();
    }
  }

  function prependSlide (slides) {
    var swiper = this;
    var params = swiper.params;
    var $wrapperEl = swiper.$wrapperEl;
    var activeIndex = swiper.activeIndex;

    if (params.loop) {
      swiper.loopDestroy();
    }
    var newActiveIndex = activeIndex + 1;
    if (typeof slides === 'object' && 'length' in slides) {
      for (var i = 0; i < slides.length; i += 1) {
        if (slides[i]) { $wrapperEl.prepend(slides[i]); }
      }
      newActiveIndex = activeIndex + slides.length;
    } else {
      $wrapperEl.prepend(slides);
    }
    if (params.loop) {
      swiper.loopCreate();
    }
    if (!(params.observer && Support.observer)) {
      swiper.update();
    }
    swiper.slideTo(newActiveIndex, 0, false);
  }

  function addSlide (index, slides) {
    var swiper = this;
    var $wrapperEl = swiper.$wrapperEl;
    var params = swiper.params;
    var activeIndex = swiper.activeIndex;
    var activeIndexBuffer = activeIndex;
    if (params.loop) {
      activeIndexBuffer -= swiper.loopedSlides;
      swiper.loopDestroy();
      swiper.slides = $wrapperEl.children(("." + (params.slideClass)));
    }
    var baseLength = swiper.slides.length;
    if (index <= 0) {
      swiper.prependSlide(slides);
      return;
    }
    if (index >= baseLength) {
      swiper.appendSlide(slides);
      return;
    }
    var newActiveIndex = activeIndexBuffer > index ? activeIndexBuffer + 1 : activeIndexBuffer;

    var slidesBuffer = [];
    for (var i = baseLength - 1; i >= index; i -= 1) {
      var currentSlide = swiper.slides.eq(i);
      currentSlide.remove();
      slidesBuffer.unshift(currentSlide);
    }

    if (typeof slides === 'object' && 'length' in slides) {
      for (var i$1 = 0; i$1 < slides.length; i$1 += 1) {
        if (slides[i$1]) { $wrapperEl.append(slides[i$1]); }
      }
      newActiveIndex = activeIndexBuffer > index ? activeIndexBuffer + slides.length : activeIndexBuffer;
    } else {
      $wrapperEl.append(slides);
    }

    for (var i$2 = 0; i$2 < slidesBuffer.length; i$2 += 1) {
      $wrapperEl.append(slidesBuffer[i$2]);
    }

    if (params.loop) {
      swiper.loopCreate();
    }
    if (!(params.observer && Support.observer)) {
      swiper.update();
    }
    if (params.loop) {
      swiper.slideTo(newActiveIndex + swiper.loopedSlides, 0, false);
    } else {
      swiper.slideTo(newActiveIndex, 0, false);
    }
  }

  function removeSlide (slidesIndexes) {
    var swiper = this;
    var params = swiper.params;
    var $wrapperEl = swiper.$wrapperEl;
    var activeIndex = swiper.activeIndex;

    var activeIndexBuffer = activeIndex;
    if (params.loop) {
      activeIndexBuffer -= swiper.loopedSlides;
      swiper.loopDestroy();
      swiper.slides = $wrapperEl.children(("." + (params.slideClass)));
    }
    var newActiveIndex = activeIndexBuffer;
    var indexToRemove;

    if (typeof slidesIndexes === 'object' && 'length' in slidesIndexes) {
      for (var i = 0; i < slidesIndexes.length; i += 1) {
        indexToRemove = slidesIndexes[i];
        if (swiper.slides[indexToRemove]) { swiper.slides.eq(indexToRemove).remove(); }
        if (indexToRemove < newActiveIndex) { newActiveIndex -= 1; }
      }
      newActiveIndex = Math.max(newActiveIndex, 0);
    } else {
      indexToRemove = slidesIndexes;
      if (swiper.slides[indexToRemove]) { swiper.slides.eq(indexToRemove).remove(); }
      if (indexToRemove < newActiveIndex) { newActiveIndex -= 1; }
      newActiveIndex = Math.max(newActiveIndex, 0);
    }

    if (params.loop) {
      swiper.loopCreate();
    }

    if (!(params.observer && Support.observer)) {
      swiper.update();
    }
    if (params.loop) {
      swiper.slideTo(newActiveIndex + swiper.loopedSlides, 0, false);
    } else {
      swiper.slideTo(newActiveIndex, 0, false);
    }
  }

  function removeAllSlides () {
    var swiper = this;

    var slidesIndexes = [];
    for (var i = 0; i < swiper.slides.length; i += 1) {
      slidesIndexes.push(i);
    }
    swiper.removeSlide(slidesIndexes);
  }

  var manipulation = {
    appendSlide: appendSlide,
    prependSlide: prependSlide,
    addSlide: addSlide,
    removeSlide: removeSlide,
    removeAllSlides: removeAllSlides,
  };

  var Device = (function Device() {
    var ua = win.navigator.userAgent;

    var device = {
      ios: false,
      android: false,
      androidChrome: false,
      desktop: false,
      windows: false,
      iphone: false,
      ipod: false,
      ipad: false,
      cordova: win.cordova || win.phonegap,
      phonegap: win.cordova || win.phonegap,
    };

    var windows = ua.match(/(Windows Phone);?[\s\/]+([\d.]+)?/); // eslint-disable-line
    var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/); // eslint-disable-line
    var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
    var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
    var iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);


    // Windows
    if (windows) {
      device.os = 'windows';
      device.osVersion = windows[2];
      device.windows = true;
    }
    // Android
    if (android && !windows) {
      device.os = 'android';
      device.osVersion = android[2];
      device.android = true;
      device.androidChrome = ua.toLowerCase().indexOf('chrome') >= 0;
    }
    if (ipad || iphone || ipod) {
      device.os = 'ios';
      device.ios = true;
    }
    // iOS
    if (iphone && !ipod) {
      device.osVersion = iphone[2].replace(/_/g, '.');
      device.iphone = true;
    }
    if (ipad) {
      device.osVersion = ipad[2].replace(/_/g, '.');
      device.ipad = true;
    }
    if (ipod) {
      device.osVersion = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
      device.iphone = true;
    }
    // iOS 8+ changed UA
    if (device.ios && device.osVersion && ua.indexOf('Version/') >= 0) {
      if (device.osVersion.split('.')[0] === '10') {
        device.osVersion = ua.toLowerCase().split('version/')[1].split(' ')[0];
      }
    }

    // Desktop
    device.desktop = !(device.os || device.android || device.webView);

    // Webview
    device.webView = (iphone || ipad || ipod) && ua.match(/.*AppleWebKit(?!.*Safari)/i);

    // Minimal UI
    if (device.os && device.os === 'ios') {
      var osVersionArr = device.osVersion.split('.');
      var metaViewport = doc.querySelector('meta[name="viewport"]');
      device.minimalUi = !device.webView
        && (ipod || iphone)
        && (osVersionArr[0] * 1 === 7 ? osVersionArr[1] * 1 >= 1 : osVersionArr[0] * 1 > 7)
        && metaViewport && metaViewport.getAttribute('content').indexOf('minimal-ui') >= 0;
    }

    // Pixel Ratio
    device.pixelRatio = win.devicePixelRatio || 1;

    // Export object
    return device;
  }());

  function onTouchStart (event) {
    var swiper = this;
    var data = swiper.touchEventsData;
    var params = swiper.params;
    var touches = swiper.touches;
    if (swiper.animating && params.preventInteractionOnTransition) {
      return;
    }
    var e = event;
    if (e.originalEvent) { e = e.originalEvent; }
    data.isTouchEvent = e.type === 'touchstart';
    if (!data.isTouchEvent && 'which' in e && e.which === 3) { return; }
    if (!data.isTouchEvent && 'button' in e && e.button > 0) { return; }
    if (data.isTouched && data.isMoved) { return; }
    if (params.noSwiping && $(e.target).closest(params.noSwipingSelector ? params.noSwipingSelector : ("." + (params.noSwipingClass)))[0]) {
      swiper.allowClick = true;
      return;
    }
    if (params.swipeHandler) {
      if (!$(e).closest(params.swipeHandler)[0]) { return; }
    }

    touches.currentX = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
    touches.currentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
    var startX = touches.currentX;
    var startY = touches.currentY;

    // Do NOT start if iOS edge swipe is detected. Otherwise iOS app (UIWebView) cannot swipe-to-go-back anymore

    var edgeSwipeDetection = params.edgeSwipeDetection || params.iOSEdgeSwipeDetection;
    var edgeSwipeThreshold = params.edgeSwipeThreshold || params.iOSEdgeSwipeThreshold;
    if (
      edgeSwipeDetection
      && ((startX <= edgeSwipeThreshold)
        || (startX >= win.screen.width - edgeSwipeThreshold))
    ) {
      return;
    }

    Utils.extend(data, {
      isTouched: true,
      isMoved: false,
      allowTouchCallbacks: true,
      isScrolling: undefined,
      startMoving: undefined,
    });

    touches.startX = startX;
    touches.startY = startY;
    data.touchStartTime = Utils.now();
    swiper.allowClick = true;
    swiper.updateSize();
    swiper.swipeDirection = undefined;
    if (params.threshold > 0) { data.allowThresholdMove = false; }
    if (e.type !== 'touchstart') {
      var preventDefault = true;
      if ($(e.target).is(data.formElements)) { preventDefault = false; }
      if (
        doc.activeElement
        && $(doc.activeElement).is(data.formElements)
        && doc.activeElement !== e.target
      ) {
        doc.activeElement.blur();
      }
      if (preventDefault && swiper.allowTouchMove && params.touchStartPreventDefault) {
        e.preventDefault();
      }
    }
    swiper.emit('touchStart', e);
  }

  function onTouchMove (event) {
    var swiper = this;
    var data = swiper.touchEventsData;
    var params = swiper.params;
    var touches = swiper.touches;
    var rtl = swiper.rtlTranslate;
    var e = event;
    if (e.originalEvent) { e = e.originalEvent; }
    if (!data.isTouched) {
      if (data.startMoving && data.isScrolling) {
        swiper.emit('touchMoveOpposite', e);
      }
      return;
    }
    if (data.isTouchEvent && e.type === 'mousemove') { return; }
    var pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
    var pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
    if (e.preventedByNestedSwiper) {
      touches.startX = pageX;
      touches.startY = pageY;
      return;
    }
    if (!swiper.allowTouchMove) {
      // isMoved = true;
      swiper.allowClick = false;
      if (data.isTouched) {
        Utils.extend(touches, {
          startX: pageX,
          startY: pageY,
          currentX: pageX,
          currentY: pageY,
        });
        data.touchStartTime = Utils.now();
      }
      return;
    }
    if (data.isTouchEvent && params.touchReleaseOnEdges && !params.loop) {
      if (swiper.isVertical()) {
        // Vertical
        if (
          (pageY < touches.startY && swiper.translate <= swiper.maxTranslate())
          || (pageY > touches.startY && swiper.translate >= swiper.minTranslate())
        ) {
          data.isTouched = false;
          data.isMoved = false;
          return;
        }
      } else if (
        (pageX < touches.startX && swiper.translate <= swiper.maxTranslate())
        || (pageX > touches.startX && swiper.translate >= swiper.minTranslate())
      ) {
        return;
      }
    }
    if (data.isTouchEvent && doc.activeElement) {
      if (e.target === doc.activeElement && $(e.target).is(data.formElements)) {
        data.isMoved = true;
        swiper.allowClick = false;
        return;
      }
    }
    if (data.allowTouchCallbacks) {
      swiper.emit('touchMove', e);
    }
    if (e.targetTouches && e.targetTouches.length > 1) { return; }

    touches.currentX = pageX;
    touches.currentY = pageY;

    var diffX = touches.currentX - touches.startX;
    var diffY = touches.currentY - touches.startY;
    if (swiper.params.threshold && Math.sqrt((Math.pow( diffX, 2 )) + (Math.pow( diffY, 2 ))) < swiper.params.threshold) { return; }

    if (typeof data.isScrolling === 'undefined') {
      var touchAngle;
      if ((swiper.isHorizontal() && touches.currentY === touches.startY) || (swiper.isVertical() && touches.currentX === touches.startX)) {
        data.isScrolling = false;
      } else {
        // eslint-disable-next-line
        if ((diffX * diffX) + (diffY * diffY) >= 25) {
          touchAngle = (Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180) / Math.PI;
          data.isScrolling = swiper.isHorizontal() ? touchAngle > params.touchAngle : (90 - touchAngle > params.touchAngle);
        }
      }
    }
    if (data.isScrolling) {
      swiper.emit('touchMoveOpposite', e);
    }
    if (typeof data.startMoving === 'undefined') {
      if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) {
        data.startMoving = true;
      }
    }
    if (data.isScrolling) {
      data.isTouched = false;
      return;
    }
    if (!data.startMoving) {
      return;
    }
    swiper.allowClick = false;
    e.preventDefault();
    if (params.touchMoveStopPropagation && !params.nested) {
      e.stopPropagation();
    }

    if (!data.isMoved) {
      if (params.loop) {
        swiper.loopFix();
      }
      data.startTranslate = swiper.getTranslate();
      swiper.setTransition(0);
      if (swiper.animating) {
        swiper.$wrapperEl.trigger('webkitTransitionEnd transitionend');
      }
      data.allowMomentumBounce = false;
      // Grab Cursor
      if (params.grabCursor && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
        swiper.setGrabCursor(true);
      }
      swiper.emit('sliderFirstMove', e);
    }
    swiper.emit('sliderMove', e);
    data.isMoved = true;

    var diff = swiper.isHorizontal() ? diffX : diffY;
    touches.diff = diff;

    diff *= params.touchRatio;
    if (rtl) { diff = -diff; }

    swiper.swipeDirection = diff > 0 ? 'prev' : 'next';
    data.currentTranslate = diff + data.startTranslate;

    var disableParentSwiper = true;
    var resistanceRatio = params.resistanceRatio;
    if (params.touchReleaseOnEdges) {
      resistanceRatio = 0;
    }
    if ((diff > 0 && data.currentTranslate > swiper.minTranslate())) {
      disableParentSwiper = false;
      if (params.resistance) { data.currentTranslate = (swiper.minTranslate() - 1) + (Math.pow( (-swiper.minTranslate() + data.startTranslate + diff), resistanceRatio )); }
    } else if (diff < 0 && data.currentTranslate < swiper.maxTranslate()) {
      disableParentSwiper = false;
      if (params.resistance) { data.currentTranslate = (swiper.maxTranslate() + 1) - (Math.pow( (swiper.maxTranslate() - data.startTranslate - diff), resistanceRatio )); }
    }

    if (disableParentSwiper) {
      e.preventedByNestedSwiper = true;
    }

    // Directions locks
    if (!swiper.allowSlideNext && swiper.swipeDirection === 'next' && data.currentTranslate < data.startTranslate) {
      data.currentTranslate = data.startTranslate;
    }
    if (!swiper.allowSlidePrev && swiper.swipeDirection === 'prev' && data.currentTranslate > data.startTranslate) {
      data.currentTranslate = data.startTranslate;
    }


    // Threshold
    if (params.threshold > 0) {
      if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
        if (!data.allowThresholdMove) {
          data.allowThresholdMove = true;
          touches.startX = touches.currentX;
          touches.startY = touches.currentY;
          data.currentTranslate = data.startTranslate;
          touches.diff = swiper.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
          return;
        }
      } else {
        data.currentTranslate = data.startTranslate;
        return;
      }
    }

    if (!params.followFinger) { return; }

    // Update active index in free mode
    if (params.freeMode || params.watchSlidesProgress || params.watchSlidesVisibility) {
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    }
    if (params.freeMode) {
      // Velocity
      if (data.velocities.length === 0) {
        data.velocities.push({
          position: touches[swiper.isHorizontal() ? 'startX' : 'startY'],
          time: data.touchStartTime,
        });
      }
      data.velocities.push({
        position: touches[swiper.isHorizontal() ? 'currentX' : 'currentY'],
        time: Utils.now(),
      });
    }
    // Update progress
    swiper.updateProgress(data.currentTranslate);
    // Update translate
    swiper.setTranslate(data.currentTranslate);
  }

  function onTouchEnd (event) {
    var swiper = this;
    var data = swiper.touchEventsData;

    var params = swiper.params;
    var touches = swiper.touches;
    var rtl = swiper.rtlTranslate;
    var $wrapperEl = swiper.$wrapperEl;
    var slidesGrid = swiper.slidesGrid;
    var snapGrid = swiper.snapGrid;
    var e = event;
    if (e.originalEvent) { e = e.originalEvent; }
    if (data.allowTouchCallbacks) {
      swiper.emit('touchEnd', e);
    }
    data.allowTouchCallbacks = false;
    if (!data.isTouched) {
      if (data.isMoved && params.grabCursor) {
        swiper.setGrabCursor(false);
      }
      data.isMoved = false;
      data.startMoving = false;
      return;
    }
    // Return Grab Cursor
    if (params.grabCursor && data.isMoved && data.isTouched && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
      swiper.setGrabCursor(false);
    }

    // Time diff
    var touchEndTime = Utils.now();
    var timeDiff = touchEndTime - data.touchStartTime;

    // Tap, doubleTap, Click
    if (swiper.allowClick) {
      swiper.updateClickedSlide(e);
      swiper.emit('tap', e);
      if (timeDiff < 300 && (touchEndTime - data.lastClickTime) > 300) {
        if (data.clickTimeout) { clearTimeout(data.clickTimeout); }
        data.clickTimeout = Utils.nextTick(function () {
          if (!swiper || swiper.destroyed) { return; }
          swiper.emit('click', e);
        }, 300);
      }
      if (timeDiff < 300 && (touchEndTime - data.lastClickTime) < 300) {
        if (data.clickTimeout) { clearTimeout(data.clickTimeout); }
        swiper.emit('doubleTap', e);
      }
    }

    data.lastClickTime = Utils.now();
    Utils.nextTick(function () {
      if (!swiper.destroyed) { swiper.allowClick = true; }
    });

    if (!data.isTouched || !data.isMoved || !swiper.swipeDirection || touches.diff === 0 || data.currentTranslate === data.startTranslate) {
      data.isTouched = false;
      data.isMoved = false;
      data.startMoving = false;
      return;
    }
    data.isTouched = false;
    data.isMoved = false;
    data.startMoving = false;

    var currentPos;
    if (params.followFinger) {
      currentPos = rtl ? swiper.translate : -swiper.translate;
    } else {
      currentPos = -data.currentTranslate;
    }

    if (params.freeMode) {
      if (currentPos < -swiper.minTranslate()) {
        swiper.slideTo(swiper.activeIndex);
        return;
      }
      if (currentPos > -swiper.maxTranslate()) {
        if (swiper.slides.length < snapGrid.length) {
          swiper.slideTo(snapGrid.length - 1);
        } else {
          swiper.slideTo(swiper.slides.length - 1);
        }
        return;
      }

      if (params.freeModeMomentum) {
        if (data.velocities.length > 1) {
          var lastMoveEvent = data.velocities.pop();
          var velocityEvent = data.velocities.pop();

          var distance = lastMoveEvent.position - velocityEvent.position;
          var time = lastMoveEvent.time - velocityEvent.time;
          swiper.velocity = distance / time;
          swiper.velocity /= 2;
          if (Math.abs(swiper.velocity) < params.freeModeMinimumVelocity) {
            swiper.velocity = 0;
          }
          // this implies that the user stopped moving a finger then released.
          // There would be no events with distance zero, so the last event is stale.
          if (time > 150 || (Utils.now() - lastMoveEvent.time) > 300) {
            swiper.velocity = 0;
          }
        } else {
          swiper.velocity = 0;
        }
        swiper.velocity *= params.freeModeMomentumVelocityRatio;

        data.velocities.length = 0;
        var momentumDuration = 1000 * params.freeModeMomentumRatio;
        var momentumDistance = swiper.velocity * momentumDuration;

        var newPosition = swiper.translate + momentumDistance;
        if (rtl) { newPosition = -newPosition; }

        var doBounce = false;
        var afterBouncePosition;
        var bounceAmount = Math.abs(swiper.velocity) * 20 * params.freeModeMomentumBounceRatio;
        var needsLoopFix;
        if (newPosition < swiper.maxTranslate()) {
          if (params.freeModeMomentumBounce) {
            if (newPosition + swiper.maxTranslate() < -bounceAmount) {
              newPosition = swiper.maxTranslate() - bounceAmount;
            }
            afterBouncePosition = swiper.maxTranslate();
            doBounce = true;
            data.allowMomentumBounce = true;
          } else {
            newPosition = swiper.maxTranslate();
          }
          if (params.loop && params.centeredSlides) { needsLoopFix = true; }
        } else if (newPosition > swiper.minTranslate()) {
          if (params.freeModeMomentumBounce) {
            if (newPosition - swiper.minTranslate() > bounceAmount) {
              newPosition = swiper.minTranslate() + bounceAmount;
            }
            afterBouncePosition = swiper.minTranslate();
            doBounce = true;
            data.allowMomentumBounce = true;
          } else {
            newPosition = swiper.minTranslate();
          }
          if (params.loop && params.centeredSlides) { needsLoopFix = true; }
        } else if (params.freeModeSticky) {
          var nextSlide;
          for (var j = 0; j < snapGrid.length; j += 1) {
            if (snapGrid[j] > -newPosition) {
              nextSlide = j;
              break;
            }
          }

          if (Math.abs(snapGrid[nextSlide] - newPosition) < Math.abs(snapGrid[nextSlide - 1] - newPosition) || swiper.swipeDirection === 'next') {
            newPosition = snapGrid[nextSlide];
          } else {
            newPosition = snapGrid[nextSlide - 1];
          }
          newPosition = -newPosition;
        }
        if (needsLoopFix) {
          swiper.once('transitionEnd', function () {
            swiper.loopFix();
          });
        }
        // Fix duration
        if (swiper.velocity !== 0) {
          if (rtl) {
            momentumDuration = Math.abs((-newPosition - swiper.translate) / swiper.velocity);
          } else {
            momentumDuration = Math.abs((newPosition - swiper.translate) / swiper.velocity);
          }
        } else if (params.freeModeSticky) {
          swiper.slideToClosest();
          return;
        }

        if (params.freeModeMomentumBounce && doBounce) {
          swiper.updateProgress(afterBouncePosition);
          swiper.setTransition(momentumDuration);
          swiper.setTranslate(newPosition);
          swiper.transitionStart(true, swiper.swipeDirection);
          swiper.animating = true;
          $wrapperEl.transitionEnd(function () {
            if (!swiper || swiper.destroyed || !data.allowMomentumBounce) { return; }
            swiper.emit('momentumBounce');

            swiper.setTransition(params.speed);
            swiper.setTranslate(afterBouncePosition);
            $wrapperEl.transitionEnd(function () {
              if (!swiper || swiper.destroyed) { return; }
              swiper.transitionEnd();
            });
          });
        } else if (swiper.velocity) {
          swiper.updateProgress(newPosition);
          swiper.setTransition(momentumDuration);
          swiper.setTranslate(newPosition);
          swiper.transitionStart(true, swiper.swipeDirection);
          if (!swiper.animating) {
            swiper.animating = true;
            $wrapperEl.transitionEnd(function () {
              if (!swiper || swiper.destroyed) { return; }
              swiper.transitionEnd();
            });
          }
        } else {
          swiper.updateProgress(newPosition);
        }

        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
      } else if (params.freeModeSticky) {
        swiper.slideToClosest();
        return;
      }

      if (!params.freeModeMomentum || timeDiff >= params.longSwipesMs) {
        swiper.updateProgress();
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
      }
      return;
    }

    // Find current slide
    var stopIndex = 0;
    var groupSize = swiper.slidesSizesGrid[0];
    for (var i = 0; i < slidesGrid.length; i += params.slidesPerGroup) {
      if (typeof slidesGrid[i + params.slidesPerGroup] !== 'undefined') {
        if (currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + params.slidesPerGroup]) {
          stopIndex = i;
          groupSize = slidesGrid[i + params.slidesPerGroup] - slidesGrid[i];
        }
      } else if (currentPos >= slidesGrid[i]) {
        stopIndex = i;
        groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
      }
    }

    // Find current slide size
    var ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;

    if (timeDiff > params.longSwipesMs) {
      // Long touches
      if (!params.longSwipes) {
        swiper.slideTo(swiper.activeIndex);
        return;
      }
      if (swiper.swipeDirection === 'next') {
        if (ratio >= params.longSwipesRatio) { swiper.slideTo(stopIndex + params.slidesPerGroup); }
        else { swiper.slideTo(stopIndex); }
      }
      if (swiper.swipeDirection === 'prev') {
        if (ratio > (1 - params.longSwipesRatio)) { swiper.slideTo(stopIndex + params.slidesPerGroup); }
        else { swiper.slideTo(stopIndex); }
      }
    } else {
      // Short swipes
      if (!params.shortSwipes) {
        swiper.slideTo(swiper.activeIndex);
        return;
      }
      if (swiper.swipeDirection === 'next') {
        swiper.slideTo(stopIndex + params.slidesPerGroup);
      }
      if (swiper.swipeDirection === 'prev') {
        swiper.slideTo(stopIndex);
      }
    }
  }

  function onResize () {
    var swiper = this;

    var params = swiper.params;
    var el = swiper.el;

    if (el && el.offsetWidth === 0) { return; }

    // Breakpoints
    if (params.breakpoints) {
      swiper.setBreakpoint();
    }

    // Save locks
    var allowSlideNext = swiper.allowSlideNext;
    var allowSlidePrev = swiper.allowSlidePrev;
    var snapGrid = swiper.snapGrid;

    // Disable locks on resize
    swiper.allowSlideNext = true;
    swiper.allowSlidePrev = true;

    swiper.updateSize();
    swiper.updateSlides();

    if (params.freeMode) {
      var newTranslate = Math.min(Math.max(swiper.translate, swiper.maxTranslate()), swiper.minTranslate());
      swiper.setTranslate(newTranslate);
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();

      if (params.autoHeight) {
        swiper.updateAutoHeight();
      }
    } else {
      swiper.updateSlidesClasses();
      if ((params.slidesPerView === 'auto' || params.slidesPerView > 1) && swiper.isEnd && !swiper.params.centeredSlides) {
        swiper.slideTo(swiper.slides.length - 1, 0, false, true);
      } else {
        swiper.slideTo(swiper.activeIndex, 0, false, true);
      }
    }
    // Return locks after resize
    swiper.allowSlidePrev = allowSlidePrev;
    swiper.allowSlideNext = allowSlideNext;

    if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) {
      swiper.checkOverflow();
    }
  }

  function onClick (e) {
    var swiper = this;
    if (!swiper.allowClick) {
      if (swiper.params.preventClicks) { e.preventDefault(); }
      if (swiper.params.preventClicksPropagation && swiper.animating) {
        e.stopPropagation();
        e.stopImmediatePropagation();
      }
    }
  }

  function attachEvents() {
    var swiper = this;
    var params = swiper.params;
    var touchEvents = swiper.touchEvents;
    var el = swiper.el;
    var wrapperEl = swiper.wrapperEl;

    {
      swiper.onTouchStart = onTouchStart.bind(swiper);
      swiper.onTouchMove = onTouchMove.bind(swiper);
      swiper.onTouchEnd = onTouchEnd.bind(swiper);
    }

    swiper.onClick = onClick.bind(swiper);

    var target = params.touchEventsTarget === 'container' ? el : wrapperEl;
    var capture = !!params.nested;

    // Touch Events
    {
      if (!Support.touch && (Support.pointerEvents || Support.prefixedPointerEvents)) {
        target.addEventListener(touchEvents.start, swiper.onTouchStart, false);
        doc.addEventListener(touchEvents.move, swiper.onTouchMove, capture);
        doc.addEventListener(touchEvents.end, swiper.onTouchEnd, false);
      } else {
        if (Support.touch) {
          var passiveListener = touchEvents.start === 'touchstart' && Support.passiveListener && params.passiveListeners ? { passive: true, capture: false } : false;
          target.addEventListener(touchEvents.start, swiper.onTouchStart, passiveListener);
          target.addEventListener(touchEvents.move, swiper.onTouchMove, Support.passiveListener ? { passive: false, capture: capture } : capture);
          target.addEventListener(touchEvents.end, swiper.onTouchEnd, passiveListener);
        }
        if ((params.simulateTouch && !Device.ios && !Device.android) || (params.simulateTouch && !Support.touch && Device.ios)) {
          target.addEventListener('mousedown', swiper.onTouchStart, false);
          doc.addEventListener('mousemove', swiper.onTouchMove, capture);
          doc.addEventListener('mouseup', swiper.onTouchEnd, false);
        }
      }
      // Prevent Links Clicks
      if (params.preventClicks || params.preventClicksPropagation) {
        target.addEventListener('click', swiper.onClick, true);
      }
    }

    // Resize handler
    swiper.on((Device.ios || Device.android ? 'resize orientationchange observerUpdate' : 'resize observerUpdate'), onResize, true);
  }

  function detachEvents() {
    var swiper = this;

    var params = swiper.params;
    var touchEvents = swiper.touchEvents;
    var el = swiper.el;
    var wrapperEl = swiper.wrapperEl;

    var target = params.touchEventsTarget === 'container' ? el : wrapperEl;
    var capture = !!params.nested;

    // Touch Events
    {
      if (!Support.touch && (Support.pointerEvents || Support.prefixedPointerEvents)) {
        target.removeEventListener(touchEvents.start, swiper.onTouchStart, false);
        doc.removeEventListener(touchEvents.move, swiper.onTouchMove, capture);
        doc.removeEventListener(touchEvents.end, swiper.onTouchEnd, false);
      } else {
        if (Support.touch) {
          var passiveListener = touchEvents.start === 'onTouchStart' && Support.passiveListener && params.passiveListeners ? { passive: true, capture: false } : false;
          target.removeEventListener(touchEvents.start, swiper.onTouchStart, passiveListener);
          target.removeEventListener(touchEvents.move, swiper.onTouchMove, capture);
          target.removeEventListener(touchEvents.end, swiper.onTouchEnd, passiveListener);
        }
        if ((params.simulateTouch && !Device.ios && !Device.android) || (params.simulateTouch && !Support.touch && Device.ios)) {
          target.removeEventListener('mousedown', swiper.onTouchStart, false);
          doc.removeEventListener('mousemove', swiper.onTouchMove, capture);
          doc.removeEventListener('mouseup', swiper.onTouchEnd, false);
        }
      }
      // Prevent Links Clicks
      if (params.preventClicks || params.preventClicksPropagation) {
        target.removeEventListener('click', swiper.onClick, true);
      }
    }

    // Resize handler
    swiper.off((Device.ios || Device.android ? 'resize orientationchange observerUpdate' : 'resize observerUpdate'), onResize);
  }

  var events = {
    attachEvents: attachEvents,
    detachEvents: detachEvents,
  };

  function setBreakpoint () {
    var swiper = this;
    var activeIndex = swiper.activeIndex;
    var initialized = swiper.initialized;
    var loopedSlides = swiper.loopedSlides; if ( loopedSlides === void 0 ) loopedSlides = 0;
    var params = swiper.params;
    var breakpoints = params.breakpoints;
    if (!breakpoints || (breakpoints && Object.keys(breakpoints).length === 0)) { return; }
    // Set breakpoint for window width and update parameters
    var breakpoint = swiper.getBreakpoint(breakpoints);
    if (breakpoint && swiper.currentBreakpoint !== breakpoint) {
      var breakPointsParams = breakpoint in breakpoints ? breakpoints[breakpoint] : swiper.originalParams;
      var needsReLoop = params.loop && (breakPointsParams.slidesPerView !== params.slidesPerView);

      Utils.extend(swiper.params, breakPointsParams);

      Utils.extend(swiper, {
        allowTouchMove: swiper.params.allowTouchMove,
        allowSlideNext: swiper.params.allowSlideNext,
        allowSlidePrev: swiper.params.allowSlidePrev,
      });

      swiper.currentBreakpoint = breakpoint;

      if (needsReLoop && initialized) {
        swiper.loopDestroy();
        swiper.loopCreate();
        swiper.updateSlides();
        swiper.slideTo((activeIndex - loopedSlides) + swiper.loopedSlides, 0, false);
      }
      swiper.emit('breakpoint', breakPointsParams);
    }
  }

  function getBreakpoint (breakpoints) {
    var swiper = this;
    // Get breakpoint for window width
    if (!breakpoints) { return undefined; }
    var breakpoint = false;
    var points = [];
    Object.keys(breakpoints).forEach(function (point) {
      points.push(point);
    });
    points.sort(function (a, b) { return parseInt(a, 10) - parseInt(b, 10); });
    for (var i = 0; i < points.length; i += 1) {
      var point = points[i];
      if (swiper.params.breakpointsInverse) {
        if (point <= win.innerWidth) {
          breakpoint = point;
        }
      } else if (point >= win.innerWidth && !breakpoint) {
        breakpoint = point;
      }
    }
    return breakpoint || 'max';
  }

  var breakpoints = { setBreakpoint: setBreakpoint, getBreakpoint: getBreakpoint };

  var Browser = (function Browser() {
    function isSafari() {
      var ua = win.navigator.userAgent.toLowerCase();
      return (ua.indexOf('safari') >= 0 && ua.indexOf('chrome') < 0 && ua.indexOf('android') < 0);
    }
    return {
      isIE: !!win.navigator.userAgent.match(/Trident/g) || !!win.navigator.userAgent.match(/MSIE/g),
      isEdge: !!win.navigator.userAgent.match(/Edge/g),
      isSafari: isSafari(),
      isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(win.navigator.userAgent),
    };
  }());

  function addClasses () {
    var swiper = this;
    var classNames = swiper.classNames;
    var params = swiper.params;
    var rtl = swiper.rtl;
    var $el = swiper.$el;
    var suffixes = [];

    suffixes.push(params.direction);

    if (params.freeMode) {
      suffixes.push('free-mode');
    }
    if (!Support.flexbox) {
      suffixes.push('no-flexbox');
    }
    if (params.autoHeight) {
      suffixes.push('autoheight');
    }
    if (rtl) {
      suffixes.push('rtl');
    }
    if (params.slidesPerColumn > 1) {
      suffixes.push('multirow');
    }
    if (Device.android) {
      suffixes.push('android');
    }
    if (Device.ios) {
      suffixes.push('ios');
    }
    // WP8 Touch Events Fix
    if ((Browser.isIE || Browser.isEdge) && (Support.pointerEvents || Support.prefixedPointerEvents)) {
      suffixes.push(("wp8-" + (params.direction)));
    }

    suffixes.forEach(function (suffix) {
      classNames.push(params.containerModifierClass + suffix);
    });

    $el.addClass(classNames.join(' '));
  }

  function removeClasses () {
    var swiper = this;
    var $el = swiper.$el;
    var classNames = swiper.classNames;

    $el.removeClass(classNames.join(' '));
  }

  var classes = { addClasses: addClasses, removeClasses: removeClasses };

  function loadImage (imageEl, src, srcset, sizes, checkForComplete, callback) {
    var image;
    function onReady() {
      if (callback) { callback(); }
    }
    if (!imageEl.complete || !checkForComplete) {
      if (src) {
        image = new win.Image();
        image.onload = onReady;
        image.onerror = onReady;
        if (sizes) {
          image.sizes = sizes;
        }
        if (srcset) {
          image.srcset = srcset;
        }
        if (src) {
          image.src = src;
        }
      } else {
        onReady();
      }
    } else {
      // image already loaded...
      onReady();
    }
  }

  function preloadImages () {
    var swiper = this;
    swiper.imagesToLoad = swiper.$el.find('img');
    function onReady() {
      if (typeof swiper === 'undefined' || swiper === null || !swiper || swiper.destroyed) { return; }
      if (swiper.imagesLoaded !== undefined) { swiper.imagesLoaded += 1; }
      if (swiper.imagesLoaded === swiper.imagesToLoad.length) {
        if (swiper.params.updateOnImagesReady) { swiper.update(); }
        swiper.emit('imagesReady');
      }
    }
    for (var i = 0; i < swiper.imagesToLoad.length; i += 1) {
      var imageEl = swiper.imagesToLoad[i];
      swiper.loadImage(
        imageEl,
        imageEl.currentSrc || imageEl.getAttribute('src'),
        imageEl.srcset || imageEl.getAttribute('srcset'),
        imageEl.sizes || imageEl.getAttribute('sizes'),
        true,
        onReady
      );
    }
  }

  var images = {
    loadImage: loadImage,
    preloadImages: preloadImages,
  };

  function checkOverflow() {
    var swiper = this;
    var wasLocked = swiper.isLocked;

    swiper.isLocked = swiper.snapGrid.length === 1;
    swiper.allowSlideNext = !swiper.isLocked;
    swiper.allowSlidePrev = !swiper.isLocked;

    // events
    if (wasLocked !== swiper.isLocked) { swiper.emit(swiper.isLocked ? 'lock' : 'unlock'); }

    if (wasLocked && wasLocked !== swiper.isLocked) {
      swiper.isEnd = false;
      swiper.navigation.update();
    }
  }

  var checkOverflow$1 = { checkOverflow: checkOverflow };

  var defaults = {
    init: true,
    direction: 'horizontal',
    touchEventsTarget: 'container',
    initialSlide: 0,
    speed: 300,
    //
    preventInteractionOnTransition: false,

    // To support iOS's swipe-to-go-back gesture (when being used in-app, with UIWebView).
    edgeSwipeDetection: false,
    edgeSwipeThreshold: 20,

    // Free mode
    freeMode: false,
    freeModeMomentum: true,
    freeModeMomentumRatio: 1,
    freeModeMomentumBounce: true,
    freeModeMomentumBounceRatio: 1,
    freeModeMomentumVelocityRatio: 1,
    freeModeSticky: false,
    freeModeMinimumVelocity: 0.02,

    // Autoheight
    autoHeight: false,

    // Set wrapper width
    setWrapperSize: false,

    // Virtual Translate
    virtualTranslate: false,

    // Effects
    effect: 'slide', // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'

    // Breakpoints
    breakpoints: undefined,
    breakpointsInverse: false,

    // Slides grid
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerColumn: 1,
    slidesPerColumnFill: 'column',
    slidesPerGroup: 1,
    centeredSlides: false,
    slidesOffsetBefore: 0, // in px
    slidesOffsetAfter: 0, // in px
    normalizeSlideIndex: true,
    centerInsufficientSlides: false,

    // Disable swiper and hide navigation when container not overflow
    watchOverflow: false,

    // Round length
    roundLengths: false,

    // Touches
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: true,
    shortSwipes: true,
    longSwipes: true,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: true,
    allowTouchMove: true,
    threshold: 0,
    touchMoveStopPropagation: true,
    touchStartPreventDefault: true,
    touchReleaseOnEdges: false,

    // Unique Navigation Elements
    uniqueNavElements: true,

    // Resistance
    resistance: true,
    resistanceRatio: 0.85,

    // Progress
    watchSlidesProgress: false,
    watchSlidesVisibility: false,

    // Cursor
    grabCursor: false,

    // Clicks
    preventClicks: true,
    preventClicksPropagation: true,
    slideToClickedSlide: false,

    // Images
    preloadImages: true,
    updateOnImagesReady: true,

    // loop
    loop: false,
    loopAdditionalSlides: 0,
    loopedSlides: null,
    loopFillGroupWithBlank: false,

    // Swiping/no swiping
    allowSlidePrev: true,
    allowSlideNext: true,
    swipeHandler: null, // '.swipe-handler',
    noSwiping: true,
    noSwipingClass: 'swiper-no-swiping',
    noSwipingSelector: null,

    // Passive Listeners
    passiveListeners: true,

    // NS
    containerModifierClass: 'swiper-container-', // NEW
    slideClass: 'swiper-slide',
    slideBlankClass: 'swiper-slide-invisible-blank',
    slideActiveClass: 'swiper-slide-active',
    slideDuplicateActiveClass: 'swiper-slide-duplicate-active',
    slideVisibleClass: 'swiper-slide-visible',
    slideDuplicateClass: 'swiper-slide-duplicate',
    slideNextClass: 'swiper-slide-next',
    slideDuplicateNextClass: 'swiper-slide-duplicate-next',
    slidePrevClass: 'swiper-slide-prev',
    slideDuplicatePrevClass: 'swiper-slide-duplicate-prev',
    wrapperClass: 'swiper-wrapper',

    // Callbacks
    runCallbacksOnInit: true,
  };

  var prototypes = {
    update: update,
    translate: translate,
    transition: transition$1,
    slide: slide,
    loop: loop,
    grabCursor: grabCursor,
    manipulation: manipulation,
    events: events,
    breakpoints: breakpoints,
    checkOverflow: checkOverflow$1,
    classes: classes,
    images: images,
  };

  var extendedDefaults = {};

  var Swiper = (function (SwiperClass$$1) {
    function Swiper() {
      var assign;

      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];
      var el;
      var params;
      if (args.length === 1 && args[0].constructor && args[0].constructor === Object) {
        params = args[0];
      } else {
        (assign = args, el = assign[0], params = assign[1]);
      }
      if (!params) { params = {}; }

      params = Utils.extend({}, params);
      if (el && !params.el) { params.el = el; }

      SwiperClass$$1.call(this, params);

      Object.keys(prototypes).forEach(function (prototypeGroup) {
        Object.keys(prototypes[prototypeGroup]).forEach(function (protoMethod) {
          if (!Swiper.prototype[protoMethod]) {
            Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
          }
        });
      });

      // Swiper Instance
      var swiper = this;
      if (typeof swiper.modules === 'undefined') {
        swiper.modules = {};
      }
      Object.keys(swiper.modules).forEach(function (moduleName) {
        var module = swiper.modules[moduleName];
        if (module.params) {
          var moduleParamName = Object.keys(module.params)[0];
          var moduleParams = module.params[moduleParamName];
          if (typeof moduleParams !== 'object' || moduleParams === null) { return; }
          if (!(moduleParamName in params && 'enabled' in moduleParams)) { return; }
          if (params[moduleParamName] === true) {
            params[moduleParamName] = { enabled: true };
          }
          if (
            typeof params[moduleParamName] === 'object'
            && !('enabled' in params[moduleParamName])
          ) {
            params[moduleParamName].enabled = true;
          }
          if (!params[moduleParamName]) { params[moduleParamName] = { enabled: false }; }
        }
      });

      // Extend defaults with modules params
      var swiperParams = Utils.extend({}, defaults);
      swiper.useModulesParams(swiperParams);

      // Extend defaults with passed params
      swiper.params = Utils.extend({}, swiperParams, extendedDefaults, params);
      swiper.originalParams = Utils.extend({}, swiper.params);
      swiper.passedParams = Utils.extend({}, params);

      // Save Dom lib
      swiper.$ = $;

      // Find el
      var $el = $(swiper.params.el);
      el = $el[0];

      if (!el) {
        return undefined;
      }

      if ($el.length > 1) {
        var swipers = [];
        $el.each(function (index, containerEl) {
          var newParams = Utils.extend({}, params, { el: containerEl });
          swipers.push(new Swiper(newParams));
        });
        return swipers;
      }

      el.swiper = swiper;
      $el.data('swiper', swiper);

      // Find Wrapper
      var $wrapperEl = $el.children(("." + (swiper.params.wrapperClass)));

      // Extend Swiper
      Utils.extend(swiper, {
        $el: $el,
        el: el,
        $wrapperEl: $wrapperEl,
        wrapperEl: $wrapperEl[0],

        // Classes
        classNames: [],

        // Slides
        slides: $(),
        slidesGrid: [],
        snapGrid: [],
        slidesSizesGrid: [],

        // isDirection
        isHorizontal: function isHorizontal() {
          return swiper.params.direction === 'horizontal';
        },
        isVertical: function isVertical() {
          return swiper.params.direction === 'vertical';
        },
        // RTL
        rtl: (el.dir.toLowerCase() === 'rtl' || $el.css('direction') === 'rtl'),
        rtlTranslate: swiper.params.direction === 'horizontal' && (el.dir.toLowerCase() === 'rtl' || $el.css('direction') === 'rtl'),
        wrongRTL: $wrapperEl.css('display') === '-webkit-box',

        // Indexes
        activeIndex: 0,
        realIndex: 0,

        //
        isBeginning: true,
        isEnd: false,

        // Props
        translate: 0,
        previousTranslate: 0,
        progress: 0,
        velocity: 0,
        animating: false,

        // Locks
        allowSlideNext: swiper.params.allowSlideNext,
        allowSlidePrev: swiper.params.allowSlidePrev,

        // Touch Events
        touchEvents: (function touchEvents() {
          var touch = ['touchstart', 'touchmove', 'touchend'];
          var desktop = ['mousedown', 'mousemove', 'mouseup'];
          if (Support.pointerEvents) {
            desktop = ['pointerdown', 'pointermove', 'pointerup'];
          } else if (Support.prefixedPointerEvents) {
            desktop = ['MSPointerDown', 'MSPointerMove', 'MSPointerUp'];
          }
          swiper.touchEventsTouch = {
            start: touch[0],
            move: touch[1],
            end: touch[2],
          };
          swiper.touchEventsDesktop = {
            start: desktop[0],
            move: desktop[1],
            end: desktop[2],
          };
          return Support.touch || !swiper.params.simulateTouch ? swiper.touchEventsTouch : swiper.touchEventsDesktop;
        }()),
        touchEventsData: {
          isTouched: undefined,
          isMoved: undefined,
          allowTouchCallbacks: undefined,
          touchStartTime: undefined,
          isScrolling: undefined,
          currentTranslate: undefined,
          startTranslate: undefined,
          allowThresholdMove: undefined,
          // Form elements to match
          formElements: 'input, select, option, textarea, button, video',
          // Last click time
          lastClickTime: Utils.now(),
          clickTimeout: undefined,
          // Velocities
          velocities: [],
          allowMomentumBounce: undefined,
          isTouchEvent: undefined,
          startMoving: undefined,
        },

        // Clicks
        allowClick: true,

        // Touches
        allowTouchMove: swiper.params.allowTouchMove,

        touches: {
          startX: 0,
          startY: 0,
          currentX: 0,
          currentY: 0,
          diff: 0,
        },

        // Images
        imagesToLoad: [],
        imagesLoaded: 0,

      });

      // Install Modules
      swiper.useModules();

      // Init
      if (swiper.params.init) {
        swiper.init();
      }

      // Return app instance
      return swiper;
    }

    if ( SwiperClass$$1 ) Swiper.__proto__ = SwiperClass$$1;
    Swiper.prototype = Object.create( SwiperClass$$1 && SwiperClass$$1.prototype );
    Swiper.prototype.constructor = Swiper;

    var staticAccessors = { extendedDefaults: { configurable: true },defaults: { configurable: true },Class: { configurable: true },$: { configurable: true } };

    Swiper.prototype.slidesPerViewDynamic = function slidesPerViewDynamic () {
      var swiper = this;
      var params = swiper.params;
      var slides = swiper.slides;
      var slidesGrid = swiper.slidesGrid;
      var swiperSize = swiper.size;
      var activeIndex = swiper.activeIndex;
      var spv = 1;
      if (params.centeredSlides) {
        var slideSize = slides[activeIndex].swiperSlideSize;
        var breakLoop;
        for (var i = activeIndex + 1; i < slides.length; i += 1) {
          if (slides[i] && !breakLoop) {
            slideSize += slides[i].swiperSlideSize;
            spv += 1;
            if (slideSize > swiperSize) { breakLoop = true; }
          }
        }
        for (var i$1 = activeIndex - 1; i$1 >= 0; i$1 -= 1) {
          if (slides[i$1] && !breakLoop) {
            slideSize += slides[i$1].swiperSlideSize;
            spv += 1;
            if (slideSize > swiperSize) { breakLoop = true; }
          }
        }
      } else {
        for (var i$2 = activeIndex + 1; i$2 < slides.length; i$2 += 1) {
          if (slidesGrid[i$2] - slidesGrid[activeIndex] < swiperSize) {
            spv += 1;
          }
        }
      }
      return spv;
    };

    Swiper.prototype.update = function update$$1 () {
      var swiper = this;
      if (!swiper || swiper.destroyed) { return; }
      var snapGrid = swiper.snapGrid;
      var params = swiper.params;
      // Breakpoints
      if (params.breakpoints) {
        swiper.setBreakpoint();
      }
      swiper.updateSize();
      swiper.updateSlides();
      swiper.updateProgress();
      swiper.updateSlidesClasses();

      function setTranslate() {
        var translateValue = swiper.rtlTranslate ? swiper.translate * -1 : swiper.translate;
        var newTranslate = Math.min(Math.max(translateValue, swiper.maxTranslate()), swiper.minTranslate());
        swiper.setTranslate(newTranslate);
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
      }
      var translated;
      if (swiper.params.freeMode) {
        setTranslate();
        if (swiper.params.autoHeight) {
          swiper.updateAutoHeight();
        }
      } else {
        if ((swiper.params.slidesPerView === 'auto' || swiper.params.slidesPerView > 1) && swiper.isEnd && !swiper.params.centeredSlides) {
          translated = swiper.slideTo(swiper.slides.length - 1, 0, false, true);
        } else {
          translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
        }
        if (!translated) {
          setTranslate();
        }
      }
      if (params.watchOverflow && snapGrid !== swiper.snapGrid) {
        swiper.checkOverflow();
      }
      swiper.emit('update');
    };

    Swiper.prototype.init = function init () {
      var swiper = this;
      if (swiper.initialized) { return; }

      swiper.emit('beforeInit');

      // Set breakpoint
      if (swiper.params.breakpoints) {
        swiper.setBreakpoint();
      }

      // Add Classes
      swiper.addClasses();

      // Create loop
      if (swiper.params.loop) {
        swiper.loopCreate();
      }

      // Update size
      swiper.updateSize();

      // Update slides
      swiper.updateSlides();

      if (swiper.params.watchOverflow) {
        swiper.checkOverflow();
      }

      // Set Grab Cursor
      if (swiper.params.grabCursor) {
        swiper.setGrabCursor();
      }

      if (swiper.params.preloadImages) {
        swiper.preloadImages();
      }

      // Slide To Initial Slide
      if (swiper.params.loop) {
        swiper.slideTo(swiper.params.initialSlide + swiper.loopedSlides, 0, swiper.params.runCallbacksOnInit);
      } else {
        swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit);
      }

      // Attach events
      swiper.attachEvents();

      // Init Flag
      swiper.initialized = true;

      // Emit
      swiper.emit('init');
    };

    Swiper.prototype.destroy = function destroy (deleteInstance, cleanStyles) {
      if ( deleteInstance === void 0 ) deleteInstance = true;
      if ( cleanStyles === void 0 ) cleanStyles = true;

      var swiper = this;
      var params = swiper.params;
      var $el = swiper.$el;
      var $wrapperEl = swiper.$wrapperEl;
      var slides = swiper.slides;

      if (typeof swiper.params === 'undefined' || swiper.destroyed) {
        return null;
      }

      swiper.emit('beforeDestroy');

      // Init Flag
      swiper.initialized = false;

      // Detach events
      swiper.detachEvents();

      // Destroy loop
      if (params.loop) {
        swiper.loopDestroy();
      }

      // Cleanup styles
      if (cleanStyles) {
        swiper.removeClasses();
        $el.removeAttr('style');
        $wrapperEl.removeAttr('style');
        if (slides && slides.length) {
          slides
            .removeClass([
              params.slideVisibleClass,
              params.slideActiveClass,
              params.slideNextClass,
              params.slidePrevClass ].join(' '))
            .removeAttr('style')
            .removeAttr('data-swiper-slide-index')
            .removeAttr('data-swiper-column')
            .removeAttr('data-swiper-row');
        }
      }

      swiper.emit('destroy');

      // Detach emitter events
      Object.keys(swiper.eventsListeners).forEach(function (eventName) {
        swiper.off(eventName);
      });

      if (deleteInstance !== false) {
        swiper.$el[0].swiper = null;
        swiper.$el.data('swiper', null);
        Utils.deleteProps(swiper);
      }
      swiper.destroyed = true;

      return null;
    };

    Swiper.extendDefaults = function extendDefaults (newDefaults) {
      Utils.extend(extendedDefaults, newDefaults);
    };

    staticAccessors.extendedDefaults.get = function () {
      return extendedDefaults;
    };

    staticAccessors.defaults.get = function () {
      return defaults;
    };

    staticAccessors.Class.get = function () {
      return SwiperClass$$1;
    };

    staticAccessors.$.get = function () {
      return $;
    };

    Object.defineProperties( Swiper, staticAccessors );

    return Swiper;
  }(SwiperClass));

  var Device$1 = {
    name: 'device',
    proto: {
      device: Device,
    },
    static: {
      device: Device,
    },
  };

  var Support$1 = {
    name: 'support',
    proto: {
      support: Support,
    },
    static: {
      support: Support,
    },
  };

  var Browser$1 = {
    name: 'browser',
    proto: {
      browser: Browser,
    },
    static: {
      browser: Browser,
    },
  };

  var Resize = {
    name: 'resize',
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        resize: {
          resizeHandler: function resizeHandler() {
            if (!swiper || swiper.destroyed || !swiper.initialized) { return; }
            swiper.emit('beforeResize');
            swiper.emit('resize');
          },
          orientationChangeHandler: function orientationChangeHandler() {
            if (!swiper || swiper.destroyed || !swiper.initialized) { return; }
            swiper.emit('orientationchange');
          },
        },
      });
    },
    on: {
      init: function init() {
        var swiper = this;
        // Emit resize
        win.addEventListener('resize', swiper.resize.resizeHandler);

        // Emit orientationchange
        win.addEventListener('orientationchange', swiper.resize.orientationChangeHandler);
      },
      destroy: function destroy() {
        var swiper = this;
        win.removeEventListener('resize', swiper.resize.resizeHandler);
        win.removeEventListener('orientationchange', swiper.resize.orientationChangeHandler);
      },
    },
  };

  var Observer = {
    func: win.MutationObserver || win.WebkitMutationObserver,
    attach: function attach(target, options) {
      if ( options === void 0 ) options = {};

      var swiper = this;

      var ObserverFunc = Observer.func;
      var observer = new ObserverFunc(function (mutations) {
        // The observerUpdate event should only be triggered
        // once despite the number of mutations.  Additional
        // triggers are redundant and are very costly
        if (mutations.length === 1) {
          swiper.emit('observerUpdate', mutations[0]);
          return;
        }
        var observerUpdate = function observerUpdate() {
          swiper.emit('observerUpdate', mutations[0]);
        };

        if (win.requestAnimationFrame) {
          win.requestAnimationFrame(observerUpdate);
        } else {
          win.setTimeout(observerUpdate, 0);
        }
      });

      observer.observe(target, {
        attributes: typeof options.attributes === 'undefined' ? true : options.attributes,
        childList: typeof options.childList === 'undefined' ? true : options.childList,
        characterData: typeof options.characterData === 'undefined' ? true : options.characterData,
      });

      swiper.observer.observers.push(observer);
    },
    init: function init() {
      var swiper = this;
      if (!Support.observer || !swiper.params.observer) { return; }
      if (swiper.params.observeParents) {
        var containerParents = swiper.$el.parents();
        for (var i = 0; i < containerParents.length; i += 1) {
          swiper.observer.attach(containerParents[i]);
        }
      }
      // Observe container
      swiper.observer.attach(swiper.$el[0], { childList: false });

      // Observe wrapper
      swiper.observer.attach(swiper.$wrapperEl[0], { attributes: false });
    },
    destroy: function destroy() {
      var swiper = this;
      swiper.observer.observers.forEach(function (observer) {
        observer.disconnect();
      });
      swiper.observer.observers = [];
    },
  };

  var Observer$1 = {
    name: 'observer',
    params: {
      observer: false,
      observeParents: false,
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        observer: {
          init: Observer.init.bind(swiper),
          attach: Observer.attach.bind(swiper),
          destroy: Observer.destroy.bind(swiper),
          observers: [],
        },
      });
    },
    on: {
      init: function init() {
        var swiper = this;
        swiper.observer.init();
      },
      destroy: function destroy() {
        var swiper = this;
        swiper.observer.destroy();
      },
    },
  };

  var Virtual = {
    update: function update(force) {
      var swiper = this;
      var ref = swiper.params;
      var slidesPerView = ref.slidesPerView;
      var slidesPerGroup = ref.slidesPerGroup;
      var centeredSlides = ref.centeredSlides;
      var ref$1 = swiper.params.virtual;
      var addSlidesBefore = ref$1.addSlidesBefore;
      var addSlidesAfter = ref$1.addSlidesAfter;
      var ref$2 = swiper.virtual;
      var previousFrom = ref$2.from;
      var previousTo = ref$2.to;
      var slides = ref$2.slides;
      var previousSlidesGrid = ref$2.slidesGrid;
      var renderSlide = ref$2.renderSlide;
      var previousOffset = ref$2.offset;
      swiper.updateActiveIndex();
      var activeIndex = swiper.activeIndex || 0;

      var offsetProp;
      if (swiper.rtlTranslate) { offsetProp = 'right'; }
      else { offsetProp = swiper.isHorizontal() ? 'left' : 'top'; }

      var slidesAfter;
      var slidesBefore;
      if (centeredSlides) {
        slidesAfter = Math.floor(slidesPerView / 2) + slidesPerGroup + addSlidesBefore;
        slidesBefore = Math.floor(slidesPerView / 2) + slidesPerGroup + addSlidesAfter;
      } else {
        slidesAfter = slidesPerView + (slidesPerGroup - 1) + addSlidesBefore;
        slidesBefore = slidesPerGroup + addSlidesAfter;
      }
      var from = Math.max((activeIndex || 0) - slidesBefore, 0);
      var to = Math.min((activeIndex || 0) + slidesAfter, slides.length - 1);
      var offset = (swiper.slidesGrid[from] || 0) - (swiper.slidesGrid[0] || 0);

      Utils.extend(swiper.virtual, {
        from: from,
        to: to,
        offset: offset,
        slidesGrid: swiper.slidesGrid,
      });

      function onRendered() {
        swiper.updateSlides();
        swiper.updateProgress();
        swiper.updateSlidesClasses();
        if (swiper.lazy && swiper.params.lazy.enabled) {
          swiper.lazy.load();
        }
      }

      if (previousFrom === from && previousTo === to && !force) {
        if (swiper.slidesGrid !== previousSlidesGrid && offset !== previousOffset) {
          swiper.slides.css(offsetProp, (offset + "px"));
        }
        swiper.updateProgress();
        return;
      }
      if (swiper.params.virtual.renderExternal) {
        swiper.params.virtual.renderExternal.call(swiper, {
          offset: offset,
          from: from,
          to: to,
          slides: (function getSlides() {
            var slidesToRender = [];
            for (var i = from; i <= to; i += 1) {
              slidesToRender.push(slides[i]);
            }
            return slidesToRender;
          }()),
        });
        onRendered();
        return;
      }
      var prependIndexes = [];
      var appendIndexes = [];
      if (force) {
        swiper.$wrapperEl.find(("." + (swiper.params.slideClass))).remove();
      } else {
        for (var i = previousFrom; i <= previousTo; i += 1) {
          if (i < from || i > to) {
            swiper.$wrapperEl.find(("." + (swiper.params.slideClass) + "[data-swiper-slide-index=\"" + i + "\"]")).remove();
          }
        }
      }
      for (var i$1 = 0; i$1 < slides.length; i$1 += 1) {
        if (i$1 >= from && i$1 <= to) {
          if (typeof previousTo === 'undefined' || force) {
            appendIndexes.push(i$1);
          } else {
            if (i$1 > previousTo) { appendIndexes.push(i$1); }
            if (i$1 < previousFrom) { prependIndexes.push(i$1); }
          }
        }
      }
      appendIndexes.forEach(function (index) {
        swiper.$wrapperEl.append(renderSlide(slides[index], index));
      });
      prependIndexes.sort(function (a, b) { return a < b; }).forEach(function (index) {
        swiper.$wrapperEl.prepend(renderSlide(slides[index], index));
      });
      swiper.$wrapperEl.children('.swiper-slide').css(offsetProp, (offset + "px"));
      onRendered();
    },
    renderSlide: function renderSlide(slide, index) {
      var swiper = this;
      var params = swiper.params.virtual;
      if (params.cache && swiper.virtual.cache[index]) {
        return swiper.virtual.cache[index];
      }
      var $slideEl = params.renderSlide
        ? $(params.renderSlide.call(swiper, slide, index))
        : $(("<div class=\"" + (swiper.params.slideClass) + "\" data-swiper-slide-index=\"" + index + "\">" + slide + "</div>"));
      if (!$slideEl.attr('data-swiper-slide-index')) { $slideEl.attr('data-swiper-slide-index', index); }
      if (params.cache) { swiper.virtual.cache[index] = $slideEl; }
      return $slideEl;
    },
    appendSlide: function appendSlide(slide) {
      var swiper = this;
      swiper.virtual.slides.push(slide);
      swiper.virtual.update(true);
    },
    prependSlide: function prependSlide(slide) {
      var swiper = this;
      swiper.virtual.slides.unshift(slide);
      if (swiper.params.virtual.cache) {
        var cache = swiper.virtual.cache;
        var newCache = {};
        Object.keys(cache).forEach(function (cachedIndex) {
          newCache[cachedIndex + 1] = cache[cachedIndex];
        });
        swiper.virtual.cache = newCache;
      }
      swiper.virtual.update(true);
      swiper.slideNext(0);
    },
  };

  var Virtual$1 = {
    name: 'virtual',
    params: {
      virtual: {
        enabled: false,
        slides: [],
        cache: true,
        renderSlide: null,
        renderExternal: null,
        addSlidesBefore: 0,
        addSlidesAfter: 0,
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        virtual: {
          update: Virtual.update.bind(swiper),
          appendSlide: Virtual.appendSlide.bind(swiper),
          prependSlide: Virtual.prependSlide.bind(swiper),
          renderSlide: Virtual.renderSlide.bind(swiper),
          slides: swiper.params.virtual.slides,
          cache: {},
        },
      });
    },
    on: {
      beforeInit: function beforeInit() {
        var swiper = this;
        if (!swiper.params.virtual.enabled) { return; }
        swiper.classNames.push(((swiper.params.containerModifierClass) + "virtual"));
        var overwriteParams = {
          watchSlidesProgress: true,
        };
        Utils.extend(swiper.params, overwriteParams);
        Utils.extend(swiper.originalParams, overwriteParams);

        swiper.virtual.update();
      },
      setTranslate: function setTranslate() {
        var swiper = this;
        if (!swiper.params.virtual.enabled) { return; }
        swiper.virtual.update();
      },
    },
  };

  var Keyboard = {
    handle: function handle(event) {
      var swiper = this;
      var rtl = swiper.rtlTranslate;
      var e = event;
      if (e.originalEvent) { e = e.originalEvent; } // jquery fix
      var kc = e.keyCode || e.charCode;
      // Directions locks
      if (!swiper.allowSlideNext && ((swiper.isHorizontal() && kc === 39) || (swiper.isVertical() && kc === 40))) {
        return false;
      }
      if (!swiper.allowSlidePrev && ((swiper.isHorizontal() && kc === 37) || (swiper.isVertical() && kc === 38))) {
        return false;
      }
      if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
        return undefined;
      }
      if (doc.activeElement && doc.activeElement.nodeName && (doc.activeElement.nodeName.toLowerCase() === 'input' || doc.activeElement.nodeName.toLowerCase() === 'textarea')) {
        return undefined;
      }
      if (swiper.params.keyboard.onlyInViewport && (kc === 37 || kc === 39 || kc === 38 || kc === 40)) {
        var inView = false;
        // Check that swiper should be inside of visible area of window
        if (swiper.$el.parents(("." + (swiper.params.slideClass))).length > 0 && swiper.$el.parents(("." + (swiper.params.slideActiveClass))).length === 0) {
          return undefined;
        }
        var windowWidth = win.innerWidth;
        var windowHeight = win.innerHeight;
        var swiperOffset = swiper.$el.offset();
        if (rtl) { swiperOffset.left -= swiper.$el[0].scrollLeft; }
        var swiperCoord = [
          [swiperOffset.left, swiperOffset.top],
          [swiperOffset.left + swiper.width, swiperOffset.top],
          [swiperOffset.left, swiperOffset.top + swiper.height],
          [swiperOffset.left + swiper.width, swiperOffset.top + swiper.height] ];
        for (var i = 0; i < swiperCoord.length; i += 1) {
          var point = swiperCoord[i];
          if (
            point[0] >= 0 && point[0] <= windowWidth
            && point[1] >= 0 && point[1] <= windowHeight
          ) {
            inView = true;
          }
        }
        if (!inView) { return undefined; }
      }
      if (swiper.isHorizontal()) {
        if (kc === 37 || kc === 39) {
          if (e.preventDefault) { e.preventDefault(); }
          else { e.returnValue = false; }
        }
        if ((kc === 39 && !rtl) || (kc === 37 && rtl)) { swiper.slideNext(); }
        if ((kc === 37 && !rtl) || (kc === 39 && rtl)) { swiper.slidePrev(); }
      } else {
        if (kc === 38 || kc === 40) {
          if (e.preventDefault) { e.preventDefault(); }
          else { e.returnValue = false; }
        }
        if (kc === 40) { swiper.slideNext(); }
        if (kc === 38) { swiper.slidePrev(); }
      }
      swiper.emit('keyPress', kc);
      return undefined;
    },
    enable: function enable() {
      var swiper = this;
      if (swiper.keyboard.enabled) { return; }
      $(doc).on('keydown', swiper.keyboard.handle);
      swiper.keyboard.enabled = true;
    },
    disable: function disable() {
      var swiper = this;
      if (!swiper.keyboard.enabled) { return; }
      $(doc).off('keydown', swiper.keyboard.handle);
      swiper.keyboard.enabled = false;
    },
  };

  var Keyboard$1 = {
    name: 'keyboard',
    params: {
      keyboard: {
        enabled: false,
        onlyInViewport: true,
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        keyboard: {
          enabled: false,
          enable: Keyboard.enable.bind(swiper),
          disable: Keyboard.disable.bind(swiper),
          handle: Keyboard.handle.bind(swiper),
        },
      });
    },
    on: {
      init: function init() {
        var swiper = this;
        if (swiper.params.keyboard.enabled) {
          swiper.keyboard.enable();
        }
      },
      destroy: function destroy() {
        var swiper = this;
        if (swiper.keyboard.enabled) {
          swiper.keyboard.disable();
        }
      },
    },
  };

  function isEventSupported() {
    var eventName = 'onwheel';
    var isSupported = eventName in doc;

    if (!isSupported) {
      var element = doc.createElement('div');
      element.setAttribute(eventName, 'return;');
      isSupported = typeof element[eventName] === 'function';
    }

    if (!isSupported
      && doc.implementation
      && doc.implementation.hasFeature
      // always returns true in newer browsers as per the standard.
      // @see http://dom.spec.whatwg.org/#dom-domimplementation-hasfeature
      && doc.implementation.hasFeature('', '') !== true
    ) {
      // This is the only way to test support for the `wheel` event in IE9+.
      isSupported = doc.implementation.hasFeature('Events.wheel', '3.0');
    }

    return isSupported;
  }
  var Mousewheel = {
    lastScrollTime: Utils.now(),
    event: (function getEvent() {
      if (win.navigator.userAgent.indexOf('firefox') > -1) { return 'DOMMouseScroll'; }
      return isEventSupported() ? 'wheel' : 'mousewheel';
    }()),
    normalize: function normalize(e) {
      // Reasonable defaults
      var PIXEL_STEP = 10;
      var LINE_HEIGHT = 40;
      var PAGE_HEIGHT = 800;

      var sX = 0;
      var sY = 0; // spinX, spinY
      var pX = 0;
      var pY = 0; // pixelX, pixelY

      // Legacy
      if ('detail' in e) {
        sY = e.detail;
      }
      if ('wheelDelta' in e) {
        sY = -e.wheelDelta / 120;
      }
      if ('wheelDeltaY' in e) {
        sY = -e.wheelDeltaY / 120;
      }
      if ('wheelDeltaX' in e) {
        sX = -e.wheelDeltaX / 120;
      }

      // side scrolling on FF with DOMMouseScroll
      if ('axis' in e && e.axis === e.HORIZONTAL_AXIS) {
        sX = sY;
        sY = 0;
      }

      pX = sX * PIXEL_STEP;
      pY = sY * PIXEL_STEP;

      if ('deltaY' in e) {
        pY = e.deltaY;
      }
      if ('deltaX' in e) {
        pX = e.deltaX;
      }

      if ((pX || pY) && e.deltaMode) {
        if (e.deltaMode === 1) { // delta in LINE units
          pX *= LINE_HEIGHT;
          pY *= LINE_HEIGHT;
        } else { // delta in PAGE units
          pX *= PAGE_HEIGHT;
          pY *= PAGE_HEIGHT;
        }
      }

      // Fall-back if spin cannot be determined
      if (pX && !sX) {
        sX = (pX < 1) ? -1 : 1;
      }
      if (pY && !sY) {
        sY = (pY < 1) ? -1 : 1;
      }

      return {
        spinX: sX,
        spinY: sY,
        pixelX: pX,
        pixelY: pY,
      };
    },
    handleMouseEnter: function handleMouseEnter() {
      var swiper = this;
      swiper.mouseEntered = true;
    },
    handleMouseLeave: function handleMouseLeave() {
      var swiper = this;
      swiper.mouseEntered = false;
    },
    handle: function handle(event) {
      var e = event;
      var swiper = this;
      var params = swiper.params.mousewheel;

      if (!swiper.mouseEntered && !params.releaseOnEdges) { return true; }

      if (e.originalEvent) { e = e.originalEvent; } // jquery fix
      var delta = 0;
      var rtlFactor = swiper.rtlTranslate ? -1 : 1;

      var data = Mousewheel.normalize(e);

      if (params.forceToAxis) {
        if (swiper.isHorizontal()) {
          if (Math.abs(data.pixelX) > Math.abs(data.pixelY)) { delta = data.pixelX * rtlFactor; }
          else { return true; }
        } else if (Math.abs(data.pixelY) > Math.abs(data.pixelX)) { delta = data.pixelY; }
        else { return true; }
      } else {
        delta = Math.abs(data.pixelX) > Math.abs(data.pixelY) ? -data.pixelX * rtlFactor : -data.pixelY;
      }

      if (delta === 0) { return true; }

      if (params.invert) { delta = -delta; }

      if (!swiper.params.freeMode) {
        if (Utils.now() - swiper.mousewheel.lastScrollTime > 60) {
          if (delta < 0) {
            if ((!swiper.isEnd || swiper.params.loop) && !swiper.animating) {
              swiper.slideNext();
              swiper.emit('scroll', e);
            } else if (params.releaseOnEdges) { return true; }
          } else if ((!swiper.isBeginning || swiper.params.loop) && !swiper.animating) {
            swiper.slidePrev();
            swiper.emit('scroll', e);
          } else if (params.releaseOnEdges) { return true; }
        }
        swiper.mousewheel.lastScrollTime = (new win.Date()).getTime();
      } else {
        // Freemode or scrollContainer:
        if (swiper.params.loop) {
          swiper.loopFix();
        }
        var position = swiper.getTranslate() + (delta * params.sensitivity);
        var wasBeginning = swiper.isBeginning;
        var wasEnd = swiper.isEnd;

        if (position >= swiper.minTranslate()) { position = swiper.minTranslate(); }
        if (position <= swiper.maxTranslate()) { position = swiper.maxTranslate(); }

        swiper.setTransition(0);
        swiper.setTranslate(position);
        swiper.updateProgress();
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();

        if ((!wasBeginning && swiper.isBeginning) || (!wasEnd && swiper.isEnd)) {
          swiper.updateSlidesClasses();
        }

        if (swiper.params.freeModeSticky) {
          clearTimeout(swiper.mousewheel.timeout);
          swiper.mousewheel.timeout = Utils.nextTick(function () {
            swiper.slideToClosest();
          }, 300);
        }
        // Emit event
        swiper.emit('scroll', e);

        // Stop autoplay
        if (swiper.params.autoplay && swiper.params.autoplayDisableOnInteraction) { swiper.autoplay.stop(); }
        // Return page scroll on edge positions
        if (position === swiper.minTranslate() || position === swiper.maxTranslate()) { return true; }
      }

      if (e.preventDefault) { e.preventDefault(); }
      else { e.returnValue = false; }
      return false;
    },
    enable: function enable() {
      var swiper = this;
      if (!Mousewheel.event) { return false; }
      if (swiper.mousewheel.enabled) { return false; }
      var target = swiper.$el;
      if (swiper.params.mousewheel.eventsTarged !== 'container') {
        target = $(swiper.params.mousewheel.eventsTarged);
      }
      target.on('mouseenter', swiper.mousewheel.handleMouseEnter);
      target.on('mouseleave', swiper.mousewheel.handleMouseLeave);
      target.on(Mousewheel.event, swiper.mousewheel.handle);
      swiper.mousewheel.enabled = true;
      return true;
    },
    disable: function disable() {
      var swiper = this;
      if (!Mousewheel.event) { return false; }
      if (!swiper.mousewheel.enabled) { return false; }
      var target = swiper.$el;
      if (swiper.params.mousewheel.eventsTarged !== 'container') {
        target = $(swiper.params.mousewheel.eventsTarged);
      }
      target.off(Mousewheel.event, swiper.mousewheel.handle);
      swiper.mousewheel.enabled = false;
      return true;
    },
  };

  var Mousewheel$1 = {
    name: 'mousewheel',
    params: {
      mousewheel: {
        enabled: false,
        releaseOnEdges: false,
        invert: false,
        forceToAxis: false,
        sensitivity: 1,
        eventsTarged: 'container',
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        mousewheel: {
          enabled: false,
          enable: Mousewheel.enable.bind(swiper),
          disable: Mousewheel.disable.bind(swiper),
          handle: Mousewheel.handle.bind(swiper),
          handleMouseEnter: Mousewheel.handleMouseEnter.bind(swiper),
          handleMouseLeave: Mousewheel.handleMouseLeave.bind(swiper),
          lastScrollTime: Utils.now(),
        },
      });
    },
    on: {
      init: function init() {
        var swiper = this;
        if (swiper.params.mousewheel.enabled) { swiper.mousewheel.enable(); }
      },
      destroy: function destroy() {
        var swiper = this;
        if (swiper.mousewheel.enabled) { swiper.mousewheel.disable(); }
      },
    },
  };

  var Navigation = {
    update: function update() {
      // Update Navigation Buttons
      var swiper = this;
      var params = swiper.params.navigation;

      if (swiper.params.loop) { return; }
      var ref = swiper.navigation;
      var $nextEl = ref.$nextEl;
      var $prevEl = ref.$prevEl;

      if ($prevEl && $prevEl.length > 0) {
        if (swiper.isBeginning) {
          $prevEl.addClass(params.disabledClass);
        } else {
          $prevEl.removeClass(params.disabledClass);
        }
        $prevEl[swiper.params.watchOverflow && swiper.isLocked ? 'addClass' : 'removeClass'](params.lockClass);
      }
      if ($nextEl && $nextEl.length > 0) {
        if (swiper.isEnd) {
          $nextEl.addClass(params.disabledClass);
        } else {
          $nextEl.removeClass(params.disabledClass);
        }
        $nextEl[swiper.params.watchOverflow && swiper.isLocked ? 'addClass' : 'removeClass'](params.lockClass);
      }
    },
    init: function init() {
      var swiper = this;
      var params = swiper.params.navigation;
      if (!(params.nextEl || params.prevEl)) { return; }

      var $nextEl;
      var $prevEl;
      if (params.nextEl) {
        $nextEl = $(params.nextEl);
        if (
          swiper.params.uniqueNavElements
          && typeof params.nextEl === 'string'
          && $nextEl.length > 1
          && swiper.$el.find(params.nextEl).length === 1
        ) {
          $nextEl = swiper.$el.find(params.nextEl);
        }
      }
      if (params.prevEl) {
        $prevEl = $(params.prevEl);
        if (
          swiper.params.uniqueNavElements
          && typeof params.prevEl === 'string'
          && $prevEl.length > 1
          && swiper.$el.find(params.prevEl).length === 1
        ) {
          $prevEl = swiper.$el.find(params.prevEl);
        }
      }

      if ($nextEl && $nextEl.length > 0) {
        $nextEl.on('click', function (e) {
          e.preventDefault();
          if (swiper.isEnd && !swiper.params.loop) { return; }
          swiper.slideNext();
        });
      }
      if ($prevEl && $prevEl.length > 0) {
        $prevEl.on('click', function (e) {
          e.preventDefault();
          if (swiper.isBeginning && !swiper.params.loop) { return; }
          swiper.slidePrev();
        });
      }

      Utils.extend(swiper.navigation, {
        $nextEl: $nextEl,
        nextEl: $nextEl && $nextEl[0],
        $prevEl: $prevEl,
        prevEl: $prevEl && $prevEl[0],
      });
    },
    destroy: function destroy() {
      var swiper = this;
      var ref = swiper.navigation;
      var $nextEl = ref.$nextEl;
      var $prevEl = ref.$prevEl;
      if ($nextEl && $nextEl.length) {
        $nextEl.off('click');
        $nextEl.removeClass(swiper.params.navigation.disabledClass);
      }
      if ($prevEl && $prevEl.length) {
        $prevEl.off('click');
        $prevEl.removeClass(swiper.params.navigation.disabledClass);
      }
    },
  };

  var Navigation$1 = {
    name: 'navigation',
    params: {
      navigation: {
        nextEl: null,
        prevEl: null,

        hideOnClick: false,
        disabledClass: 'swiper-button-disabled',
        hiddenClass: 'swiper-button-hidden',
        lockClass: 'swiper-button-lock',
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        navigation: {
          init: Navigation.init.bind(swiper),
          update: Navigation.update.bind(swiper),
          destroy: Navigation.destroy.bind(swiper),
        },
      });
    },
    on: {
      init: function init() {
        var swiper = this;
        swiper.navigation.init();
        swiper.navigation.update();
      },
      toEdge: function toEdge() {
        var swiper = this;
        swiper.navigation.update();
      },
      fromEdge: function fromEdge() {
        var swiper = this;
        swiper.navigation.update();
      },
      destroy: function destroy() {
        var swiper = this;
        swiper.navigation.destroy();
      },
      click: function click(e) {
        var swiper = this;
        var ref = swiper.navigation;
        var $nextEl = ref.$nextEl;
        var $prevEl = ref.$prevEl;
        if (
          swiper.params.navigation.hideOnClick
          && !$(e.target).is($prevEl)
          && !$(e.target).is($nextEl)
        ) {
          if ($nextEl) { $nextEl.toggleClass(swiper.params.navigation.hiddenClass); }
          if ($prevEl) { $prevEl.toggleClass(swiper.params.navigation.hiddenClass); }
        }
      },
    },
  };

  var Pagination = {
    update: function update() {
      // Render || Update Pagination bullets/items
      var swiper = this;
      var rtl = swiper.rtl;
      var params = swiper.params.pagination;
      if (!params.el || !swiper.pagination.el || !swiper.pagination.$el || swiper.pagination.$el.length === 0) { return; }
      var slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
      var $el = swiper.pagination.$el;
      // Current/Total
      var current;
      var total = swiper.params.loop ? Math.ceil((slidesLength - (swiper.loopedSlides * 2)) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
      if (swiper.params.loop) {
        current = Math.ceil((swiper.activeIndex - swiper.loopedSlides) / swiper.params.slidesPerGroup);
        if (current > slidesLength - 1 - (swiper.loopedSlides * 2)) {
          current -= (slidesLength - (swiper.loopedSlides * 2));
        }
        if (current > total - 1) { current -= total; }
        if (current < 0 && swiper.params.paginationType !== 'bullets') { current = total + current; }
      } else if (typeof swiper.snapIndex !== 'undefined') {
        current = swiper.snapIndex;
      } else {
        current = swiper.activeIndex || 0;
      }
      // Types
      if (params.type === 'bullets' && swiper.pagination.bullets && swiper.pagination.bullets.length > 0) {
        var bullets = swiper.pagination.bullets;
        var firstIndex;
        var lastIndex;
        var midIndex;
        if (params.dynamicBullets) {
          swiper.pagination.bulletSize = bullets.eq(0)[swiper.isHorizontal() ? 'outerWidth' : 'outerHeight'](true);
          $el.css(swiper.isHorizontal() ? 'width' : 'height', ((swiper.pagination.bulletSize * (params.dynamicMainBullets + 4)) + "px"));
          if (params.dynamicMainBullets > 1 && swiper.previousIndex !== undefined) {
            swiper.pagination.dynamicBulletIndex += (current - swiper.previousIndex);
            if (swiper.pagination.dynamicBulletIndex > (params.dynamicMainBullets - 1)) {
              swiper.pagination.dynamicBulletIndex = params.dynamicMainBullets - 1;
            } else if (swiper.pagination.dynamicBulletIndex < 0) {
              swiper.pagination.dynamicBulletIndex = 0;
            }
          }
          firstIndex = current - swiper.pagination.dynamicBulletIndex;
          lastIndex = firstIndex + (Math.min(bullets.length, params.dynamicMainBullets) - 1);
          midIndex = (lastIndex + firstIndex) / 2;
        }
        bullets.removeClass(((params.bulletActiveClass) + " " + (params.bulletActiveClass) + "-next " + (params.bulletActiveClass) + "-next-next " + (params.bulletActiveClass) + "-prev " + (params.bulletActiveClass) + "-prev-prev " + (params.bulletActiveClass) + "-main"));
        if ($el.length > 1) {
          bullets.each(function (index, bullet) {
            var $bullet = $(bullet);
            var bulletIndex = $bullet.index();
            if (bulletIndex === current) {
              $bullet.addClass(params.bulletActiveClass);
            }
            if (params.dynamicBullets) {
              if (bulletIndex >= firstIndex && bulletIndex <= lastIndex) {
                $bullet.addClass(((params.bulletActiveClass) + "-main"));
              }
              if (bulletIndex === firstIndex) {
                $bullet
                  .prev()
                  .addClass(((params.bulletActiveClass) + "-prev"))
                  .prev()
                  .addClass(((params.bulletActiveClass) + "-prev-prev"));
              }
              if (bulletIndex === lastIndex) {
                $bullet
                  .next()
                  .addClass(((params.bulletActiveClass) + "-next"))
                  .next()
                  .addClass(((params.bulletActiveClass) + "-next-next"));
              }
            }
          });
        } else {
          var $bullet = bullets.eq(current);
          $bullet.addClass(params.bulletActiveClass);
          if (params.dynamicBullets) {
            var $firstDisplayedBullet = bullets.eq(firstIndex);
            var $lastDisplayedBullet = bullets.eq(lastIndex);
            for (var i = firstIndex; i <= lastIndex; i += 1) {
              bullets.eq(i).addClass(((params.bulletActiveClass) + "-main"));
            }
            $firstDisplayedBullet
              .prev()
              .addClass(((params.bulletActiveClass) + "-prev"))
              .prev()
              .addClass(((params.bulletActiveClass) + "-prev-prev"));
            $lastDisplayedBullet
              .next()
              .addClass(((params.bulletActiveClass) + "-next"))
              .next()
              .addClass(((params.bulletActiveClass) + "-next-next"));
          }
        }
        if (params.dynamicBullets) {
          var dynamicBulletsLength = Math.min(bullets.length, params.dynamicMainBullets + 4);
          var bulletsOffset = (((swiper.pagination.bulletSize * dynamicBulletsLength) - (swiper.pagination.bulletSize)) / 2) - (midIndex * swiper.pagination.bulletSize);
          var offsetProp = rtl ? 'right' : 'left';
          bullets.css(swiper.isHorizontal() ? offsetProp : 'top', (bulletsOffset + "px"));
        }
      }
      if (params.type === 'fraction') {
        $el.find(("." + (params.currentClass))).text(params.formatFractionCurrent(current + 1));
        $el.find(("." + (params.totalClass))).text(params.formatFractionTotal(total));
      }
      if (params.type === 'progressbar') {
        var progressbarDirection;
        if (params.progressbarOpposite) {
          progressbarDirection = swiper.isHorizontal() ? 'vertical' : 'horizontal';
        } else {
          progressbarDirection = swiper.isHorizontal() ? 'horizontal' : 'vertical';
        }
        var scale = (current + 1) / total;
        var scaleX = 1;
        var scaleY = 1;
        if (progressbarDirection === 'horizontal') {
          scaleX = scale;
        } else {
          scaleY = scale;
        }
        $el.find(("." + (params.progressbarFillClass))).transform(("translate3d(0,0,0) scaleX(" + scaleX + ") scaleY(" + scaleY + ")")).transition(swiper.params.speed);
      }
      if (params.type === 'custom' && params.renderCustom) {
        $el.html(params.renderCustom(swiper, current + 1, total));
        swiper.emit('paginationRender', swiper, $el[0]);
      } else {
        swiper.emit('paginationUpdate', swiper, $el[0]);
      }
      $el[swiper.params.watchOverflow && swiper.isLocked ? 'addClass' : 'removeClass'](params.lockClass);
    },
    render: function render() {
      // Render Container
      var swiper = this;
      var params = swiper.params.pagination;
      if (!params.el || !swiper.pagination.el || !swiper.pagination.$el || swiper.pagination.$el.length === 0) { return; }
      var slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;

      var $el = swiper.pagination.$el;
      var paginationHTML = '';
      if (params.type === 'bullets') {
        var numberOfBullets = swiper.params.loop ? Math.ceil((slidesLength - (swiper.loopedSlides * 2)) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
        for (var i = 0; i < numberOfBullets; i += 1) {
          if (params.renderBullet) {
            paginationHTML += params.renderBullet.call(swiper, i, params.bulletClass);
          } else {
            paginationHTML += "<" + (params.bulletElement) + " class=\"" + (params.bulletClass) + "\"></" + (params.bulletElement) + ">";
          }
        }
        $el.html(paginationHTML);
        swiper.pagination.bullets = $el.find(("." + (params.bulletClass)));
      }
      if (params.type === 'fraction') {
        if (params.renderFraction) {
          paginationHTML = params.renderFraction.call(swiper, params.currentClass, params.totalClass);
        } else {
          paginationHTML = "<span class=\"" + (params.currentClass) + "\"></span>"
            + ' / '
            + "<span class=\"" + (params.totalClass) + "\"></span>";
        }
        $el.html(paginationHTML);
      }
      if (params.type === 'progressbar') {
        if (params.renderProgressbar) {
          paginationHTML = params.renderProgressbar.call(swiper, params.progressbarFillClass);
        } else {
          paginationHTML = "<span class=\"" + (params.progressbarFillClass) + "\"></span>";
        }
        $el.html(paginationHTML);
      }
      if (params.type !== 'custom') {
        swiper.emit('paginationRender', swiper.pagination.$el[0]);
      }
    },
    init: function init() {
      var swiper = this;
      var params = swiper.params.pagination;
      if (!params.el) { return; }

      var $el = $(params.el);
      if ($el.length === 0) { return; }

      if (
        swiper.params.uniqueNavElements
        && typeof params.el === 'string'
        && $el.length > 1
        && swiper.$el.find(params.el).length === 1
      ) {
        $el = swiper.$el.find(params.el);
      }

      if (params.type === 'bullets' && params.clickable) {
        $el.addClass(params.clickableClass);
      }

      $el.addClass(params.modifierClass + params.type);

      if (params.type === 'bullets' && params.dynamicBullets) {
        $el.addClass(("" + (params.modifierClass) + (params.type) + "-dynamic"));
        swiper.pagination.dynamicBulletIndex = 0;
        if (params.dynamicMainBullets < 1) {
          params.dynamicMainBullets = 1;
        }
      }
      if (params.type === 'progressbar' && params.progressbarOpposite) {
        $el.addClass(params.progressbarOppositeClass);
      }

      if (params.clickable) {
        $el.on('click', ("." + (params.bulletClass)), function onClick(e) {
          e.preventDefault();
          var index = $(this).index() * swiper.params.slidesPerGroup;
          if (swiper.params.loop) { index += swiper.loopedSlides; }
          swiper.slideTo(index);
        });
      }

      Utils.extend(swiper.pagination, {
        $el: $el,
        el: $el[0],
      });
    },
    destroy: function destroy() {
      var swiper = this;
      var params = swiper.params.pagination;
      if (!params.el || !swiper.pagination.el || !swiper.pagination.$el || swiper.pagination.$el.length === 0) { return; }
      var $el = swiper.pagination.$el;

      $el.removeClass(params.hiddenClass);
      $el.removeClass(params.modifierClass + params.type);
      if (swiper.pagination.bullets) { swiper.pagination.bullets.removeClass(params.bulletActiveClass); }
      if (params.clickable) {
        $el.off('click', ("." + (params.bulletClass)));
      }
    },
  };

  var Pagination$1 = {
    name: 'pagination',
    params: {
      pagination: {
        el: null,
        bulletElement: 'span',
        clickable: false,
        hideOnClick: false,
        renderBullet: null,
        renderProgressbar: null,
        renderFraction: null,
        renderCustom: null,
        progressbarOpposite: false,
        type: 'bullets', // 'bullets' or 'progressbar' or 'fraction' or 'custom'
        dynamicBullets: false,
        dynamicMainBullets: 1,
        formatFractionCurrent: function (number) { return number; },
        formatFractionTotal: function (number) { return number; },
        bulletClass: 'swiper-pagination-bullet',
        bulletActiveClass: 'swiper-pagination-bullet-active',
        modifierClass: 'swiper-pagination-', // NEW
        currentClass: 'swiper-pagination-current',
        totalClass: 'swiper-pagination-total',
        hiddenClass: 'swiper-pagination-hidden',
        progressbarFillClass: 'swiper-pagination-progressbar-fill',
        progressbarOppositeClass: 'swiper-pagination-progressbar-opposite',
        clickableClass: 'swiper-pagination-clickable', // NEW
        lockClass: 'swiper-pagination-lock',
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        pagination: {
          init: Pagination.init.bind(swiper),
          render: Pagination.render.bind(swiper),
          update: Pagination.update.bind(swiper),
          destroy: Pagination.destroy.bind(swiper),
          dynamicBulletIndex: 0,
        },
      });
    },
    on: {
      init: function init() {
        var swiper = this;
        swiper.pagination.init();
        swiper.pagination.render();
        swiper.pagination.update();
      },
      activeIndexChange: function activeIndexChange() {
        var swiper = this;
        if (swiper.params.loop) {
          swiper.pagination.update();
        } else if (typeof swiper.snapIndex === 'undefined') {
          swiper.pagination.update();
        }
      },
      snapIndexChange: function snapIndexChange() {
        var swiper = this;
        if (!swiper.params.loop) {
          swiper.pagination.update();
        }
      },
      slidesLengthChange: function slidesLengthChange() {
        var swiper = this;
        if (swiper.params.loop) {
          swiper.pagination.render();
          swiper.pagination.update();
        }
      },
      snapGridLengthChange: function snapGridLengthChange() {
        var swiper = this;
        if (!swiper.params.loop) {
          swiper.pagination.render();
          swiper.pagination.update();
        }
      },
      destroy: function destroy() {
        var swiper = this;
        swiper.pagination.destroy();
      },
      click: function click(e) {
        var swiper = this;
        if (
          swiper.params.pagination.el
          && swiper.params.pagination.hideOnClick
          && swiper.pagination.$el.length > 0
          && !$(e.target).hasClass(swiper.params.pagination.bulletClass)
        ) {
          swiper.pagination.$el.toggleClass(swiper.params.pagination.hiddenClass);
        }
      },
    },
  };

  var Scrollbar = {
    setTranslate: function setTranslate() {
      var swiper = this;
      if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) { return; }
      var scrollbar = swiper.scrollbar;
      var rtl = swiper.rtlTranslate;
      var progress = swiper.progress;
      var dragSize = scrollbar.dragSize;
      var trackSize = scrollbar.trackSize;
      var $dragEl = scrollbar.$dragEl;
      var $el = scrollbar.$el;
      var params = swiper.params.scrollbar;

      var newSize = dragSize;
      var newPos = (trackSize - dragSize) * progress;
      if (rtl) {
        newPos = -newPos;
        if (newPos > 0) {
          newSize = dragSize - newPos;
          newPos = 0;
        } else if (-newPos + dragSize > trackSize) {
          newSize = trackSize + newPos;
        }
      } else if (newPos < 0) {
        newSize = dragSize + newPos;
        newPos = 0;
      } else if (newPos + dragSize > trackSize) {
        newSize = trackSize - newPos;
      }
      if (swiper.isHorizontal()) {
        if (Support.transforms3d) {
          $dragEl.transform(("translate3d(" + newPos + "px, 0, 0)"));
        } else {
          $dragEl.transform(("translateX(" + newPos + "px)"));
        }
        $dragEl[0].style.width = newSize + "px";
      } else {
        if (Support.transforms3d) {
          $dragEl.transform(("translate3d(0px, " + newPos + "px, 0)"));
        } else {
          $dragEl.transform(("translateY(" + newPos + "px)"));
        }
        $dragEl[0].style.height = newSize + "px";
      }
      if (params.hide) {
        clearTimeout(swiper.scrollbar.timeout);
        $el[0].style.opacity = 1;
        swiper.scrollbar.timeout = setTimeout(function () {
          $el[0].style.opacity = 0;
          $el.transition(400);
        }, 1000);
      }
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) { return; }
      swiper.scrollbar.$dragEl.transition(duration);
    },
    updateSize: function updateSize() {
      var swiper = this;
      if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) { return; }

      var scrollbar = swiper.scrollbar;
      var $dragEl = scrollbar.$dragEl;
      var $el = scrollbar.$el;

      $dragEl[0].style.width = '';
      $dragEl[0].style.height = '';
      var trackSize = swiper.isHorizontal() ? $el[0].offsetWidth : $el[0].offsetHeight;

      var divider = swiper.size / swiper.virtualSize;
      var moveDivider = divider * (trackSize / swiper.size);
      var dragSize;
      if (swiper.params.scrollbar.dragSize === 'auto') {
        dragSize = trackSize * divider;
      } else {
        dragSize = parseInt(swiper.params.scrollbar.dragSize, 10);
      }

      if (swiper.isHorizontal()) {
        $dragEl[0].style.width = dragSize + "px";
      } else {
        $dragEl[0].style.height = dragSize + "px";
      }

      if (divider >= 1) {
        $el[0].style.display = 'none';
      } else {
        $el[0].style.display = '';
      }
      if (swiper.params.scrollbarHide) {
        $el[0].style.opacity = 0;
      }
      Utils.extend(scrollbar, {
        trackSize: trackSize,
        divider: divider,
        moveDivider: moveDivider,
        dragSize: dragSize,
      });
      scrollbar.$el[swiper.params.watchOverflow && swiper.isLocked ? 'addClass' : 'removeClass'](swiper.params.scrollbar.lockClass);
    },
    setDragPosition: function setDragPosition(e) {
      var swiper = this;
      var scrollbar = swiper.scrollbar;
      var rtl = swiper.rtlTranslate;
      var $el = scrollbar.$el;
      var dragSize = scrollbar.dragSize;
      var trackSize = scrollbar.trackSize;

      var pointerPosition;
      if (swiper.isHorizontal()) {
        pointerPosition = ((e.type === 'touchstart' || e.type === 'touchmove') ? e.targetTouches[0].pageX : e.pageX || e.clientX);
      } else {
        pointerPosition = ((e.type === 'touchstart' || e.type === 'touchmove') ? e.targetTouches[0].pageY : e.pageY || e.clientY);
      }
      var positionRatio;
      positionRatio = ((pointerPosition) - $el.offset()[swiper.isHorizontal() ? 'left' : 'top'] - (dragSize / 2)) / (trackSize - dragSize);
      positionRatio = Math.max(Math.min(positionRatio, 1), 0);
      if (rtl) {
        positionRatio = 1 - positionRatio;
      }

      var position = swiper.minTranslate() + ((swiper.maxTranslate() - swiper.minTranslate()) * positionRatio);

      swiper.updateProgress(position);
      swiper.setTranslate(position);
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    },
    onDragStart: function onDragStart(e) {
      var swiper = this;
      var params = swiper.params.scrollbar;
      var scrollbar = swiper.scrollbar;
      var $wrapperEl = swiper.$wrapperEl;
      var $el = scrollbar.$el;
      var $dragEl = scrollbar.$dragEl;
      swiper.scrollbar.isTouched = true;
      e.preventDefault();
      e.stopPropagation();

      $wrapperEl.transition(100);
      $dragEl.transition(100);
      scrollbar.setDragPosition(e);

      clearTimeout(swiper.scrollbar.dragTimeout);

      $el.transition(0);
      if (params.hide) {
        $el.css('opacity', 1);
      }
      swiper.emit('scrollbarDragStart', e);
    },
    onDragMove: function onDragMove(e) {
      var swiper = this;
      var scrollbar = swiper.scrollbar;
      var $wrapperEl = swiper.$wrapperEl;
      var $el = scrollbar.$el;
      var $dragEl = scrollbar.$dragEl;

      if (!swiper.scrollbar.isTouched) { return; }
      if (e.preventDefault) { e.preventDefault(); }
      else { e.returnValue = false; }
      scrollbar.setDragPosition(e);
      $wrapperEl.transition(0);
      $el.transition(0);
      $dragEl.transition(0);
      swiper.emit('scrollbarDragMove', e);
    },
    onDragEnd: function onDragEnd(e) {
      var swiper = this;

      var params = swiper.params.scrollbar;
      var scrollbar = swiper.scrollbar;
      var $el = scrollbar.$el;

      if (!swiper.scrollbar.isTouched) { return; }
      swiper.scrollbar.isTouched = false;
      if (params.hide) {
        clearTimeout(swiper.scrollbar.dragTimeout);
        swiper.scrollbar.dragTimeout = Utils.nextTick(function () {
          $el.css('opacity', 0);
          $el.transition(400);
        }, 1000);
      }
      swiper.emit('scrollbarDragEnd', e);
      if (params.snapOnRelease) {
        swiper.slideToClosest();
      }
    },
    enableDraggable: function enableDraggable() {
      var swiper = this;
      if (!swiper.params.scrollbar.el) { return; }
      var scrollbar = swiper.scrollbar;
      var touchEvents = swiper.touchEvents;
      var touchEventsDesktop = swiper.touchEventsDesktop;
      var params = swiper.params;
      var $el = scrollbar.$el;
      var target = $el[0];
      var activeListener = Support.passiveListener && params.passiveListeners ? { passive: false, capture: false } : false;
      var passiveListener = Support.passiveListener && params.passiveListeners ? { passive: true, capture: false } : false;
      if (!Support.touch && (Support.pointerEvents || Support.prefixedPointerEvents)) {
        target.addEventListener(touchEventsDesktop.start, swiper.scrollbar.onDragStart, activeListener);
        doc.addEventListener(touchEventsDesktop.move, swiper.scrollbar.onDragMove, activeListener);
        doc.addEventListener(touchEventsDesktop.end, swiper.scrollbar.onDragEnd, passiveListener);
      } else {
        if (Support.touch) {
          target.addEventListener(touchEvents.start, swiper.scrollbar.onDragStart, activeListener);
          target.addEventListener(touchEvents.move, swiper.scrollbar.onDragMove, activeListener);
          target.addEventListener(touchEvents.end, swiper.scrollbar.onDragEnd, passiveListener);
        }
        if ((params.simulateTouch && !Device.ios && !Device.android) || (params.simulateTouch && !Support.touch && Device.ios)) {
          target.addEventListener('mousedown', swiper.scrollbar.onDragStart, activeListener);
          doc.addEventListener('mousemove', swiper.scrollbar.onDragMove, activeListener);
          doc.addEventListener('mouseup', swiper.scrollbar.onDragEnd, passiveListener);
        }
      }
    },
    disableDraggable: function disableDraggable() {
      var swiper = this;
      if (!swiper.params.scrollbar.el) { return; }
      var scrollbar = swiper.scrollbar;
      var touchEvents = swiper.touchEvents;
      var touchEventsDesktop = swiper.touchEventsDesktop;
      var params = swiper.params;
      var $el = scrollbar.$el;
      var target = $el[0];
      var activeListener = Support.passiveListener && params.passiveListeners ? { passive: false, capture: false } : false;
      var passiveListener = Support.passiveListener && params.passiveListeners ? { passive: true, capture: false } : false;
      if (!Support.touch && (Support.pointerEvents || Support.prefixedPointerEvents)) {
        target.removeEventListener(touchEventsDesktop.start, swiper.scrollbar.onDragStart, activeListener);
        doc.removeEventListener(touchEventsDesktop.move, swiper.scrollbar.onDragMove, activeListener);
        doc.removeEventListener(touchEventsDesktop.end, swiper.scrollbar.onDragEnd, passiveListener);
      } else {
        if (Support.touch) {
          target.removeEventListener(touchEvents.start, swiper.scrollbar.onDragStart, activeListener);
          target.removeEventListener(touchEvents.move, swiper.scrollbar.onDragMove, activeListener);
          target.removeEventListener(touchEvents.end, swiper.scrollbar.onDragEnd, passiveListener);
        }
        if ((params.simulateTouch && !Device.ios && !Device.android) || (params.simulateTouch && !Support.touch && Device.ios)) {
          target.removeEventListener('mousedown', swiper.scrollbar.onDragStart, activeListener);
          doc.removeEventListener('mousemove', swiper.scrollbar.onDragMove, activeListener);
          doc.removeEventListener('mouseup', swiper.scrollbar.onDragEnd, passiveListener);
        }
      }
    },
    init: function init() {
      var swiper = this;
      if (!swiper.params.scrollbar.el) { return; }
      var scrollbar = swiper.scrollbar;
      var $swiperEl = swiper.$el;
      var params = swiper.params.scrollbar;

      var $el = $(params.el);
      if (swiper.params.uniqueNavElements && typeof params.el === 'string' && $el.length > 1 && $swiperEl.find(params.el).length === 1) {
        $el = $swiperEl.find(params.el);
      }

      var $dragEl = $el.find(("." + (swiper.params.scrollbar.dragClass)));
      if ($dragEl.length === 0) {
        $dragEl = $(("<div class=\"" + (swiper.params.scrollbar.dragClass) + "\"></div>"));
        $el.append($dragEl);
      }

      Utils.extend(scrollbar, {
        $el: $el,
        el: $el[0],
        $dragEl: $dragEl,
        dragEl: $dragEl[0],
      });

      if (params.draggable) {
        scrollbar.enableDraggable();
      }
    },
    destroy: function destroy() {
      var swiper = this;
      swiper.scrollbar.disableDraggable();
    },
  };

  var Scrollbar$1 = {
    name: 'scrollbar',
    params: {
      scrollbar: {
        el: null,
        dragSize: 'auto',
        hide: false,
        draggable: false,
        snapOnRelease: true,
        lockClass: 'swiper-scrollbar-lock',
        dragClass: 'swiper-scrollbar-drag',
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        scrollbar: {
          init: Scrollbar.init.bind(swiper),
          destroy: Scrollbar.destroy.bind(swiper),
          updateSize: Scrollbar.updateSize.bind(swiper),
          setTranslate: Scrollbar.setTranslate.bind(swiper),
          setTransition: Scrollbar.setTransition.bind(swiper),
          enableDraggable: Scrollbar.enableDraggable.bind(swiper),
          disableDraggable: Scrollbar.disableDraggable.bind(swiper),
          setDragPosition: Scrollbar.setDragPosition.bind(swiper),
          onDragStart: Scrollbar.onDragStart.bind(swiper),
          onDragMove: Scrollbar.onDragMove.bind(swiper),
          onDragEnd: Scrollbar.onDragEnd.bind(swiper),
          isTouched: false,
          timeout: null,
          dragTimeout: null,
        },
      });
    },
    on: {
      init: function init() {
        var swiper = this;
        swiper.scrollbar.init();
        swiper.scrollbar.updateSize();
        swiper.scrollbar.setTranslate();
      },
      update: function update() {
        var swiper = this;
        swiper.scrollbar.updateSize();
      },
      resize: function resize() {
        var swiper = this;
        swiper.scrollbar.updateSize();
      },
      observerUpdate: function observerUpdate() {
        var swiper = this;
        swiper.scrollbar.updateSize();
      },
      setTranslate: function setTranslate() {
        var swiper = this;
        swiper.scrollbar.setTranslate();
      },
      setTransition: function setTransition(duration) {
        var swiper = this;
        swiper.scrollbar.setTransition(duration);
      },
      destroy: function destroy() {
        var swiper = this;
        swiper.scrollbar.destroy();
      },
    },
  };

  var Parallax = {
    setTransform: function setTransform(el, progress) {
      var swiper = this;
      var rtl = swiper.rtl;

      var $el = $(el);
      var rtlFactor = rtl ? -1 : 1;

      var p = $el.attr('data-swiper-parallax') || '0';
      var x = $el.attr('data-swiper-parallax-x');
      var y = $el.attr('data-swiper-parallax-y');
      var scale = $el.attr('data-swiper-parallax-scale');
      var opacity = $el.attr('data-swiper-parallax-opacity');

      if (x || y) {
        x = x || '0';
        y = y || '0';
      } else if (swiper.isHorizontal()) {
        x = p;
        y = '0';
      } else {
        y = p;
        x = '0';
      }

      if ((x).indexOf('%') >= 0) {
        x = (parseInt(x, 10) * progress * rtlFactor) + "%";
      } else {
        x = (x * progress * rtlFactor) + "px";
      }
      if ((y).indexOf('%') >= 0) {
        y = (parseInt(y, 10) * progress) + "%";
      } else {
        y = (y * progress) + "px";
      }

      if (typeof opacity !== 'undefined' && opacity !== null) {
        var currentOpacity = opacity - ((opacity - 1) * (1 - Math.abs(progress)));
        $el[0].style.opacity = currentOpacity;
      }
      if (typeof scale === 'undefined' || scale === null) {
        $el.transform(("translate3d(" + x + ", " + y + ", 0px)"));
      } else {
        var currentScale = scale - ((scale - 1) * (1 - Math.abs(progress)));
        $el.transform(("translate3d(" + x + ", " + y + ", 0px) scale(" + currentScale + ")"));
      }
    },
    setTranslate: function setTranslate() {
      var swiper = this;
      var $el = swiper.$el;
      var slides = swiper.slides;
      var progress = swiper.progress;
      var snapGrid = swiper.snapGrid;
      $el.children('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]')
        .each(function (index, el) {
          swiper.parallax.setTransform(el, progress);
        });
      slides.each(function (slideIndex, slideEl) {
        var slideProgress = slideEl.progress;
        if (swiper.params.slidesPerGroup > 1 && swiper.params.slidesPerView !== 'auto') {
          slideProgress += Math.ceil(slideIndex / 2) - (progress * (snapGrid.length - 1));
        }
        slideProgress = Math.min(Math.max(slideProgress, -1), 1);
        $(slideEl).find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]')
          .each(function (index, el) {
            swiper.parallax.setTransform(el, slideProgress);
          });
      });
    },
    setTransition: function setTransition(duration) {
      if ( duration === void 0 ) duration = this.params.speed;

      var swiper = this;
      var $el = swiper.$el;
      $el.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]')
        .each(function (index, parallaxEl) {
          var $parallaxEl = $(parallaxEl);
          var parallaxDuration = parseInt($parallaxEl.attr('data-swiper-parallax-duration'), 10) || duration;
          if (duration === 0) { parallaxDuration = 0; }
          $parallaxEl.transition(parallaxDuration);
        });
    },
  };

  var Parallax$1 = {
    name: 'parallax',
    params: {
      parallax: {
        enabled: false,
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        parallax: {
          setTransform: Parallax.setTransform.bind(swiper),
          setTranslate: Parallax.setTranslate.bind(swiper),
          setTransition: Parallax.setTransition.bind(swiper),
        },
      });
    },
    on: {
      beforeInit: function beforeInit() {
        var swiper = this;
        if (!swiper.params.parallax.enabled) { return; }
        swiper.params.watchSlidesProgress = true;
        swiper.originalParams.watchSlidesProgress = true;
      },
      init: function init() {
        var swiper = this;
        if (!swiper.params.parallax) { return; }
        swiper.parallax.setTranslate();
      },
      setTranslate: function setTranslate() {
        var swiper = this;
        if (!swiper.params.parallax) { return; }
        swiper.parallax.setTranslate();
      },
      setTransition: function setTransition(duration) {
        var swiper = this;
        if (!swiper.params.parallax) { return; }
        swiper.parallax.setTransition(duration);
      },
    },
  };

  var Zoom = {
    // Calc Scale From Multi-touches
    getDistanceBetweenTouches: function getDistanceBetweenTouches(e) {
      if (e.targetTouches.length < 2) { return 1; }
      var x1 = e.targetTouches[0].pageX;
      var y1 = e.targetTouches[0].pageY;
      var x2 = e.targetTouches[1].pageX;
      var y2 = e.targetTouches[1].pageY;
      var distance = Math.sqrt((Math.pow( (x2 - x1), 2 )) + (Math.pow( (y2 - y1), 2 )));
      return distance;
    },
    // Events
    onGestureStart: function onGestureStart(e) {
      var swiper = this;
      var params = swiper.params.zoom;
      var zoom = swiper.zoom;
      var gesture = zoom.gesture;
      zoom.fakeGestureTouched = false;
      zoom.fakeGestureMoved = false;
      if (!Support.gestures) {
        if (e.type !== 'touchstart' || (e.type === 'touchstart' && e.targetTouches.length < 2)) {
          return;
        }
        zoom.fakeGestureTouched = true;
        gesture.scaleStart = Zoom.getDistanceBetweenTouches(e);
      }
      if (!gesture.$slideEl || !gesture.$slideEl.length) {
        gesture.$slideEl = $(e.target).closest('.swiper-slide');
        if (gesture.$slideEl.length === 0) { gesture.$slideEl = swiper.slides.eq(swiper.activeIndex); }
        gesture.$imageEl = gesture.$slideEl.find('img, svg, canvas');
        gesture.$imageWrapEl = gesture.$imageEl.parent(("." + (params.containerClass)));
        gesture.maxRatio = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;
        if (gesture.$imageWrapEl.length === 0) {
          gesture.$imageEl = undefined;
          return;
        }
      }
      gesture.$imageEl.transition(0);
      swiper.zoom.isScaling = true;
    },
    onGestureChange: function onGestureChange(e) {
      var swiper = this;
      var params = swiper.params.zoom;
      var zoom = swiper.zoom;
      var gesture = zoom.gesture;
      if (!Support.gestures) {
        if (e.type !== 'touchmove' || (e.type === 'touchmove' && e.targetTouches.length < 2)) {
          return;
        }
        zoom.fakeGestureMoved = true;
        gesture.scaleMove = Zoom.getDistanceBetweenTouches(e);
      }
      if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }
      if (Support.gestures) {
        swiper.zoom.scale = e.scale * zoom.currentScale;
      } else {
        zoom.scale = (gesture.scaleMove / gesture.scaleStart) * zoom.currentScale;
      }
      if (zoom.scale > gesture.maxRatio) {
        zoom.scale = (gesture.maxRatio - 1) + (Math.pow( ((zoom.scale - gesture.maxRatio) + 1), 0.5 ));
      }
      if (zoom.scale < params.minRatio) {
        zoom.scale = (params.minRatio + 1) - (Math.pow( ((params.minRatio - zoom.scale) + 1), 0.5 ));
      }
      gesture.$imageEl.transform(("translate3d(0,0,0) scale(" + (zoom.scale) + ")"));
    },
    onGestureEnd: function onGestureEnd(e) {
      var swiper = this;
      var params = swiper.params.zoom;
      var zoom = swiper.zoom;
      var gesture = zoom.gesture;
      if (!Support.gestures) {
        if (!zoom.fakeGestureTouched || !zoom.fakeGestureMoved) {
          return;
        }
        if (e.type !== 'touchend' || (e.type === 'touchend' && e.changedTouches.length < 2 && !Device.android)) {
          return;
        }
        zoom.fakeGestureTouched = false;
        zoom.fakeGestureMoved = false;
      }
      if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }
      zoom.scale = Math.max(Math.min(zoom.scale, gesture.maxRatio), params.minRatio);
      gesture.$imageEl.transition(swiper.params.speed).transform(("translate3d(0,0,0) scale(" + (zoom.scale) + ")"));
      zoom.currentScale = zoom.scale;
      zoom.isScaling = false;
      if (zoom.scale === 1) { gesture.$slideEl = undefined; }
    },
    onTouchStart: function onTouchStart(e) {
      var swiper = this;
      var zoom = swiper.zoom;
      var gesture = zoom.gesture;
      var image = zoom.image;
      if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }
      if (image.isTouched) { return; }
      if (Device.android) { e.preventDefault(); }
      image.isTouched = true;
      image.touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
      image.touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
    },
    onTouchMove: function onTouchMove(e) {
      var swiper = this;
      var zoom = swiper.zoom;
      var gesture = zoom.gesture;
      var image = zoom.image;
      var velocity = zoom.velocity;
      if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }
      swiper.allowClick = false;
      if (!image.isTouched || !gesture.$slideEl) { return; }

      if (!image.isMoved) {
        image.width = gesture.$imageEl[0].offsetWidth;
        image.height = gesture.$imageEl[0].offsetHeight;
        image.startX = Utils.getTranslate(gesture.$imageWrapEl[0], 'x') || 0;
        image.startY = Utils.getTranslate(gesture.$imageWrapEl[0], 'y') || 0;
        gesture.slideWidth = gesture.$slideEl[0].offsetWidth;
        gesture.slideHeight = gesture.$slideEl[0].offsetHeight;
        gesture.$imageWrapEl.transition(0);
        if (swiper.rtl) {
          image.startX = -image.startX;
          image.startY = -image.startY;
        }
      }
      // Define if we need image drag
      var scaledWidth = image.width * zoom.scale;
      var scaledHeight = image.height * zoom.scale;

      if (scaledWidth < gesture.slideWidth && scaledHeight < gesture.slideHeight) { return; }

      image.minX = Math.min(((gesture.slideWidth / 2) - (scaledWidth / 2)), 0);
      image.maxX = -image.minX;
      image.minY = Math.min(((gesture.slideHeight / 2) - (scaledHeight / 2)), 0);
      image.maxY = -image.minY;

      image.touchesCurrent.x = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
      image.touchesCurrent.y = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;

      if (!image.isMoved && !zoom.isScaling) {
        if (
          swiper.isHorizontal()
          && (
            (Math.floor(image.minX) === Math.floor(image.startX) && image.touchesCurrent.x < image.touchesStart.x)
            || (Math.floor(image.maxX) === Math.floor(image.startX) && image.touchesCurrent.x > image.touchesStart.x)
          )
        ) {
          image.isTouched = false;
          return;
        } if (
          !swiper.isHorizontal()
          && (
            (Math.floor(image.minY) === Math.floor(image.startY) && image.touchesCurrent.y < image.touchesStart.y)
            || (Math.floor(image.maxY) === Math.floor(image.startY) && image.touchesCurrent.y > image.touchesStart.y)
          )
        ) {
          image.isTouched = false;
          return;
        }
      }
      e.preventDefault();
      e.stopPropagation();

      image.isMoved = true;
      image.currentX = (image.touchesCurrent.x - image.touchesStart.x) + image.startX;
      image.currentY = (image.touchesCurrent.y - image.touchesStart.y) + image.startY;

      if (image.currentX < image.minX) {
        image.currentX = (image.minX + 1) - (Math.pow( ((image.minX - image.currentX) + 1), 0.8 ));
      }
      if (image.currentX > image.maxX) {
        image.currentX = (image.maxX - 1) + (Math.pow( ((image.currentX - image.maxX) + 1), 0.8 ));
      }

      if (image.currentY < image.minY) {
        image.currentY = (image.minY + 1) - (Math.pow( ((image.minY - image.currentY) + 1), 0.8 ));
      }
      if (image.currentY > image.maxY) {
        image.currentY = (image.maxY - 1) + (Math.pow( ((image.currentY - image.maxY) + 1), 0.8 ));
      }

      // Velocity
      if (!velocity.prevPositionX) { velocity.prevPositionX = image.touchesCurrent.x; }
      if (!velocity.prevPositionY) { velocity.prevPositionY = image.touchesCurrent.y; }
      if (!velocity.prevTime) { velocity.prevTime = Date.now(); }
      velocity.x = (image.touchesCurrent.x - velocity.prevPositionX) / (Date.now() - velocity.prevTime) / 2;
      velocity.y = (image.touchesCurrent.y - velocity.prevPositionY) / (Date.now() - velocity.prevTime) / 2;
      if (Math.abs(image.touchesCurrent.x - velocity.prevPositionX) < 2) { velocity.x = 0; }
      if (Math.abs(image.touchesCurrent.y - velocity.prevPositionY) < 2) { velocity.y = 0; }
      velocity.prevPositionX = image.touchesCurrent.x;
      velocity.prevPositionY = image.touchesCurrent.y;
      velocity.prevTime = Date.now();

      gesture.$imageWrapEl.transform(("translate3d(" + (image.currentX) + "px, " + (image.currentY) + "px,0)"));
    },
    onTouchEnd: function onTouchEnd() {
      var swiper = this;
      var zoom = swiper.zoom;
      var gesture = zoom.gesture;
      var image = zoom.image;
      var velocity = zoom.velocity;
      if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }
      if (!image.isTouched || !image.isMoved) {
        image.isTouched = false;
        image.isMoved = false;
        return;
      }
      image.isTouched = false;
      image.isMoved = false;
      var momentumDurationX = 300;
      var momentumDurationY = 300;
      var momentumDistanceX = velocity.x * momentumDurationX;
      var newPositionX = image.currentX + momentumDistanceX;
      var momentumDistanceY = velocity.y * momentumDurationY;
      var newPositionY = image.currentY + momentumDistanceY;

      // Fix duration
      if (velocity.x !== 0) { momentumDurationX = Math.abs((newPositionX - image.currentX) / velocity.x); }
      if (velocity.y !== 0) { momentumDurationY = Math.abs((newPositionY - image.currentY) / velocity.y); }
      var momentumDuration = Math.max(momentumDurationX, momentumDurationY);

      image.currentX = newPositionX;
      image.currentY = newPositionY;

      // Define if we need image drag
      var scaledWidth = image.width * zoom.scale;
      var scaledHeight = image.height * zoom.scale;
      image.minX = Math.min(((gesture.slideWidth / 2) - (scaledWidth / 2)), 0);
      image.maxX = -image.minX;
      image.minY = Math.min(((gesture.slideHeight / 2) - (scaledHeight / 2)), 0);
      image.maxY = -image.minY;
      image.currentX = Math.max(Math.min(image.currentX, image.maxX), image.minX);
      image.currentY = Math.max(Math.min(image.currentY, image.maxY), image.minY);

      gesture.$imageWrapEl.transition(momentumDuration).transform(("translate3d(" + (image.currentX) + "px, " + (image.currentY) + "px,0)"));
    },
    onTransitionEnd: function onTransitionEnd() {
      var swiper = this;
      var zoom = swiper.zoom;
      var gesture = zoom.gesture;
      if (gesture.$slideEl && swiper.previousIndex !== swiper.activeIndex) {
        gesture.$imageEl.transform('translate3d(0,0,0) scale(1)');
        gesture.$imageWrapEl.transform('translate3d(0,0,0)');
        gesture.$slideEl = undefined;
        gesture.$imageEl = undefined;
        gesture.$imageWrapEl = undefined;

        zoom.scale = 1;
        zoom.currentScale = 1;
      }
    },
    // Toggle Zoom
    toggle: function toggle(e) {
      var swiper = this;
      var zoom = swiper.zoom;

      if (zoom.scale && zoom.scale !== 1) {
        // Zoom Out
        zoom.out();
      } else {
        // Zoom In
        zoom.in(e);
      }
    },
    in: function in$1(e) {
      var swiper = this;

      var zoom = swiper.zoom;
      var params = swiper.params.zoom;
      var gesture = zoom.gesture;
      var image = zoom.image;

      if (!gesture.$slideEl) {
        gesture.$slideEl = swiper.clickedSlide ? $(swiper.clickedSlide) : swiper.slides.eq(swiper.activeIndex);
        gesture.$imageEl = gesture.$slideEl.find('img, svg, canvas');
        gesture.$imageWrapEl = gesture.$imageEl.parent(("." + (params.containerClass)));
      }
      if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }

      gesture.$slideEl.addClass(("" + (params.zoomedSlideClass)));

      var touchX;
      var touchY;
      var offsetX;
      var offsetY;
      var diffX;
      var diffY;
      var translateX;
      var translateY;
      var imageWidth;
      var imageHeight;
      var scaledWidth;
      var scaledHeight;
      var translateMinX;
      var translateMinY;
      var translateMaxX;
      var translateMaxY;
      var slideWidth;
      var slideHeight;

      if (typeof image.touchesStart.x === 'undefined' && e) {
        touchX = e.type === 'touchend' ? e.changedTouches[0].pageX : e.pageX;
        touchY = e.type === 'touchend' ? e.changedTouches[0].pageY : e.pageY;
      } else {
        touchX = image.touchesStart.x;
        touchY = image.touchesStart.y;
      }

      zoom.scale = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;
      zoom.currentScale = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;
      if (e) {
        slideWidth = gesture.$slideEl[0].offsetWidth;
        slideHeight = gesture.$slideEl[0].offsetHeight;
        offsetX = gesture.$slideEl.offset().left;
        offsetY = gesture.$slideEl.offset().top;
        diffX = (offsetX + (slideWidth / 2)) - touchX;
        diffY = (offsetY + (slideHeight / 2)) - touchY;

        imageWidth = gesture.$imageEl[0].offsetWidth;
        imageHeight = gesture.$imageEl[0].offsetHeight;
        scaledWidth = imageWidth * zoom.scale;
        scaledHeight = imageHeight * zoom.scale;

        translateMinX = Math.min(((slideWidth / 2) - (scaledWidth / 2)), 0);
        translateMinY = Math.min(((slideHeight / 2) - (scaledHeight / 2)), 0);
        translateMaxX = -translateMinX;
        translateMaxY = -translateMinY;

        translateX = diffX * zoom.scale;
        translateY = diffY * zoom.scale;

        if (translateX < translateMinX) {
          translateX = translateMinX;
        }
        if (translateX > translateMaxX) {
          translateX = translateMaxX;
        }

        if (translateY < translateMinY) {
          translateY = translateMinY;
        }
        if (translateY > translateMaxY) {
          translateY = translateMaxY;
        }
      } else {
        translateX = 0;
        translateY = 0;
      }
      gesture.$imageWrapEl.transition(300).transform(("translate3d(" + translateX + "px, " + translateY + "px,0)"));
      gesture.$imageEl.transition(300).transform(("translate3d(0,0,0) scale(" + (zoom.scale) + ")"));
    },
    out: function out() {
      var swiper = this;

      var zoom = swiper.zoom;
      var params = swiper.params.zoom;
      var gesture = zoom.gesture;

      if (!gesture.$slideEl) {
        gesture.$slideEl = swiper.clickedSlide ? $(swiper.clickedSlide) : swiper.slides.eq(swiper.activeIndex);
        gesture.$imageEl = gesture.$slideEl.find('img, svg, canvas');
        gesture.$imageWrapEl = gesture.$imageEl.parent(("." + (params.containerClass)));
      }
      if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }

      zoom.scale = 1;
      zoom.currentScale = 1;
      gesture.$imageWrapEl.transition(300).transform('translate3d(0,0,0)');
      gesture.$imageEl.transition(300).transform('translate3d(0,0,0) scale(1)');
      gesture.$slideEl.removeClass(("" + (params.zoomedSlideClass)));
      gesture.$slideEl = undefined;
    },
    // Attach/Detach Events
    enable: function enable() {
      var swiper = this;
      var zoom = swiper.zoom;
      if (zoom.enabled) { return; }
      zoom.enabled = true;

      var passiveListener = swiper.touchEvents.start === 'touchstart' && Support.passiveListener && swiper.params.passiveListeners ? { passive: true, capture: false } : false;

      // Scale image
      if (Support.gestures) {
        swiper.$wrapperEl.on('gesturestart', '.swiper-slide', zoom.onGestureStart, passiveListener);
        swiper.$wrapperEl.on('gesturechange', '.swiper-slide', zoom.onGestureChange, passiveListener);
        swiper.$wrapperEl.on('gestureend', '.swiper-slide', zoom.onGestureEnd, passiveListener);
      } else if (swiper.touchEvents.start === 'touchstart') {
        swiper.$wrapperEl.on(swiper.touchEvents.start, '.swiper-slide', zoom.onGestureStart, passiveListener);
        swiper.$wrapperEl.on(swiper.touchEvents.move, '.swiper-slide', zoom.onGestureChange, passiveListener);
        swiper.$wrapperEl.on(swiper.touchEvents.end, '.swiper-slide', zoom.onGestureEnd, passiveListener);
      }

      // Move image
      swiper.$wrapperEl.on(swiper.touchEvents.move, ("." + (swiper.params.zoom.containerClass)), zoom.onTouchMove);
    },
    disable: function disable() {
      var swiper = this;
      var zoom = swiper.zoom;
      if (!zoom.enabled) { return; }

      swiper.zoom.enabled = false;

      var passiveListener = swiper.touchEvents.start === 'touchstart' && Support.passiveListener && swiper.params.passiveListeners ? { passive: true, capture: false } : false;

      // Scale image
      if (Support.gestures) {
        swiper.$wrapperEl.off('gesturestart', '.swiper-slide', zoom.onGestureStart, passiveListener);
        swiper.$wrapperEl.off('gesturechange', '.swiper-slide', zoom.onGestureChange, passiveListener);
        swiper.$wrapperEl.off('gestureend', '.swiper-slide', zoom.onGestureEnd, passiveListener);
      } else if (swiper.touchEvents.start === 'touchstart') {
        swiper.$wrapperEl.off(swiper.touchEvents.start, '.swiper-slide', zoom.onGestureStart, passiveListener);
        swiper.$wrapperEl.off(swiper.touchEvents.move, '.swiper-slide', zoom.onGestureChange, passiveListener);
        swiper.$wrapperEl.off(swiper.touchEvents.end, '.swiper-slide', zoom.onGestureEnd, passiveListener);
      }

      // Move image
      swiper.$wrapperEl.off(swiper.touchEvents.move, ("." + (swiper.params.zoom.containerClass)), zoom.onTouchMove);
    },
  };

  var Zoom$1 = {
    name: 'zoom',
    params: {
      zoom: {
        enabled: false,
        maxRatio: 3,
        minRatio: 1,
        toggle: true,
        containerClass: 'swiper-zoom-container',
        zoomedSlideClass: 'swiper-slide-zoomed',
      },
    },
    create: function create() {
      var swiper = this;
      var zoom = {
        enabled: false,
        scale: 1,
        currentScale: 1,
        isScaling: false,
        gesture: {
          $slideEl: undefined,
          slideWidth: undefined,
          slideHeight: undefined,
          $imageEl: undefined,
          $imageWrapEl: undefined,
          maxRatio: 3,
        },
        image: {
          isTouched: undefined,
          isMoved: undefined,
          currentX: undefined,
          currentY: undefined,
          minX: undefined,
          minY: undefined,
          maxX: undefined,
          maxY: undefined,
          width: undefined,
          height: undefined,
          startX: undefined,
          startY: undefined,
          touchesStart: {},
          touchesCurrent: {},
        },
        velocity: {
          x: undefined,
          y: undefined,
          prevPositionX: undefined,
          prevPositionY: undefined,
          prevTime: undefined,
        },
      };
      ('onGestureStart onGestureChange onGestureEnd onTouchStart onTouchMove onTouchEnd onTransitionEnd toggle enable disable in out').split(' ').forEach(function (methodName) {
        zoom[methodName] = Zoom[methodName].bind(swiper);
      });
      Utils.extend(swiper, {
        zoom: zoom,
      });
    },
    on: {
      init: function init() {
        var swiper = this;
        if (swiper.params.zoom.enabled) {
          swiper.zoom.enable();
        }
      },
      destroy: function destroy() {
        var swiper = this;
        swiper.zoom.disable();
      },
      touchStart: function touchStart(e) {
        var swiper = this;
        if (!swiper.zoom.enabled) { return; }
        swiper.zoom.onTouchStart(e);
      },
      touchEnd: function touchEnd(e) {
        var swiper = this;
        if (!swiper.zoom.enabled) { return; }
        swiper.zoom.onTouchEnd(e);
      },
      doubleTap: function doubleTap(e) {
        var swiper = this;
        if (swiper.params.zoom.enabled && swiper.zoom.enabled && swiper.params.zoom.toggle) {
          swiper.zoom.toggle(e);
        }
      },
      transitionEnd: function transitionEnd() {
        var swiper = this;
        if (swiper.zoom.enabled && swiper.params.zoom.enabled) {
          swiper.zoom.onTransitionEnd();
        }
      },
    },
  };

  var Lazy = {
    loadInSlide: function loadInSlide(index, loadInDuplicate) {
      if ( loadInDuplicate === void 0 ) loadInDuplicate = true;

      var swiper = this;
      var params = swiper.params.lazy;
      if (typeof index === 'undefined') { return; }
      if (swiper.slides.length === 0) { return; }
      var isVirtual = swiper.virtual && swiper.params.virtual.enabled;

      var $slideEl = isVirtual
        ? swiper.$wrapperEl.children(("." + (swiper.params.slideClass) + "[data-swiper-slide-index=\"" + index + "\"]"))
        : swiper.slides.eq(index);

      var $images = $slideEl.find(("." + (params.elementClass) + ":not(." + (params.loadedClass) + "):not(." + (params.loadingClass) + ")"));
      if ($slideEl.hasClass(params.elementClass) && !$slideEl.hasClass(params.loadedClass) && !$slideEl.hasClass(params.loadingClass)) {
        $images = $images.add($slideEl[0]);
      }
      if ($images.length === 0) { return; }

      $images.each(function (imageIndex, imageEl) {
        var $imageEl = $(imageEl);
        $imageEl.addClass(params.loadingClass);

        var background = $imageEl.attr('data-background');
        var src = $imageEl.attr('data-src');
        var srcset = $imageEl.attr('data-srcset');
        var sizes = $imageEl.attr('data-sizes');

        swiper.loadImage($imageEl[0], (src || background), srcset, sizes, false, function () {
          if (typeof swiper === 'undefined' || swiper === null || !swiper || (swiper && !swiper.params) || swiper.destroyed) { return; }
          if (background) {
            $imageEl.css('background-image', ("url(\"" + background + "\")"));
            $imageEl.removeAttr('data-background');
          } else {
            if (srcset) {
              $imageEl.attr('srcset', srcset);
              $imageEl.removeAttr('data-srcset');
            }
            if (sizes) {
              $imageEl.attr('sizes', sizes);
              $imageEl.removeAttr('data-sizes');
            }
            if (src) {
              $imageEl.attr('src', src);
              $imageEl.removeAttr('data-src');
            }
          }

          $imageEl.addClass(params.loadedClass).removeClass(params.loadingClass);
          $slideEl.find(("." + (params.preloaderClass))).remove();
          if (swiper.params.loop && loadInDuplicate) {
            var slideOriginalIndex = $slideEl.attr('data-swiper-slide-index');
            if ($slideEl.hasClass(swiper.params.slideDuplicateClass)) {
              var originalSlide = swiper.$wrapperEl.children(("[data-swiper-slide-index=\"" + slideOriginalIndex + "\"]:not(." + (swiper.params.slideDuplicateClass) + ")"));
              swiper.lazy.loadInSlide(originalSlide.index(), false);
            } else {
              var duplicatedSlide = swiper.$wrapperEl.children(("." + (swiper.params.slideDuplicateClass) + "[data-swiper-slide-index=\"" + slideOriginalIndex + "\"]"));
              swiper.lazy.loadInSlide(duplicatedSlide.index(), false);
            }
          }
          swiper.emit('lazyImageReady', $slideEl[0], $imageEl[0]);
        });

        swiper.emit('lazyImageLoad', $slideEl[0], $imageEl[0]);
      });
    },
    load: function load() {
      var swiper = this;
      var $wrapperEl = swiper.$wrapperEl;
      var swiperParams = swiper.params;
      var slides = swiper.slides;
      var activeIndex = swiper.activeIndex;
      var isVirtual = swiper.virtual && swiperParams.virtual.enabled;
      var params = swiperParams.lazy;

      var slidesPerView = swiperParams.slidesPerView;
      if (slidesPerView === 'auto') {
        slidesPerView = 0;
      }

      function slideExist(index) {
        if (isVirtual) {
          if ($wrapperEl.children(("." + (swiperParams.slideClass) + "[data-swiper-slide-index=\"" + index + "\"]")).length) {
            return true;
          }
        } else if (slides[index]) { return true; }
        return false;
      }
      function slideIndex(slideEl) {
        if (isVirtual) {
          return $(slideEl).attr('data-swiper-slide-index');
        }
        return $(slideEl).index();
      }

      if (!swiper.lazy.initialImageLoaded) { swiper.lazy.initialImageLoaded = true; }
      if (swiper.params.watchSlidesVisibility) {
        $wrapperEl.children(("." + (swiperParams.slideVisibleClass))).each(function (elIndex, slideEl) {
          var index = isVirtual ? $(slideEl).attr('data-swiper-slide-index') : $(slideEl).index();
          swiper.lazy.loadInSlide(index);
        });
      } else if (slidesPerView > 1) {
        for (var i = activeIndex; i < activeIndex + slidesPerView; i += 1) {
          if (slideExist(i)) { swiper.lazy.loadInSlide(i); }
        }
      } else {
        swiper.lazy.loadInSlide(activeIndex);
      }
      if (params.loadPrevNext) {
        if (slidesPerView > 1 || (params.loadPrevNextAmount && params.loadPrevNextAmount > 1)) {
          var amount = params.loadPrevNextAmount;
          var spv = slidesPerView;
          var maxIndex = Math.min(activeIndex + spv + Math.max(amount, spv), slides.length);
          var minIndex = Math.max(activeIndex - Math.max(spv, amount), 0);
          // Next Slides
          for (var i$1 = activeIndex + slidesPerView; i$1 < maxIndex; i$1 += 1) {
            if (slideExist(i$1)) { swiper.lazy.loadInSlide(i$1); }
          }
          // Prev Slides
          for (var i$2 = minIndex; i$2 < activeIndex; i$2 += 1) {
            if (slideExist(i$2)) { swiper.lazy.loadInSlide(i$2); }
          }
        } else {
          var nextSlide = $wrapperEl.children(("." + (swiperParams.slideNextClass)));
          if (nextSlide.length > 0) { swiper.lazy.loadInSlide(slideIndex(nextSlide)); }

          var prevSlide = $wrapperEl.children(("." + (swiperParams.slidePrevClass)));
          if (prevSlide.length > 0) { swiper.lazy.loadInSlide(slideIndex(prevSlide)); }
        }
      }
    },
  };

  var Lazy$1 = {
    name: 'lazy',
    params: {
      lazy: {
        enabled: false,
        loadPrevNext: false,
        loadPrevNextAmount: 1,
        loadOnTransitionStart: false,

        elementClass: 'swiper-lazy',
        loadingClass: 'swiper-lazy-loading',
        loadedClass: 'swiper-lazy-loaded',
        preloaderClass: 'swiper-lazy-preloader',
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        lazy: {
          initialImageLoaded: false,
          load: Lazy.load.bind(swiper),
          loadInSlide: Lazy.loadInSlide.bind(swiper),
        },
      });
    },
    on: {
      beforeInit: function beforeInit() {
        var swiper = this;
        if (swiper.params.lazy.enabled && swiper.params.preloadImages) {
          swiper.params.preloadImages = false;
        }
      },
      init: function init() {
        var swiper = this;
        if (swiper.params.lazy.enabled && !swiper.params.loop && swiper.params.initialSlide === 0) {
          swiper.lazy.load();
        }
      },
      scroll: function scroll() {
        var swiper = this;
        if (swiper.params.freeMode && !swiper.params.freeModeSticky) {
          swiper.lazy.load();
        }
      },
      resize: function resize() {
        var swiper = this;
        if (swiper.params.lazy.enabled) {
          swiper.lazy.load();
        }
      },
      scrollbarDragMove: function scrollbarDragMove() {
        var swiper = this;
        if (swiper.params.lazy.enabled) {
          swiper.lazy.load();
        }
      },
      transitionStart: function transitionStart() {
        var swiper = this;
        if (swiper.params.lazy.enabled) {
          if (swiper.params.lazy.loadOnTransitionStart || (!swiper.params.lazy.loadOnTransitionStart && !swiper.lazy.initialImageLoaded)) {
            swiper.lazy.load();
          }
        }
      },
      transitionEnd: function transitionEnd() {
        var swiper = this;
        if (swiper.params.lazy.enabled && !swiper.params.lazy.loadOnTransitionStart) {
          swiper.lazy.load();
        }
      },
    },
  };

  /* eslint no-bitwise: ["error", { "allow": [">>"] }] */

  var Controller = {
    LinearSpline: function LinearSpline(x, y) {
      var binarySearch = (function search() {
        var maxIndex;
        var minIndex;
        var guess;
        return function (array, val) {
          minIndex = -1;
          maxIndex = array.length;
          while (maxIndex - minIndex > 1) {
            guess = maxIndex + minIndex >> 1;
            if (array[guess] <= val) {
              minIndex = guess;
            } else {
              maxIndex = guess;
            }
          }
          return maxIndex;
        };
      }());
      this.x = x;
      this.y = y;
      this.lastIndex = x.length - 1;
      // Given an x value (x2), return the expected y2 value:
      // (x1,y1) is the known point before given value,
      // (x3,y3) is the known point after given value.
      var i1;
      var i3;

      this.interpolate = function interpolate(x2) {
        if (!x2) { return 0; }

        // Get the indexes of x1 and x3 (the array indexes before and after given x2):
        i3 = binarySearch(this.x, x2);
        i1 = i3 - 1;

        // We have our indexes i1 & i3, so we can calculate already:
        // y2 := ((x2−x1) × (y3−y1)) ÷ (x3−x1) + y1
        return (((x2 - this.x[i1]) * (this.y[i3] - this.y[i1])) / (this.x[i3] - this.x[i1])) + this.y[i1];
      };
      return this;
    },
    // xxx: for now i will just save one spline function to to
    getInterpolateFunction: function getInterpolateFunction(c) {
      var swiper = this;
      if (!swiper.controller.spline) {
        swiper.controller.spline = swiper.params.loop
          ? new Controller.LinearSpline(swiper.slidesGrid, c.slidesGrid)
          : new Controller.LinearSpline(swiper.snapGrid, c.snapGrid);
      }
    },
    setTranslate: function setTranslate(setTranslate$1, byController) {
      var swiper = this;
      var controlled = swiper.controller.control;
      var multiplier;
      var controlledTranslate;
      function setControlledTranslate(c) {
        // this will create an Interpolate function based on the snapGrids
        // x is the Grid of the scrolled scroller and y will be the controlled scroller
        // it makes sense to create this only once and recall it for the interpolation
        // the function does a lot of value caching for performance
        var translate = swiper.rtlTranslate ? -swiper.translate : swiper.translate;
        if (swiper.params.controller.by === 'slide') {
          swiper.controller.getInterpolateFunction(c);
          // i am not sure why the values have to be multiplicated this way, tried to invert the snapGrid
          // but it did not work out
          controlledTranslate = -swiper.controller.spline.interpolate(-translate);
        }

        if (!controlledTranslate || swiper.params.controller.by === 'container') {
          multiplier = (c.maxTranslate() - c.minTranslate()) / (swiper.maxTranslate() - swiper.minTranslate());
          controlledTranslate = ((translate - swiper.minTranslate()) * multiplier) + c.minTranslate();
        }

        if (swiper.params.controller.inverse) {
          controlledTranslate = c.maxTranslate() - controlledTranslate;
        }
        c.updateProgress(controlledTranslate);
        c.setTranslate(controlledTranslate, swiper);
        c.updateActiveIndex();
        c.updateSlidesClasses();
      }
      if (Array.isArray(controlled)) {
        for (var i = 0; i < controlled.length; i += 1) {
          if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
            setControlledTranslate(controlled[i]);
          }
        }
      } else if (controlled instanceof Swiper && byController !== controlled) {
        setControlledTranslate(controlled);
      }
    },
    setTransition: function setTransition(duration, byController) {
      var swiper = this;
      var controlled = swiper.controller.control;
      var i;
      function setControlledTransition(c) {
        c.setTransition(duration, swiper);
        if (duration !== 0) {
          c.transitionStart();
          if (c.params.autoHeight) {
            Utils.nextTick(function () {
              c.updateAutoHeight();
            });
          }
          c.$wrapperEl.transitionEnd(function () {
            if (!controlled) { return; }
            if (c.params.loop && swiper.params.controller.by === 'slide') {
              c.loopFix();
            }
            c.transitionEnd();
          });
        }
      }
      if (Array.isArray(controlled)) {
        for (i = 0; i < controlled.length; i += 1) {
          if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
            setControlledTransition(controlled[i]);
          }
        }
      } else if (controlled instanceof Swiper && byController !== controlled) {
        setControlledTransition(controlled);
      }
    },
  };
  var Controller$1 = {
    name: 'controller',
    params: {
      controller: {
        control: undefined,
        inverse: false,
        by: 'slide', // or 'container'
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        controller: {
          control: swiper.params.controller.control,
          getInterpolateFunction: Controller.getInterpolateFunction.bind(swiper),
          setTranslate: Controller.setTranslate.bind(swiper),
          setTransition: Controller.setTransition.bind(swiper),
        },
      });
    },
    on: {
      update: function update() {
        var swiper = this;
        if (!swiper.controller.control) { return; }
        if (swiper.controller.spline) {
          swiper.controller.spline = undefined;
          delete swiper.controller.spline;
        }
      },
      resize: function resize() {
        var swiper = this;
        if (!swiper.controller.control) { return; }
        if (swiper.controller.spline) {
          swiper.controller.spline = undefined;
          delete swiper.controller.spline;
        }
      },
      observerUpdate: function observerUpdate() {
        var swiper = this;
        if (!swiper.controller.control) { return; }
        if (swiper.controller.spline) {
          swiper.controller.spline = undefined;
          delete swiper.controller.spline;
        }
      },
      setTranslate: function setTranslate(translate, byController) {
        var swiper = this;
        if (!swiper.controller.control) { return; }
        swiper.controller.setTranslate(translate, byController);
      },
      setTransition: function setTransition(duration, byController) {
        var swiper = this;
        if (!swiper.controller.control) { return; }
        swiper.controller.setTransition(duration, byController);
      },
    },
  };

  var a11y = {
    makeElFocusable: function makeElFocusable($el) {
      $el.attr('tabIndex', '0');
      return $el;
    },
    addElRole: function addElRole($el, role) {
      $el.attr('role', role);
      return $el;
    },
    addElLabel: function addElLabel($el, label) {
      $el.attr('aria-label', label);
      return $el;
    },
    disableEl: function disableEl($el) {
      $el.attr('aria-disabled', true);
      return $el;
    },
    enableEl: function enableEl($el) {
      $el.attr('aria-disabled', false);
      return $el;
    },
    onEnterKey: function onEnterKey(e) {
      var swiper = this;
      var params = swiper.params.a11y;
      if (e.keyCode !== 13) { return; }
      var $targetEl = $(e.target);
      if (swiper.navigation && swiper.navigation.$nextEl && $targetEl.is(swiper.navigation.$nextEl)) {
        if (!(swiper.isEnd && !swiper.params.loop)) {
          swiper.slideNext();
        }
        if (swiper.isEnd) {
          swiper.a11y.notify(params.lastSlideMessage);
        } else {
          swiper.a11y.notify(params.nextSlideMessage);
        }
      }
      if (swiper.navigation && swiper.navigation.$prevEl && $targetEl.is(swiper.navigation.$prevEl)) {
        if (!(swiper.isBeginning && !swiper.params.loop)) {
          swiper.slidePrev();
        }
        if (swiper.isBeginning) {
          swiper.a11y.notify(params.firstSlideMessage);
        } else {
          swiper.a11y.notify(params.prevSlideMessage);
        }
      }
      if (swiper.pagination && $targetEl.is(("." + (swiper.params.pagination.bulletClass)))) {
        $targetEl[0].click();
      }
    },
    notify: function notify(message) {
      var swiper = this;
      var notification = swiper.a11y.liveRegion;
      if (notification.length === 0) { return; }
      notification.html('');
      notification.html(message);
    },
    updateNavigation: function updateNavigation() {
      var swiper = this;

      if (swiper.params.loop) { return; }
      var ref = swiper.navigation;
      var $nextEl = ref.$nextEl;
      var $prevEl = ref.$prevEl;

      if ($prevEl && $prevEl.length > 0) {
        if (swiper.isBeginning) {
          swiper.a11y.disableEl($prevEl);
        } else {
          swiper.a11y.enableEl($prevEl);
        }
      }
      if ($nextEl && $nextEl.length > 0) {
        if (swiper.isEnd) {
          swiper.a11y.disableEl($nextEl);
        } else {
          swiper.a11y.enableEl($nextEl);
        }
      }
    },
    updatePagination: function updatePagination() {
      var swiper = this;
      var params = swiper.params.a11y;
      if (swiper.pagination && swiper.params.pagination.clickable && swiper.pagination.bullets && swiper.pagination.bullets.length) {
        swiper.pagination.bullets.each(function (bulletIndex, bulletEl) {
          var $bulletEl = $(bulletEl);
          swiper.a11y.makeElFocusable($bulletEl);
          swiper.a11y.addElRole($bulletEl, 'button');
          swiper.a11y.addElLabel($bulletEl, params.paginationBulletMessage.replace(/{{index}}/, $bulletEl.index() + 1));
        });
      }
    },
    init: function init() {
      var swiper = this;

      swiper.$el.append(swiper.a11y.liveRegion);

      // Navigation
      var params = swiper.params.a11y;
      var $nextEl;
      var $prevEl;
      if (swiper.navigation && swiper.navigation.$nextEl) {
        $nextEl = swiper.navigation.$nextEl;
      }
      if (swiper.navigation && swiper.navigation.$prevEl) {
        $prevEl = swiper.navigation.$prevEl;
      }
      if ($nextEl) {
        swiper.a11y.makeElFocusable($nextEl);
        swiper.a11y.addElRole($nextEl, 'button');
        swiper.a11y.addElLabel($nextEl, params.nextSlideMessage);
        $nextEl.on('keydown', swiper.a11y.onEnterKey);
      }
      if ($prevEl) {
        swiper.a11y.makeElFocusable($prevEl);
        swiper.a11y.addElRole($prevEl, 'button');
        swiper.a11y.addElLabel($prevEl, params.prevSlideMessage);
        $prevEl.on('keydown', swiper.a11y.onEnterKey);
      }

      // Pagination
      if (swiper.pagination && swiper.params.pagination.clickable && swiper.pagination.bullets && swiper.pagination.bullets.length) {
        swiper.pagination.$el.on('keydown', ("." + (swiper.params.pagination.bulletClass)), swiper.a11y.onEnterKey);
      }
    },
    destroy: function destroy() {
      var swiper = this;
      if (swiper.a11y.liveRegion && swiper.a11y.liveRegion.length > 0) { swiper.a11y.liveRegion.remove(); }

      var $nextEl;
      var $prevEl;
      if (swiper.navigation && swiper.navigation.$nextEl) {
        $nextEl = swiper.navigation.$nextEl;
      }
      if (swiper.navigation && swiper.navigation.$prevEl) {
        $prevEl = swiper.navigation.$prevEl;
      }
      if ($nextEl) {
        $nextEl.off('keydown', swiper.a11y.onEnterKey);
      }
      if ($prevEl) {
        $prevEl.off('keydown', swiper.a11y.onEnterKey);
      }

      // Pagination
      if (swiper.pagination && swiper.params.pagination.clickable && swiper.pagination.bullets && swiper.pagination.bullets.length) {
        swiper.pagination.$el.off('keydown', ("." + (swiper.params.pagination.bulletClass)), swiper.a11y.onEnterKey);
      }
    },
  };
  var A11y = {
    name: 'a11y',
    params: {
      a11y: {
        enabled: true,
        notificationClass: 'swiper-notification',
        prevSlideMessage: 'Previous slide',
        nextSlideMessage: 'Next slide',
        firstSlideMessage: 'This is the first slide',
        lastSlideMessage: 'This is the last slide',
        paginationBulletMessage: 'Go to slide {{index}}',
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        a11y: {
          liveRegion: $(("<span class=\"" + (swiper.params.a11y.notificationClass) + "\" aria-live=\"assertive\" aria-atomic=\"true\"></span>")),
        },
      });
      Object.keys(a11y).forEach(function (methodName) {
        swiper.a11y[methodName] = a11y[methodName].bind(swiper);
      });
    },
    on: {
      init: function init() {
        var swiper = this;
        if (!swiper.params.a11y.enabled) { return; }
        swiper.a11y.init();
        swiper.a11y.updateNavigation();
      },
      toEdge: function toEdge() {
        var swiper = this;
        if (!swiper.params.a11y.enabled) { return; }
        swiper.a11y.updateNavigation();
      },
      fromEdge: function fromEdge() {
        var swiper = this;
        if (!swiper.params.a11y.enabled) { return; }
        swiper.a11y.updateNavigation();
      },
      paginationUpdate: function paginationUpdate() {
        var swiper = this;
        if (!swiper.params.a11y.enabled) { return; }
        swiper.a11y.updatePagination();
      },
      destroy: function destroy() {
        var swiper = this;
        if (!swiper.params.a11y.enabled) { return; }
        swiper.a11y.destroy();
      },
    },
  };

  var History = {
    init: function init() {
      var swiper = this;
      if (!swiper.params.history) { return; }
      if (!win.history || !win.history.pushState) {
        swiper.params.history.enabled = false;
        swiper.params.hashNavigation.enabled = true;
        return;
      }
      var history = swiper.history;
      history.initialized = true;
      history.paths = History.getPathValues();
      if (!history.paths.key && !history.paths.value) { return; }
      history.scrollToSlide(0, history.paths.value, swiper.params.runCallbacksOnInit);
      if (!swiper.params.history.replaceState) {
        win.addEventListener('popstate', swiper.history.setHistoryPopState);
      }
    },
    destroy: function destroy() {
      var swiper = this;
      if (!swiper.params.history.replaceState) {
        win.removeEventListener('popstate', swiper.history.setHistoryPopState);
      }
    },
    setHistoryPopState: function setHistoryPopState() {
      var swiper = this;
      swiper.history.paths = History.getPathValues();
      swiper.history.scrollToSlide(swiper.params.speed, swiper.history.paths.value, false);
    },
    getPathValues: function getPathValues() {
      var pathArray = win.location.pathname.slice(1).split('/').filter(function (part) { return part !== ''; });
      var total = pathArray.length;
      var key = pathArray[total - 2];
      var value = pathArray[total - 1];
      return { key: key, value: value };
    },
    setHistory: function setHistory(key, index) {
      var swiper = this;
      if (!swiper.history.initialized || !swiper.params.history.enabled) { return; }
      var slide = swiper.slides.eq(index);
      var value = History.slugify(slide.attr('data-history'));
      if (!win.location.pathname.includes(key)) {
        value = key + "/" + value;
      }
      var currentState = win.history.state;
      if (currentState && currentState.value === value) {
        return;
      }
      if (swiper.params.history.replaceState) {
        win.history.replaceState({ value: value }, null, value);
      } else {
        win.history.pushState({ value: value }, null, value);
      }
    },
    slugify: function slugify(text) {
      return text.toString().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
    },
    scrollToSlide: function scrollToSlide(speed, value, runCallbacks) {
      var swiper = this;
      if (value) {
        for (var i = 0, length = swiper.slides.length; i < length; i += 1) {
          var slide = swiper.slides.eq(i);
          var slideHistory = History.slugify(slide.attr('data-history'));
          if (slideHistory === value && !slide.hasClass(swiper.params.slideDuplicateClass)) {
            var index = slide.index();
            swiper.slideTo(index, speed, runCallbacks);
          }
        }
      } else {
        swiper.slideTo(0, speed, runCallbacks);
      }
    },
  };

  var History$1 = {
    name: 'history',
    params: {
      history: {
        enabled: false,
        replaceState: false,
        key: 'slides',
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        history: {
          init: History.init.bind(swiper),
          setHistory: History.setHistory.bind(swiper),
          setHistoryPopState: History.setHistoryPopState.bind(swiper),
          scrollToSlide: History.scrollToSlide.bind(swiper),
          destroy: History.destroy.bind(swiper),
        },
      });
    },
    on: {
      init: function init() {
        var swiper = this;
        if (swiper.params.history.enabled) {
          swiper.history.init();
        }
      },
      destroy: function destroy() {
        var swiper = this;
        if (swiper.params.history.enabled) {
          swiper.history.destroy();
        }
      },
      transitionEnd: function transitionEnd() {
        var swiper = this;
        if (swiper.history.initialized) {
          swiper.history.setHistory(swiper.params.history.key, swiper.activeIndex);
        }
      },
    },
  };

  var HashNavigation = {
    onHashCange: function onHashCange() {
      var swiper = this;
      var newHash = doc.location.hash.replace('#', '');
      var activeSlideHash = swiper.slides.eq(swiper.activeIndex).attr('data-hash');
      if (newHash !== activeSlideHash) {
        var newIndex = swiper.$wrapperEl.children(("." + (swiper.params.slideClass) + "[data-hash=\"" + newHash + "\"]")).index();
        if (typeof newIndex === 'undefined') { return; }
        swiper.slideTo(newIndex);
      }
    },
    setHash: function setHash() {
      var swiper = this;
      if (!swiper.hashNavigation.initialized || !swiper.params.hashNavigation.enabled) { return; }
      if (swiper.params.hashNavigation.replaceState && win.history && win.history.replaceState) {
        win.history.replaceState(null, null, (("#" + (swiper.slides.eq(swiper.activeIndex).attr('data-hash'))) || ''));
      } else {
        var slide = swiper.slides.eq(swiper.activeIndex);
        var hash = slide.attr('data-hash') || slide.attr('data-history');
        doc.location.hash = hash || '';
      }
    },
    init: function init() {
      var swiper = this;
      if (!swiper.params.hashNavigation.enabled || (swiper.params.history && swiper.params.history.enabled)) { return; }
      swiper.hashNavigation.initialized = true;
      var hash = doc.location.hash.replace('#', '');
      if (hash) {
        var speed = 0;
        for (var i = 0, length = swiper.slides.length; i < length; i += 1) {
          var slide = swiper.slides.eq(i);
          var slideHash = slide.attr('data-hash') || slide.attr('data-history');
          if (slideHash === hash && !slide.hasClass(swiper.params.slideDuplicateClass)) {
            var index = slide.index();
            swiper.slideTo(index, speed, swiper.params.runCallbacksOnInit, true);
          }
        }
      }
      if (swiper.params.hashNavigation.watchState) {
        $(win).on('hashchange', swiper.hashNavigation.onHashCange);
      }
    },
    destroy: function destroy() {
      var swiper = this;
      if (swiper.params.hashNavigation.watchState) {
        $(win).off('hashchange', swiper.hashNavigation.onHashCange);
      }
    },
  };
  var HashNavigation$1 = {
    name: 'hash-navigation',
    params: {
      hashNavigation: {
        enabled: false,
        replaceState: false,
        watchState: false,
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        hashNavigation: {
          initialized: false,
          init: HashNavigation.init.bind(swiper),
          destroy: HashNavigation.destroy.bind(swiper),
          setHash: HashNavigation.setHash.bind(swiper),
          onHashCange: HashNavigation.onHashCange.bind(swiper),
        },
      });
    },
    on: {
      init: function init() {
        var swiper = this;
        if (swiper.params.hashNavigation.enabled) {
          swiper.hashNavigation.init();
        }
      },
      destroy: function destroy() {
        var swiper = this;
        if (swiper.params.hashNavigation.enabled) {
          swiper.hashNavigation.destroy();
        }
      },
      transitionEnd: function transitionEnd() {
        var swiper = this;
        if (swiper.hashNavigation.initialized) {
          swiper.hashNavigation.setHash();
        }
      },
    },
  };

  /* eslint no-underscore-dangle: "off" */

  var Autoplay = {
    run: function run() {
      var swiper = this;
      var $activeSlideEl = swiper.slides.eq(swiper.activeIndex);
      var delay = swiper.params.autoplay.delay;
      if ($activeSlideEl.attr('data-swiper-autoplay')) {
        delay = $activeSlideEl.attr('data-swiper-autoplay') || swiper.params.autoplay.delay;
      }
      swiper.autoplay.timeout = Utils.nextTick(function () {
        if (swiper.params.autoplay.reverseDirection) {
          if (swiper.params.loop) {
            swiper.loopFix();
            swiper.slidePrev(swiper.params.speed, true, true);
            swiper.emit('autoplay');
          } else if (!swiper.isBeginning) {
            swiper.slidePrev(swiper.params.speed, true, true);
            swiper.emit('autoplay');
          } else if (!swiper.params.autoplay.stopOnLastSlide) {
            swiper.slideTo(swiper.slides.length - 1, swiper.params.speed, true, true);
            swiper.emit('autoplay');
          } else {
            swiper.autoplay.stop();
          }
        } else if (swiper.params.loop) {
          swiper.loopFix();
          swiper.slideNext(swiper.params.speed, true, true);
          swiper.emit('autoplay');
        } else if (!swiper.isEnd) {
          swiper.slideNext(swiper.params.speed, true, true);
          swiper.emit('autoplay');
        } else if (!swiper.params.autoplay.stopOnLastSlide) {
          swiper.slideTo(0, swiper.params.speed, true, true);
          swiper.emit('autoplay');
        } else {
          swiper.autoplay.stop();
        }
      }, delay);
    },
    start: function start() {
      var swiper = this;
      if (typeof swiper.autoplay.timeout !== 'undefined') { return false; }
      if (swiper.autoplay.running) { return false; }
      swiper.autoplay.running = true;
      swiper.emit('autoplayStart');
      swiper.autoplay.run();
      return true;
    },
    stop: function stop() {
      var swiper = this;
      if (!swiper.autoplay.running) { return false; }
      if (typeof swiper.autoplay.timeout === 'undefined') { return false; }

      if (swiper.autoplay.timeout) {
        clearTimeout(swiper.autoplay.timeout);
        swiper.autoplay.timeout = undefined;
      }
      swiper.autoplay.running = false;
      swiper.emit('autoplayStop');
      return true;
    },
    pause: function pause(speed) {
      var swiper = this;
      if (!swiper.autoplay.running) { return; }
      if (swiper.autoplay.paused) { return; }
      if (swiper.autoplay.timeout) { clearTimeout(swiper.autoplay.timeout); }
      swiper.autoplay.paused = true;
      if (speed === 0 || !swiper.params.autoplay.waitForTransition) {
        swiper.autoplay.paused = false;
        swiper.autoplay.run();
      } else {
        swiper.$wrapperEl[0].addEventListener('transitionend', swiper.autoplay.onTransitionEnd);
        swiper.$wrapperEl[0].addEventListener('webkitTransitionEnd', swiper.autoplay.onTransitionEnd);
      }
    },
  };

  var Autoplay$1 = {
    name: 'autoplay',
    params: {
      autoplay: {
        enabled: false,
        delay: 3000,
        waitForTransition: true,
        disableOnInteraction: true,
        stopOnLastSlide: false,
        reverseDirection: false,
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        autoplay: {
          running: false,
          paused: false,
          run: Autoplay.run.bind(swiper),
          start: Autoplay.start.bind(swiper),
          stop: Autoplay.stop.bind(swiper),
          pause: Autoplay.pause.bind(swiper),
          onTransitionEnd: function onTransitionEnd(e) {
            if (!swiper || swiper.destroyed || !swiper.$wrapperEl) { return; }
            if (e.target !== this) { return; }
            swiper.$wrapperEl[0].removeEventListener('transitionend', swiper.autoplay.onTransitionEnd);
            swiper.$wrapperEl[0].removeEventListener('webkitTransitionEnd', swiper.autoplay.onTransitionEnd);
            swiper.autoplay.paused = false;
            if (!swiper.autoplay.running) {
              swiper.autoplay.stop();
            } else {
              swiper.autoplay.run();
            }
          },
        },
      });
    },
    on: {
      init: function init() {
        var swiper = this;
        if (swiper.params.autoplay.enabled) {
          swiper.autoplay.start();
        }
      },
      beforeTransitionStart: function beforeTransitionStart(speed, internal) {
        var swiper = this;
        if (swiper.autoplay.running) {
          if (internal || !swiper.params.autoplay.disableOnInteraction) {
            swiper.autoplay.pause(speed);
          } else {
            swiper.autoplay.stop();
          }
        }
      },
      sliderFirstMove: function sliderFirstMove() {
        var swiper = this;
        if (swiper.autoplay.running) {
          if (swiper.params.autoplay.disableOnInteraction) {
            swiper.autoplay.stop();
          } else {
            swiper.autoplay.pause();
          }
        }
      },
      destroy: function destroy() {
        var swiper = this;
        if (swiper.autoplay.running) {
          swiper.autoplay.stop();
        }
      },
    },
  };

  var Fade = {
    setTranslate: function setTranslate() {
      var swiper = this;
      var slides = swiper.slides;
      for (var i = 0; i < slides.length; i += 1) {
        var $slideEl = swiper.slides.eq(i);
        var offset = $slideEl[0].swiperSlideOffset;
        var tx = -offset;
        if (!swiper.params.virtualTranslate) { tx -= swiper.translate; }
        var ty = 0;
        if (!swiper.isHorizontal()) {
          ty = tx;
          tx = 0;
        }
        var slideOpacity = swiper.params.fadeEffect.crossFade
          ? Math.max(1 - Math.abs($slideEl[0].progress), 0)
          : 1 + Math.min(Math.max($slideEl[0].progress, -1), 0);
        $slideEl
          .css({
            opacity: slideOpacity,
          })
          .transform(("translate3d(" + tx + "px, " + ty + "px, 0px)"));
      }
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      var slides = swiper.slides;
      var $wrapperEl = swiper.$wrapperEl;
      slides.transition(duration);
      if (swiper.params.virtualTranslate && duration !== 0) {
        var eventTriggered = false;
        slides.transitionEnd(function () {
          if (eventTriggered) { return; }
          if (!swiper || swiper.destroyed) { return; }
          eventTriggered = true;
          swiper.animating = false;
          var triggerEvents = ['webkitTransitionEnd', 'transitionend'];
          for (var i = 0; i < triggerEvents.length; i += 1) {
            $wrapperEl.trigger(triggerEvents[i]);
          }
        });
      }
    },
  };

  var EffectFade = {
    name: 'effect-fade',
    params: {
      fadeEffect: {
        crossFade: false,
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        fadeEffect: {
          setTranslate: Fade.setTranslate.bind(swiper),
          setTransition: Fade.setTransition.bind(swiper),
        },
      });
    },
    on: {
      beforeInit: function beforeInit() {
        var swiper = this;
        if (swiper.params.effect !== 'fade') { return; }
        swiper.classNames.push(((swiper.params.containerModifierClass) + "fade"));
        var overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          spaceBetween: 0,
          virtualTranslate: true,
        };
        Utils.extend(swiper.params, overwriteParams);
        Utils.extend(swiper.originalParams, overwriteParams);
      },
      setTranslate: function setTranslate() {
        var swiper = this;
        if (swiper.params.effect !== 'fade') { return; }
        swiper.fadeEffect.setTranslate();
      },
      setTransition: function setTransition(duration) {
        var swiper = this;
        if (swiper.params.effect !== 'fade') { return; }
        swiper.fadeEffect.setTransition(duration);
      },
    },
  };

  var Cube = {
    setTranslate: function setTranslate() {
      var swiper = this;
      var $el = swiper.$el;
      var $wrapperEl = swiper.$wrapperEl;
      var slides = swiper.slides;
      var swiperWidth = swiper.width;
      var swiperHeight = swiper.height;
      var rtl = swiper.rtlTranslate;
      var swiperSize = swiper.size;
      var params = swiper.params.cubeEffect;
      var isHorizontal = swiper.isHorizontal();
      var isVirtual = swiper.virtual && swiper.params.virtual.enabled;
      var wrapperRotate = 0;
      var $cubeShadowEl;
      if (params.shadow) {
        if (isHorizontal) {
          $cubeShadowEl = $wrapperEl.find('.swiper-cube-shadow');
          if ($cubeShadowEl.length === 0) {
            $cubeShadowEl = $('<div class="swiper-cube-shadow"></div>');
            $wrapperEl.append($cubeShadowEl);
          }
          $cubeShadowEl.css({ height: (swiperWidth + "px") });
        } else {
          $cubeShadowEl = $el.find('.swiper-cube-shadow');
          if ($cubeShadowEl.length === 0) {
            $cubeShadowEl = $('<div class="swiper-cube-shadow"></div>');
            $el.append($cubeShadowEl);
          }
        }
      }
      for (var i = 0; i < slides.length; i += 1) {
        var $slideEl = slides.eq(i);
        var slideIndex = i;
        if (isVirtual) {
          slideIndex = parseInt($slideEl.attr('data-swiper-slide-index'), 10);
        }
        var slideAngle = slideIndex * 90;
        var round = Math.floor(slideAngle / 360);
        if (rtl) {
          slideAngle = -slideAngle;
          round = Math.floor(-slideAngle / 360);
        }
        var progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
        var tx = 0;
        var ty = 0;
        var tz = 0;
        if (slideIndex % 4 === 0) {
          tx = -round * 4 * swiperSize;
          tz = 0;
        } else if ((slideIndex - 1) % 4 === 0) {
          tx = 0;
          tz = -round * 4 * swiperSize;
        } else if ((slideIndex - 2) % 4 === 0) {
          tx = swiperSize + (round * 4 * swiperSize);
          tz = swiperSize;
        } else if ((slideIndex - 3) % 4 === 0) {
          tx = -swiperSize;
          tz = (3 * swiperSize) + (swiperSize * 4 * round);
        }
        if (rtl) {
          tx = -tx;
        }

        if (!isHorizontal) {
          ty = tx;
          tx = 0;
        }

        var transform = "rotateX(" + (isHorizontal ? 0 : -slideAngle) + "deg) rotateY(" + (isHorizontal ? slideAngle : 0) + "deg) translate3d(" + tx + "px, " + ty + "px, " + tz + "px)";
        if (progress <= 1 && progress > -1) {
          wrapperRotate = (slideIndex * 90) + (progress * 90);
          if (rtl) { wrapperRotate = (-slideIndex * 90) - (progress * 90); }
        }
        $slideEl.transform(transform);
        if (params.slideShadows) {
          // Set shadows
          var shadowBefore = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
          var shadowAfter = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
          if (shadowBefore.length === 0) {
            shadowBefore = $(("<div class=\"swiper-slide-shadow-" + (isHorizontal ? 'left' : 'top') + "\"></div>"));
            $slideEl.append(shadowBefore);
          }
          if (shadowAfter.length === 0) {
            shadowAfter = $(("<div class=\"swiper-slide-shadow-" + (isHorizontal ? 'right' : 'bottom') + "\"></div>"));
            $slideEl.append(shadowAfter);
          }
          if (shadowBefore.length) { shadowBefore[0].style.opacity = Math.max(-progress, 0); }
          if (shadowAfter.length) { shadowAfter[0].style.opacity = Math.max(progress, 0); }
        }
      }
      $wrapperEl.css({
        '-webkit-transform-origin': ("50% 50% -" + (swiperSize / 2) + "px"),
        '-moz-transform-origin': ("50% 50% -" + (swiperSize / 2) + "px"),
        '-ms-transform-origin': ("50% 50% -" + (swiperSize / 2) + "px"),
        'transform-origin': ("50% 50% -" + (swiperSize / 2) + "px"),
      });

      if (params.shadow) {
        if (isHorizontal) {
          $cubeShadowEl.transform(("translate3d(0px, " + ((swiperWidth / 2) + params.shadowOffset) + "px, " + (-swiperWidth / 2) + "px) rotateX(90deg) rotateZ(0deg) scale(" + (params.shadowScale) + ")"));
        } else {
          var shadowAngle = Math.abs(wrapperRotate) - (Math.floor(Math.abs(wrapperRotate) / 90) * 90);
          var multiplier = 1.5 - (
            (Math.sin((shadowAngle * 2 * Math.PI) / 360) / 2)
            + (Math.cos((shadowAngle * 2 * Math.PI) / 360) / 2)
          );
          var scale1 = params.shadowScale;
          var scale2 = params.shadowScale / multiplier;
          var offset = params.shadowOffset;
          $cubeShadowEl.transform(("scale3d(" + scale1 + ", 1, " + scale2 + ") translate3d(0px, " + ((swiperHeight / 2) + offset) + "px, " + (-swiperHeight / 2 / scale2) + "px) rotateX(-90deg)"));
        }
      }
      var zFactor = (Browser.isSafari || Browser.isUiWebView) ? (-swiperSize / 2) : 0;
      $wrapperEl
        .transform(("translate3d(0px,0," + zFactor + "px) rotateX(" + (swiper.isHorizontal() ? 0 : wrapperRotate) + "deg) rotateY(" + (swiper.isHorizontal() ? -wrapperRotate : 0) + "deg)"));
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      var $el = swiper.$el;
      var slides = swiper.slides;
      slides
        .transition(duration)
        .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
        .transition(duration);
      if (swiper.params.cubeEffect.shadow && !swiper.isHorizontal()) {
        $el.find('.swiper-cube-shadow').transition(duration);
      }
    },
  };

  var EffectCube = {
    name: 'effect-cube',
    params: {
      cubeEffect: {
        slideShadows: true,
        shadow: true,
        shadowOffset: 20,
        shadowScale: 0.94,
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        cubeEffect: {
          setTranslate: Cube.setTranslate.bind(swiper),
          setTransition: Cube.setTransition.bind(swiper),
        },
      });
    },
    on: {
      beforeInit: function beforeInit() {
        var swiper = this;
        if (swiper.params.effect !== 'cube') { return; }
        swiper.classNames.push(((swiper.params.containerModifierClass) + "cube"));
        swiper.classNames.push(((swiper.params.containerModifierClass) + "3d"));
        var overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          resistanceRatio: 0,
          spaceBetween: 0,
          centeredSlides: false,
          virtualTranslate: true,
        };
        Utils.extend(swiper.params, overwriteParams);
        Utils.extend(swiper.originalParams, overwriteParams);
      },
      setTranslate: function setTranslate() {
        var swiper = this;
        if (swiper.params.effect !== 'cube') { return; }
        swiper.cubeEffect.setTranslate();
      },
      setTransition: function setTransition(duration) {
        var swiper = this;
        if (swiper.params.effect !== 'cube') { return; }
        swiper.cubeEffect.setTransition(duration);
      },
    },
  };

  var Flip = {
    setTranslate: function setTranslate() {
      var swiper = this;
      var slides = swiper.slides;
      var rtl = swiper.rtlTranslate;
      for (var i = 0; i < slides.length; i += 1) {
        var $slideEl = slides.eq(i);
        var progress = $slideEl[0].progress;
        if (swiper.params.flipEffect.limitRotation) {
          progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
        }
        var offset = $slideEl[0].swiperSlideOffset;
        var rotate = -180 * progress;
        var rotateY = rotate;
        var rotateX = 0;
        var tx = -offset;
        var ty = 0;
        if (!swiper.isHorizontal()) {
          ty = tx;
          tx = 0;
          rotateX = -rotateY;
          rotateY = 0;
        } else if (rtl) {
          rotateY = -rotateY;
        }

        $slideEl[0].style.zIndex = -Math.abs(Math.round(progress)) + slides.length;

        if (swiper.params.flipEffect.slideShadows) {
          // Set shadows
          var shadowBefore = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
          var shadowAfter = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
          if (shadowBefore.length === 0) {
            shadowBefore = $(("<div class=\"swiper-slide-shadow-" + (swiper.isHorizontal() ? 'left' : 'top') + "\"></div>"));
            $slideEl.append(shadowBefore);
          }
          if (shadowAfter.length === 0) {
            shadowAfter = $(("<div class=\"swiper-slide-shadow-" + (swiper.isHorizontal() ? 'right' : 'bottom') + "\"></div>"));
            $slideEl.append(shadowAfter);
          }
          if (shadowBefore.length) { shadowBefore[0].style.opacity = Math.max(-progress, 0); }
          if (shadowAfter.length) { shadowAfter[0].style.opacity = Math.max(progress, 0); }
        }
        $slideEl
          .transform(("translate3d(" + tx + "px, " + ty + "px, 0px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)"));
      }
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      var slides = swiper.slides;
      var activeIndex = swiper.activeIndex;
      var $wrapperEl = swiper.$wrapperEl;
      slides
        .transition(duration)
        .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
        .transition(duration);
      if (swiper.params.virtualTranslate && duration !== 0) {
        var eventTriggered = false;
        // eslint-disable-next-line
        slides.eq(activeIndex).transitionEnd(function onTransitionEnd() {
          if (eventTriggered) { return; }
          if (!swiper || swiper.destroyed) { return; }
          // if (!$(this).hasClass(swiper.params.slideActiveClass)) return;
          eventTriggered = true;
          swiper.animating = false;
          var triggerEvents = ['webkitTransitionEnd', 'transitionend'];
          for (var i = 0; i < triggerEvents.length; i += 1) {
            $wrapperEl.trigger(triggerEvents[i]);
          }
        });
      }
    },
  };

  var EffectFlip = {
    name: 'effect-flip',
    params: {
      flipEffect: {
        slideShadows: true,
        limitRotation: true,
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        flipEffect: {
          setTranslate: Flip.setTranslate.bind(swiper),
          setTransition: Flip.setTransition.bind(swiper),
        },
      });
    },
    on: {
      beforeInit: function beforeInit() {
        var swiper = this;
        if (swiper.params.effect !== 'flip') { return; }
        swiper.classNames.push(((swiper.params.containerModifierClass) + "flip"));
        swiper.classNames.push(((swiper.params.containerModifierClass) + "3d"));
        var overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          spaceBetween: 0,
          virtualTranslate: true,
        };
        Utils.extend(swiper.params, overwriteParams);
        Utils.extend(swiper.originalParams, overwriteParams);
      },
      setTranslate: function setTranslate() {
        var swiper = this;
        if (swiper.params.effect !== 'flip') { return; }
        swiper.flipEffect.setTranslate();
      },
      setTransition: function setTransition(duration) {
        var swiper = this;
        if (swiper.params.effect !== 'flip') { return; }
        swiper.flipEffect.setTransition(duration);
      },
    },
  };

  var Coverflow = {
    setTranslate: function setTranslate() {
      var swiper = this;
      var swiperWidth = swiper.width;
      var swiperHeight = swiper.height;
      var slides = swiper.slides;
      var $wrapperEl = swiper.$wrapperEl;
      var slidesSizesGrid = swiper.slidesSizesGrid;
      var params = swiper.params.coverflowEffect;
      var isHorizontal = swiper.isHorizontal();
      var transform = swiper.translate;
      var center = isHorizontal ? -transform + (swiperWidth / 2) : -transform + (swiperHeight / 2);
      var rotate = isHorizontal ? params.rotate : -params.rotate;
      var translate = params.depth;
      // Each slide offset from center
      for (var i = 0, length = slides.length; i < length; i += 1) {
        var $slideEl = slides.eq(i);
        var slideSize = slidesSizesGrid[i];
        var slideOffset = $slideEl[0].swiperSlideOffset;
        var offsetMultiplier = ((center - slideOffset - (slideSize / 2)) / slideSize) * params.modifier;

        var rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
        var rotateX = isHorizontal ? 0 : rotate * offsetMultiplier;
        // var rotateZ = 0
        var translateZ = -translate * Math.abs(offsetMultiplier);

        var translateY = isHorizontal ? 0 : params.stretch * (offsetMultiplier);
        var translateX = isHorizontal ? params.stretch * (offsetMultiplier) : 0;

        // Fix for ultra small values
        if (Math.abs(translateX) < 0.001) { translateX = 0; }
        if (Math.abs(translateY) < 0.001) { translateY = 0; }
        if (Math.abs(translateZ) < 0.001) { translateZ = 0; }
        if (Math.abs(rotateY) < 0.001) { rotateY = 0; }
        if (Math.abs(rotateX) < 0.001) { rotateX = 0; }

        var slideTransform = "translate3d(" + translateX + "px," + translateY + "px," + translateZ + "px)  rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)";

        $slideEl.transform(slideTransform);
        $slideEl[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
        if (params.slideShadows) {
          // Set shadows
          var $shadowBeforeEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
          var $shadowAfterEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
          if ($shadowBeforeEl.length === 0) {
            $shadowBeforeEl = $(("<div class=\"swiper-slide-shadow-" + (isHorizontal ? 'left' : 'top') + "\"></div>"));
            $slideEl.append($shadowBeforeEl);
          }
          if ($shadowAfterEl.length === 0) {
            $shadowAfterEl = $(("<div class=\"swiper-slide-shadow-" + (isHorizontal ? 'right' : 'bottom') + "\"></div>"));
            $slideEl.append($shadowAfterEl);
          }
          if ($shadowBeforeEl.length) { $shadowBeforeEl[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0; }
          if ($shadowAfterEl.length) { $shadowAfterEl[0].style.opacity = (-offsetMultiplier) > 0 ? -offsetMultiplier : 0; }
        }
      }

      // Set correct perspective for IE10
      if (Support.pointerEvents || Support.prefixedPointerEvents) {
        var ws = $wrapperEl[0].style;
        ws.perspectiveOrigin = center + "px 50%";
      }
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      swiper.slides
        .transition(duration)
        .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
        .transition(duration);
    },
  };

  var EffectCoverflow = {
    name: 'effect-coverflow',
    params: {
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        coverflowEffect: {
          setTranslate: Coverflow.setTranslate.bind(swiper),
          setTransition: Coverflow.setTransition.bind(swiper),
        },
      });
    },
    on: {
      beforeInit: function beforeInit() {
        var swiper = this;
        if (swiper.params.effect !== 'coverflow') { return; }

        swiper.classNames.push(((swiper.params.containerModifierClass) + "coverflow"));
        swiper.classNames.push(((swiper.params.containerModifierClass) + "3d"));

        swiper.params.watchSlidesProgress = true;
        swiper.originalParams.watchSlidesProgress = true;
      },
      setTranslate: function setTranslate() {
        var swiper = this;
        if (swiper.params.effect !== 'coverflow') { return; }
        swiper.coverflowEffect.setTranslate();
      },
      setTransition: function setTransition(duration) {
        var swiper = this;
        if (swiper.params.effect !== 'coverflow') { return; }
        swiper.coverflowEffect.setTransition(duration);
      },
    },
  };

  var Thumbs = {
    init: function init() {
      var swiper = this;
      var ref = swiper.params;
      var thumbsParams = ref.thumbs;
      var SwiperClass = swiper.constructor;
      if (thumbsParams.swiper instanceof SwiperClass) {
        swiper.thumbs.swiper = thumbsParams.swiper;
        Utils.extend(swiper.thumbs.swiper.originalParams, {
          watchSlidesProgress: true,
          slideToClickedSlide: false,
        });
        Utils.extend(swiper.thumbs.swiper.params, {
          watchSlidesProgress: true,
          slideToClickedSlide: false,
        });
      } else if (Utils.isObject(thumbsParams.swiper)) {
        swiper.thumbs.swiper = new SwiperClass(Utils.extend({}, thumbsParams.swiper, {
          watchSlidesVisibility: true,
          watchSlidesProgress: true,
          slideToClickedSlide: false,
        }));
        swiper.thumbs.swiperCreated = true;
      }
      swiper.thumbs.swiper.$el.addClass(swiper.params.thumbs.thumbsContainerClass);
      swiper.thumbs.swiper.on('tap', swiper.thumbs.onThumbClick);
    },
    onThumbClick: function onThumbClick() {
      var swiper = this;
      var thumbsSwiper = swiper.thumbs.swiper;
      if (!thumbsSwiper) { return; }
      var clickedIndex = thumbsSwiper.clickedIndex;
      if (typeof clickedIndex === 'undefined' || clickedIndex === null) { return; }
      var slideToIndex;
      if (thumbsSwiper.params.loop) {
        slideToIndex = parseInt($(thumbsSwiper.clickedSlide).attr('data-swiper-slide-index'), 10);
      } else {
        slideToIndex = clickedIndex;
      }
      if (swiper.params.loop) {
        var currentIndex = swiper.activeIndex;
        if (swiper.slides.eq(currentIndex).hasClass(swiper.params.slideDuplicateClass)) {
          swiper.loopFix();
          // eslint-disable-next-line
          swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
          currentIndex = swiper.activeIndex;
        }
        var prevIndex = swiper.slides.eq(currentIndex).prevAll(("[data-swiper-slide-index=\"" + slideToIndex + "\"]")).eq(0).index();
        var nextIndex = swiper.slides.eq(currentIndex).nextAll(("[data-swiper-slide-index=\"" + slideToIndex + "\"]")).eq(0).index();
        if (typeof prevIndex === 'undefined') { slideToIndex = nextIndex; }
        else if (typeof nextIndex === 'undefined') { slideToIndex = prevIndex; }
        else if (nextIndex - currentIndex < currentIndex - prevIndex) { slideToIndex = nextIndex; }
        else { slideToIndex = prevIndex; }
      }
      swiper.slideTo(slideToIndex);
    },
    update: function update(initial) {
      var swiper = this;
      var thumbsSwiper = swiper.thumbs.swiper;
      if (!thumbsSwiper) { return; }

      var slidesPerView = thumbsSwiper.params.slidesPerView === 'auto'
        ? thumbsSwiper.slidesPerViewDynamic()
        : thumbsSwiper.params.slidesPerView;

      if (swiper.realIndex !== thumbsSwiper.realIndex) {
        var currentThumbsIndex = thumbsSwiper.activeIndex;
        var newThumbsIndex;
        if (thumbsSwiper.params.loop) {
          if (thumbsSwiper.slides.eq(currentThumbsIndex).hasClass(thumbsSwiper.params.slideDuplicateClass)) {
            thumbsSwiper.loopFix();
            // eslint-disable-next-line
            thumbsSwiper._clientLeft = thumbsSwiper.$wrapperEl[0].clientLeft;
            currentThumbsIndex = thumbsSwiper.activeIndex;
          }
          // Find actual thumbs index to slide to
          var prevThumbsIndex = thumbsSwiper.slides.eq(currentThumbsIndex).prevAll(("[data-swiper-slide-index=\"" + (swiper.realIndex) + "\"]")).eq(0).index();
          var nextThumbsIndex = thumbsSwiper.slides.eq(currentThumbsIndex).nextAll(("[data-swiper-slide-index=\"" + (swiper.realIndex) + "\"]")).eq(0).index();
          if (typeof prevThumbsIndex === 'undefined') { newThumbsIndex = nextThumbsIndex; }
          else if (typeof nextThumbsIndex === 'undefined') { newThumbsIndex = prevThumbsIndex; }
          else if (nextThumbsIndex - currentThumbsIndex < currentThumbsIndex - prevThumbsIndex) { newThumbsIndex = nextThumbsIndex; }
          else { newThumbsIndex = prevThumbsIndex; }
        } else {
          newThumbsIndex = swiper.realIndex;
        }

        if (thumbsSwiper.visibleSlidesIndexes.indexOf(newThumbsIndex) < 0) {
          if (thumbsSwiper.params.centeredSlides) {
            if (newThumbsIndex > currentThumbsIndex) {
              newThumbsIndex = newThumbsIndex - Math.floor(slidesPerView / 2) + 1;
            } else {
              newThumbsIndex = newThumbsIndex + Math.floor(slidesPerView / 2) - 1;
            }
          } else if (newThumbsIndex > currentThumbsIndex) {
            newThumbsIndex = newThumbsIndex - slidesPerView + 1;
          }
          thumbsSwiper.slideTo(newThumbsIndex, initial ? 0 : undefined);
        }
      }

      // Activate thumbs
      var thumbsToActivate = 1;
      var thumbActiveClass = swiper.params.thumbs.slideThumbActiveClass;

      if (swiper.params.slidesPerView > 1 && !swiper.params.centeredSlides) {
        thumbsToActivate = swiper.params.slidesPerView;
      }

      thumbsSwiper.slides.removeClass(thumbActiveClass);
      if (thumbsSwiper.params.loop) {
        for (var i = 0; i < thumbsToActivate; i += 1) {
          thumbsSwiper.$wrapperEl.children(("[data-swiper-slide-index=\"" + (swiper.realIndex + i) + "\"]")).addClass(thumbActiveClass);
        }
      } else {
        for (var i$1 = 0; i$1 < thumbsToActivate; i$1 += 1) {
          thumbsSwiper.slides.eq(swiper.realIndex + i$1).addClass(thumbActiveClass);
        }
      }
    },
  };
  var Thumbs$1 = {
    name: 'thumbs',
    params: {
      thumbs: {
        swiper: null,
        slideThumbActiveClass: 'swiper-slide-thumb-active',
        thumbsContainerClass: 'swiper-container-thumbs',
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        thumbs: {
          swiper: null,
          init: Thumbs.init.bind(swiper),
          update: Thumbs.update.bind(swiper),
          onThumbClick: Thumbs.onThumbClick.bind(swiper),
        },
      });
    },
    on: {
      beforeInit: function beforeInit() {
        var swiper = this;
        var ref = swiper.params;
        var thumbs = ref.thumbs;
        if (!thumbs || !thumbs.swiper) { return; }
        swiper.thumbs.init();
        swiper.thumbs.update(true);
      },
      slideChange: function slideChange() {
        var swiper = this;
        if (!swiper.thumbs.swiper) { return; }
        swiper.thumbs.update();
      },
      update: function update() {
        var swiper = this;
        if (!swiper.thumbs.swiper) { return; }
        swiper.thumbs.update();
      },
      resize: function resize() {
        var swiper = this;
        if (!swiper.thumbs.swiper) { return; }
        swiper.thumbs.update();
      },
      observerUpdate: function observerUpdate() {
        var swiper = this;
        if (!swiper.thumbs.swiper) { return; }
        swiper.thumbs.update();
      },
      setTransition: function setTransition(duration) {
        var swiper = this;
        var thumbsSwiper = swiper.thumbs.swiper;
        if (!thumbsSwiper) { return; }
        thumbsSwiper.setTransition(duration);
      },
      beforeDestroy: function beforeDestroy() {
        var swiper = this;
        var thumbsSwiper = swiper.thumbs.swiper;
        if (!thumbsSwiper) { return; }
        if (swiper.thumbs.swiperCreated && thumbsSwiper) {
          thumbsSwiper.destroy();
        }
      },
    },
  };

  // Swiper Class

  var components = [
    Device$1,
    Support$1,
    Browser$1,
    Resize,
    Observer$1,
    Virtual$1,
    Keyboard$1,
    Mousewheel$1,
    Navigation$1,
    Pagination$1,
    Scrollbar$1,
    Parallax$1,
    Zoom$1,
    Lazy$1,
    Controller$1,
    A11y,
    History$1,
    HashNavigation$1,
    Autoplay$1,
    EffectFade,
    EffectCube,
    EffectFlip,
    EffectCoverflow,
    Thumbs$1
  ];

  if (typeof Swiper.use === 'undefined') {
    Swiper.use = Swiper.Class.use;
    Swiper.installModule = Swiper.Class.installModule;
  }

  Swiper.use(components);

  return Swiper;

})));

/**
 * Created by АНАСТАСИЯ on 11.12.2018.
 */
// Generated by CoffeeScript 1.6.2
/*
 jQuery Waypoints - v2.0.3
 Copyright (c) 2011-2013 Caleb Troughton
 Dual licensed under the MIT license and GPL license.
 https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt
 */
(function(){var t=[].indexOf||function(t){for(var e=0,n=this.length;e<n;e++){if(e in this&&this[e]===t)return e}return-1},e=[].slice;(function(t,e){if(typeof define==="function"&&define.amd){return define("waypoints",["jquery"],function(n){return e(n,t)})}else{return e(t.jQuery,t)}})(this,function(n,r){var i,o,l,s,f,u,a,c,h,d,p,y,v,w,g,m;i=n(r);c=t.call(r,"ontouchstart")>=0;s={horizontal:{},vertical:{}};f=1;a={};u="waypoints-context-id";p="resize.waypoints";y="scroll.waypoints";v=1;w="waypoints-waypoint-ids";g="waypoint";m="waypoints";o=function(){function t(t){var e=this;this.$element=t;this.element=t[0];this.didResize=false;this.didScroll=false;this.id="context"+f++;this.oldScroll={x:t.scrollLeft(),y:t.scrollTop()};this.waypoints={horizontal:{},vertical:{}};t.data(u,this.id);a[this.id]=this;t.bind(y,function(){var t;if(!(e.didScroll||c)){e.didScroll=true;t=function(){e.doScroll();return e.didScroll=false};return r.setTimeout(t,n[m].settings.scrollThrottle)}});t.bind(p,function(){var t;if(!e.didResize){e.didResize=true;t=function(){n[m]("refresh");return e.didResize=false};return r.setTimeout(t,n[m].settings.resizeThrottle)}})}t.prototype.doScroll=function(){var t,e=this;t={horizontal:{newScroll:this.$element.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.$element.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};if(c&&(!t.vertical.oldScroll||!t.vertical.newScroll)){n[m]("refresh")}n.each(t,function(t,r){var i,o,l;l=[];o=r.newScroll>r.oldScroll;i=o?r.forward:r.backward;n.each(e.waypoints[t],function(t,e){var n,i;if(r.oldScroll<(n=e.offset)&&n<=r.newScroll){return l.push(e)}else if(r.newScroll<(i=e.offset)&&i<=r.oldScroll){return l.push(e)}});l.sort(function(t,e){return t.offset-e.offset});if(!o){l.reverse()}return n.each(l,function(t,e){if(e.options.continuous||t===l.length-1){return e.trigger([i])}})});return this.oldScroll={x:t.horizontal.newScroll,y:t.vertical.newScroll}};t.prototype.refresh=function(){var t,e,r,i=this;r=n.isWindow(this.element);e=this.$element.offset();this.doScroll();t={horizontal:{contextOffset:r?0:e.left,contextScroll:r?0:this.oldScroll.x,contextDimension:this.$element.width(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:r?0:e.top,contextScroll:r?0:this.oldScroll.y,contextDimension:r?n[m]("viewportHeight"):this.$element.height(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};return n.each(t,function(t,e){return n.each(i.waypoints[t],function(t,r){var i,o,l,s,f;i=r.options.offset;l=r.offset;o=n.isWindow(r.element)?0:r.$element.offset()[e.offsetProp];if(n.isFunction(i)){i=i.apply(r.element)}else if(typeof i==="string"){i=parseFloat(i);if(r.options.offset.indexOf("%")>-1){i=Math.ceil(e.contextDimension*i/100)}}r.offset=o-e.contextOffset+e.contextScroll-i;if(r.options.onlyOnScroll&&l!=null||!r.enabled){return}if(l!==null&&l<(s=e.oldScroll)&&s<=r.offset){return r.trigger([e.backward])}else if(l!==null&&l>(f=e.oldScroll)&&f>=r.offset){return r.trigger([e.forward])}else if(l===null&&e.oldScroll>=r.offset){return r.trigger([e.forward])}})})};t.prototype.checkEmpty=function(){if(n.isEmptyObject(this.waypoints.horizontal)&&n.isEmptyObject(this.waypoints.vertical)){this.$element.unbind([p,y].join(" "));return delete a[this.id]}};return t}();l=function(){function t(t,e,r){var i,o;r=n.extend({},n.fn[g].defaults,r);if(r.offset==="bottom-in-view"){r.offset=function(){var t;t=n[m]("viewportHeight");if(!n.isWindow(e.element)){t=e.$element.height()}return t-n(this).outerHeight()}}this.$element=t;this.element=t[0];this.axis=r.horizontal?"horizontal":"vertical";this.callback=r.handler;this.context=e;this.enabled=r.enabled;this.id="waypoints"+v++;this.offset=null;this.options=r;e.waypoints[this.axis][this.id]=this;s[this.axis][this.id]=this;i=(o=t.data(w))!=null?o:[];i.push(this.id);t.data(w,i)}t.prototype.trigger=function(t){if(!this.enabled){return}if(this.callback!=null){this.callback.apply(this.element,t)}if(this.options.triggerOnce){return this.destroy()}};t.prototype.disable=function(){return this.enabled=false};t.prototype.enable=function(){this.context.refresh();return this.enabled=true};t.prototype.destroy=function(){delete s[this.axis][this.id];delete this.context.waypoints[this.axis][this.id];return this.context.checkEmpty()};t.getWaypointsByElement=function(t){var e,r;r=n(t).data(w);if(!r){return[]}e=n.extend({},s.horizontal,s.vertical);return n.map(r,function(t){return e[t]})};return t}();d={init:function(t,e){var r;if(e==null){e={}}if((r=e.handler)==null){e.handler=t}this.each(function(){var t,r,i,s;t=n(this);i=(s=e.context)!=null?s:n.fn[g].defaults.context;if(!n.isWindow(i)){i=t.closest(i)}i=n(i);r=a[i.data(u)];if(!r){r=new o(i)}return new l(t,r,e)});n[m]("refresh");return this},disable:function(){return d._invoke(this,"disable")},enable:function(){return d._invoke(this,"enable")},destroy:function(){return d._invoke(this,"destroy")},prev:function(t,e){return d._traverse.call(this,t,e,function(t,e,n){if(e>0){return t.push(n[e-1])}})},next:function(t,e){return d._traverse.call(this,t,e,function(t,e,n){if(e<n.length-1){return t.push(n[e+1])}})},_traverse:function(t,e,i){var o,l;if(t==null){t="vertical"}if(e==null){e=r}l=h.aggregate(e);o=[];this.each(function(){var e;e=n.inArray(this,l[t]);return i(o,e,l[t])});return this.pushStack(o)},_invoke:function(t,e){t.each(function(){var t;t=l.getWaypointsByElement(this);return n.each(t,function(t,n){n[e]();return true})});return this}};n.fn[g]=function(){var t,r;r=arguments[0],t=2<=arguments.length?e.call(arguments,1):[];if(d[r]){return d[r].apply(this,t)}else if(n.isFunction(r)){return d.init.apply(this,arguments)}else if(n.isPlainObject(r)){return d.init.apply(this,[null,r])}else if(!r){return n.error("jQuery Waypoints needs a callback function or handler option.")}else{return n.error("The "+r+" method does not exist in jQuery Waypoints.")}};n.fn[g].defaults={context:r,continuous:true,enabled:true,horizontal:false,offset:0,triggerOnce:false};h={refresh:function(){return n.each(a,function(t,e){return e.refresh()})},viewportHeight:function(){var t;return(t=r.innerHeight)!=null?t:i.height()},aggregate:function(t){var e,r,i;e=s;if(t){e=(i=a[n(t).data(u)])!=null?i.waypoints:void 0}if(!e){return[]}r={horizontal:[],vertical:[]};n.each(r,function(t,i){n.each(e[t],function(t,e){return i.push(e)});i.sort(function(t,e){return t.offset-e.offset});r[t]=n.map(i,function(t){return t.element});return r[t]=n.unique(r[t])});return r},above:function(t){if(t==null){t=r}return h._filter(t,"vertical",function(t,e){return e.offset<=t.oldScroll.y})},below:function(t){if(t==null){t=r}return h._filter(t,"vertical",function(t,e){return e.offset>t.oldScroll.y})},left:function(t){if(t==null){t=r}return h._filter(t,"horizontal",function(t,e){return e.offset<=t.oldScroll.x})},right:function(t){if(t==null){t=r}return h._filter(t,"horizontal",function(t,e){return e.offset>t.oldScroll.x})},enable:function(){return h._invoke("enable")},disable:function(){return h._invoke("disable")},destroy:function(){return h._invoke("destroy")},extendFn:function(t,e){return d[t]=e},_invoke:function(t){var e;e=n.extend({},s.vertical,s.horizontal);return n.each(e,function(e,n){n[t]();return true})},_filter:function(t,e,r){var i,o;i=a[n(t).data(u)];if(!i){return[]}o=[];n.each(i.waypoints[e],function(t,e){if(r(i,e)){return o.push(e)}});o.sort(function(t,e){return t.offset-e.offset});return n.map(o,function(t){return t.element})}};n[m]=function(){var t,n;n=arguments[0],t=2<=arguments.length?e.call(arguments,1):[];if(h[n]){return h[n].apply(null,t)}else{return h.aggregate.call(null,n)}};n[m].settings={resizeThrottle:100,scrollThrottle:30};return i.load(function(){return n[m]("refresh")})})}).call(this);
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports);
    global.WOW = mod.exports;
  }
})(this, function (module, exports) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _class, _temp;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function isIn(needle, haystack) {
    return haystack.indexOf(needle) >= 0;
  }

  function extend(custom, defaults) {
    for (var key in defaults) {
      if (custom[key] == null) {
        var value = defaults[key];
        custom[key] = value;
      }
    }
    return custom;
  }

  function isMobile(agent) {
    return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(agent)
    );
  }

  function createEvent(event) {
    var bubble = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
    var cancel = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
    var detail = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
    var customEvent = void 0;
    if (document.createEvent != null) {
      // W3C DOM
      customEvent = document.createEvent('CustomEvent');
      customEvent.initCustomEvent(event, bubble, cancel, detail);
    } else if (document.createEventObject != null) {
      // IE DOM < 9
      customEvent = document.createEventObject();
      customEvent.eventType = event;
    } else {
      customEvent.eventName = event;
    }
    return customEvent;
  }

  function emitEvent(elem, event) {
    if (elem.dispatchEvent != null) {
      // W3C DOM
      elem.dispatchEvent(event);
    } else if (event in (elem != null)) {
      elem[event]();
    } else if ('on' + event in (elem != null)) {
      elem['on' + event]();
    }
  }

  function addEvent(elem, event, fn) {
    if (elem.addEventListener != null) {
      // W3C DOM
      elem.addEventListener(event, fn, false);
    } else if (elem.attachEvent != null) {
      // IE DOM
      elem.attachEvent('on' + event, fn);
    } else {
      // fallback
      elem[event] = fn;
    }
  }

  function removeEvent(elem, event, fn) {
    if (elem.removeEventListener != null) {
      // W3C DOM
      elem.removeEventListener(event, fn, false);
    } else if (elem.detachEvent != null) {
      // IE DOM
      elem.detachEvent('on' + event, fn);
    } else {
      // fallback
      delete elem[event];
    }
  }

  function getInnerHeight() {
    if ('innerHeight' in window) {
      return window.innerHeight;
    }
    return document.documentElement.clientHeight;
  }

  // Minimalistic WeakMap shim, just in case.
  var WeakMap = window.WeakMap || window.MozWeakMap || function () {
    function WeakMap() {
      _classCallCheck(this, WeakMap);
      this.keys = [];
      this.values = [];
    }

    _createClass(WeakMap, [{
      key: 'get',
      value: function get(key) {
        for (var i = 0; i < this.keys.length; i++) {
          var item = this.keys[i];
          if (item === key) {
            return this.values[i];
          }
        }
        return undefined;
      }
    }, {
      key: 'set',
      value: function set(key, value) {
        for (var i = 0; i < this.keys.length; i++) {
          var item = this.keys[i];
          if (item === key) {
            this.values[i] = value;
            return this;
          }
        }
        this.keys.push(key);
        this.values.push(value);
        return this;
      }
    }]);
    return WeakMap;
  }();
  // Dummy MutationObserver, to avoid raising exceptions.
  var MutationObserver = window.MutationObserver || window.WebkitMutationObserver || window.MozMutationObserver || (_temp = _class = function () {
    function MutationObserver() {
      _classCallCheck(this, MutationObserver);
      if (typeof console !== 'undefined' && console !== null) {
        console.warn('MutationObserver is not supported by your browser.');
        console.warn('WOW.js cannot detect dom mutations, please call .sync() after loading new content.');
      }
    }

    _createClass(MutationObserver, [{
      key: 'observe',
      value: function observe() {
      }
    }]);
    return MutationObserver;
  }(), _class.notSupported = true, _temp);
  // getComputedStyle shim, from http://stackoverflow.com/a/21797294
  var getComputedStyle = window.getComputedStyle || function getComputedStyle(el) {
    var getComputedStyleRX = /(\-([a-z]){1})/g;
    return {
      getPropertyValue: function getPropertyValue(prop) {
        if (prop === 'float') {
          prop = 'styleFloat';
        }
        if (getComputedStyleRX.test(prop)) {
          prop.replace(getComputedStyleRX, function (_, _char) {
            return _char.toUpperCase();
          });
        }
        var currentStyle = el.currentStyle;
        return (currentStyle != null ? currentStyle[prop] : void 0) || null;
      }
    };
  };
  var WOW = function () {
    function WOW() {
      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
      _classCallCheck(this, WOW);
      this.defaults = {
        boxClass: 'wow',
        animateClass: 'animated',
        offset: 0,
        mobile: true,
        live: true,
        callback: null,
        scrollContainer: null,
        resetAnimation: true
      };
      this.animate = function animateFactory() {
        if ('requestAnimationFrame' in window) {
          return function (callback) {
            return window.requestAnimationFrame(callback);
          };
        }
        return function (callback) {
          return callback();
        };
      }();
      this.vendors = ['moz', 'webkit'];
      this.start = this.start.bind(this);
      this.resetAnimation = this.resetAnimation.bind(this);
      this.scrollHandler = this.scrollHandler.bind(this);
      this.scrollCallback = this.scrollCallback.bind(this);
      this.scrolled = true;
      this.config = extend(options, this.defaults);
      if (options.scrollContainer != null) {
        this.config.scrollContainer = document.querySelector(options.scrollContainer);
      }
      // Map of elements to animation names:
      this.animationNameCache = new WeakMap();
      this.wowEvent = createEvent(this.config.boxClass);
    }

    _createClass(WOW, [{
      key: 'init',
      value: function init() {
        this.element = window.document.documentElement;
        if (isIn(document.readyState, ['interactive', 'complete'])) {
          this.start();
        } else {
          addEvent(document, 'DOMContentLoaded', this.start);
        }
        this.finished = [];
      }
    }, {
      key: 'start',
      value: function start() {
        var _this = this;
        this.stopped = false;
        this.boxes = [].slice.call(this.element.querySelectorAll('.' + this.config.boxClass));
        this.all = this.boxes.slice(0);
        if (this.boxes.length) {
          if (this.disabled()) {
            this.resetStyle();
          } else {
            for (var i = 0; i < this.boxes.length; i++) {
              var box = this.boxes[i];
              this.applyStyle(box, true);
            }
          }
        }
        if (!this.disabled()) {
          addEvent(this.config.scrollContainer || window, 'scroll', this.scrollHandler);
          addEvent(window, 'resize', this.scrollHandler);
          this.interval = setInterval(this.scrollCallback, 50);
        }
        if (this.config.live) {
          var mut = new MutationObserver(function (records) {
            for (var j = 0; j < records.length; j++) {
              var record = records[j];
              for (var k = 0; k < record.addedNodes.length; k++) {
                var node = record.addedNodes[k];
                _this.doSync(node);
              }
            }
            return undefined;
          });
          mut.observe(document.body, {
            childList: true,
            subtree: true
          });
        }
      }
    }, {
      key: 'stop',
      value: function stop() {
        this.stopped = true;
        removeEvent(this.config.scrollContainer || window, 'scroll', this.scrollHandler);
        removeEvent(window, 'resize', this.scrollHandler);
        if (this.interval != null) {
          clearInterval(this.interval);
        }
      }
    }, {
      key: 'sync',
      value: function sync() {
        if (MutationObserver.notSupported) {
          this.doSync(this.element);
        }
      }
    }, {
      key: 'doSync',
      value: function doSync(element) {
        if (typeof element === 'undefined' || element === null) {
          element = this.element;
        }
        if (element.nodeType !== 1) {
          return;
        }
        element = element.parentNode || element;
        var iterable = element.querySelectorAll('.' + this.config.boxClass);
        for (var i = 0; i < iterable.length; i++) {
          var box = iterable[i];
          if (!isIn(box, this.all)) {
            this.boxes.push(box);
            this.all.push(box);
            if (this.stopped || this.disabled()) {
              this.resetStyle();
            } else {
              this.applyStyle(box, true);
            }
            this.scrolled = true;
          }
        }
      }
    }, {
      key: 'show',
      value: function show(box) {
        this.applyStyle(box);
        box.setAttribute("class", box.getAttribute("class") + " " + this.config.animateClass);;
        if (this.config.callback != null) {
          this.config.callback(box);
        }
        emitEvent(box, this.wowEvent);
        if (this.config.resetAnimation) {
          addEvent(box, 'animationend', this.resetAnimation);
          addEvent(box, 'oanimationend', this.resetAnimation);
          addEvent(box, 'webkitAnimationEnd', this.resetAnimation);
          addEvent(box, 'MSAnimationEnd', this.resetAnimation);
        }
        return box;
      }
    }, {
      key: 'applyStyle',
      value: function applyStyle(box, hidden) {
        var _this2 = this;
        var duration = box.getAttribute('data-wow-duration');
        var delay = box.getAttribute('data-wow-delay');
        var iteration = box.getAttribute('data-wow-iteration');
        return this.animate(function () {
          return _this2.customStyle(box, hidden, duration, delay, iteration);
        });
      }
    }, {
      key: 'resetStyle',
      value: function resetStyle() {
        for (var i = 0; i < this.boxes.length; i++) {
          var box = this.boxes[i];
          box.style.visibility = 'visible';
        }
        return undefined;
      }
    }, {
      key: 'resetAnimation',
      value: function resetAnimation(event) {
        if (event.type.toLowerCase().indexOf('animationend') >= 0) {
          var target = event.target || event.srcElement;
          target.setAttribute("class", target.getAttribute("class").replace(this.config.animateClass).trim());
        }
      }
    }, {
      key: 'customStyle',
      value: function customStyle(box, hidden, duration, delay, iteration) {
        if (hidden) {
          this.cacheAnimationName(box);
        }
        box.style.visibility = hidden ? 'hidden' : 'visible';
        if (duration) {
          this.vendorSet(box.style, {animationDuration: duration});
        }
        if (delay) {
          this.vendorSet(box.style, {animationDelay: delay});
        }
        if (iteration) {
          this.vendorSet(box.style, {animationIterationCount: iteration});
        }
        this.vendorSet(box.style, {animationName: hidden ? 'none' : this.cachedAnimationName(box)});
        return box;
      }
    }, {
      key: 'vendorSet',
      value: function vendorSet(elem, properties) {
        for (var name in properties) {
          if (properties.hasOwnProperty(name)) {
            var value = properties[name];
            elem['' + name] = value;
            for (var i = 0; i < this.vendors.length; i++) {
              var vendor = this.vendors[i];
              elem['' + vendor + name.charAt(0).toUpperCase() + name.substr(1)] = value;
            }
          }
        }
      }
    }, {
      key: 'vendorCSS',
      value: function vendorCSS(elem, property) {
        var style = getComputedStyle(elem);
        var result = style.getPropertyCSSValue(property);
        for (var i = 0; i < this.vendors.length; i++) {
          var vendor = this.vendors[i];
          result = result || style.getPropertyCSSValue('-' + vendor + '-' + property);
        }
        return result;
      }
    }, {
      key: 'animationName',
      value: function animationName(box) {
        var aName = void 0;
        try {
          aName = this.vendorCSS(box, 'animation-name').cssText;
        } catch (error) {
          // Opera, fall back to plain property value
          aName = getComputedStyle(box).getPropertyValue('animation-name');
        }
        if (aName === 'none') {
          return ''; // SVG/Firefox, unable to get animation name?
        }
        return aName;
      }
    }, {
      key: 'cacheAnimationName',
      value: function cacheAnimationName(box) {
        // https://bugzilla.mozilla.org/show_bug.cgi?id=921834
        // box.dataset is not supported for SVG elements in Firefox
        return this.animationNameCache.set(box, this.animationName(box));
      }
    }, {
      key: 'cachedAnimationName',
      value: function cachedAnimationName(box) {
        return this.animationNameCache.get(box);
      }
    }, {
      key: 'scrollHandler',
      value: function scrollHandler() {
        this.scrolled = true;
      }
    }, {
      key: 'scrollCallback',
      value: function scrollCallback() {
        if (this.scrolled) {
          this.scrolled = false;
          var results = [];
          for (var i = 0; i < this.boxes.length; i++) {
            var box = this.boxes[i];
            if (box) {
              if (this.isVisible(box)) {
                this.show(box);
                continue;
              }
              results.push(box);
            }
          }
          this.boxes = results;
          if (!this.boxes.length && !this.config.live) {
            this.stop();
          }
        }
      }
    }, {
      key: 'offsetTop',
      value: function offsetTop(element) {
        // SVG elements don't have an offsetTop in Firefox.
        // This will use their nearest parent that has an offsetTop.
        // Also, using ('offsetTop' of element) causes an exception in Firefox.
        while (element.offsetTop === undefined) {
          element = element.parentNode;
        }
        var top = element.offsetTop;
        while (element.offsetParent) {
          element = element.offsetParent;
          top += element.offsetTop;
        }
        return top;
      }
    }, {
      key: 'isVisible',
      value: function isVisible(box) {
        var offset = box.getAttribute('data-wow-offset') || this.config.offset;
        var viewTop = this.config.scrollContainer && this.config.scrollContainer.scrollTop || window.pageYOffset;
        var viewBottom = viewTop + Math.min(this.element.clientHeight, getInnerHeight()) - offset;
        var top = this.offsetTop(box);
        var bottom = top + box.clientHeight;
        return top <= viewBottom && bottom >= viewTop;
      }
    }, {
      key: 'disabled',
      value: function disabled() {
        return !this.config.mobile && isMobile(navigator.userAgent);
      }
    }]);
    return WOW;
  }();
  exports.default = WOW;
  module.exports = exports['default'];
});

$(document).ready(function () {
  function ajaxSuccess(response, status, xhr, form) {
    if (response) {
      switch (response.status) {
        case 'extention':
          console.log(response);
          alert('Ошибка! Данный тип файлов пересылать нельзя');
          break;
        case 'error':
          console.log(response);
          $().toastmessage('showErrorToast', 'Ошибка! Повторите позже');
          break;
        case 'success':
          console.log(response);
          $("form").clearForm();
          $().toastmessage('showSuccessToast', 'Ваше сообщение отправлено');
          switch (response.action) {
            case 'order':
              $.magnificPopup.close();
              break;
            case 'job':
              $.magnificPopup.close();
              break;
          }
          break;
      }
    }
  }

  function beforeAjaxSubmit(data, form, options) {
    var allSender = true,
      sender = true,
      item,
      re = /^[\.\-_A-Za-z0-9]+?@[\.\-A-Za-z0-9]+?\.[A-Za-z0-9]{2,6}$/;
    form.find('.error-field').removeClass('error-field');
    form.find('input:required, textarea:required ').each(function (i) {
      item = $(this);
      if (item.length > 0) {
        if ($(this).is('required') && !$(this).is('a')) {
          sender = $(this).val() != "";
        }
        switch ($(this).attr('type')) {
          case 'checkbox':
            sender = $(this).prop('checked') == true;
            break;
          default:
            sender = $(this).val() != "";
            break;
        }
        if (!sender) {
          allSender = false;
          item.addClass('error-field');
          $().toastmessage('showErrorToast', 'Заполните поле ' + item.attr("placeholder").replace('*', '') + '');
        }
      }
    });
    form.find('input[type="email"]').each(function (i) {
      item = $(this);
      if ($(this).val()) {
        if (!re.test($(this).val())) {
          allSender = false;
          item.addClass('error-field');
          $().toastmessage('showErrorToast', 'Заполните корректно e-mail');
        }
      }
    });
    console.log(allSender);
    return allSender;
  }

  var ajaxOptions = {
    beforeSubmit: beforeAjaxSubmit,
    success: ajaxSuccess,
    url: '/ajax-form',
    type: 'post',
    dataType: 'json'
  };
  $(".js-form-submit").click(function () {
    $(this).parents('form').ajaxSubmit(ajaxOptions);
  });
});
$(document).ready(function () {
  var isTablet = navigator.userAgent.match(/iPhone|iPad|Android|Windows Phone/);
  if (!isTablet) {
    $('html').addClass('no-touch');
  }
  else {
    $('html').addClass('touch');
  }
  var vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', vh + 'px');
  $(window).resize(function () {
    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', vh + 'px');
  });
  var wow = new WOW({
    offset: 20,
    resetAnimation: false
  });
  wow.init();
  var hero = new Swiper('.hero .swiper-container', {
    loop: true,
    pagination: {
      el: '.hero__pagination',
      type: 'bullets',
      bulletActiveClass: 'active',
      clickable: true
    },
    speed: 1000,
    effect: 'fade',
    fadeEffect: {
      crossFade: false
    },
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    }
  });
  var gallery = new Swiper('.gallery .swiper-container', {
    loop: true,
    spaceBetween: 25,
    slidesPerView: 3,
    centeredSlides: true,
    pagination: {
      el: '.gallery__pagination',
      type: 'bullets',
      bulletActiveClass: 'active',
      clickable: true
    },
    breakpoints: {
      400: {
        slidesPerView: 1
      },
      600: {
        slidesPerView: 2
      }
    },
    on: {
      init: function () {
        $('.gallery__desc').text($('.gallery .swiper-slide-active').attr('data-desc'));
      }
    }
  });
  gallery.on('slideChangeTransitionStart', function () {
    $('.gallery__desc').text($('.gallery .swiper-slide:eq(' + gallery.activeIndex + ')').attr('data-desc'));
  });
  var video = new Swiper('.video .swiper-container', {
    loop: true,
    slidesPerView: 'auto',
    pagination: {
      el: '.video__pagination',
      type: 'bullets',
      bulletActiveClass: 'active',
      clickable: true
    },
    effect: 'coverflow',
    coverflowEffect: {
      rotate: 0,
      slideShadows: false,
      depth: 300,
      stretch: 438
    },
    breakpoints: {
      1299: {
        depth: 500,
        stretch: 80
      },
      767: {
        spaceBetween: 20,
        slidesPerView: 1,
        coverflowEffect: {
          depth: 0,
          stretch: 0
        }
      }
    },
    on: {
      init: function () {
        $('.video__desc').text($('.video .swiper-slide-active').attr('data-desc'));
      }
    }
  });
  video.on('slideChangeTransitionStart', function () {
    $('.video__desc').text($('.video .swiper-slide:eq(' + video.activeIndex + ')').attr('data-desc'));
  });
  var photos = new Swiper('.photos .swiper-container', {
    loop: true,
    slidesPerView: 'auto',
    centeredSlides: true,
    pagination: {
      el: '.photos__pagination',
      type: 'bullets',
      bulletActiveClass: 'active',
      clickable: true
    },
    effect: 'coverflow',
    coverflowEffect: {
      rotate: 0,
      slideShadows: false,
      depth: 300,
      stretch: 100
    },
    breakpoints: {
      1299: {
        depth: 500,
        stretch: 80
      },
      767: {
        spaceBetween: 20,
        slidesPerView: 1,
        coverflowEffect: {
          depth: 0,
          stretch: 0
        }
      }
    },
    on: {
      init: function () {
        $('.video__desc').text($('.video .swiper-slide-active').attr('data-desc'));
      }
    }
  });
  var reviews = new Swiper('.reviews-slider .swiper-container', {
    loop: true,
    slidesPerView: 'auto',
    autoHeight: true,
    simulateTouch: false,
    allowTouchMove: false,
    navigation: {
      prevEl: '.reviews-slider__prev',
      nextEl: '.reviews-slider__next'
    }
  });
  var reviewsPeople = new Swiper('.reviews-people .swiper-container', {
    loop: true,
    slidesPerView: 'auto',
    autoHeight: true,
    simulateTouch: false,
    allowTouchMove: false,
    effect: 'coverflow',
    coverflowEffect: {
      rotate: 0,
      slideShadows: false,
      depth: 500,
      stretch: 204
    },
    breakpoints: {
      1399: {
        spaceBetween: 0,
        slidesPerView: 1,
        coverflowEffect: {
          depth: 0,
          stretch: 0
        }
      }
    }
  });
  reviews.on('slideChangeTransitionStart', function () {
    reviewsPeople.slideTo(reviews.activeIndex);
  });
  $('.content-slider .swiper-container').each(function () {
    var slider = new Swiper($(this), {
      loop: true,
      speed: 400,
      autoHeight: true,
      navigation: {
        prevEl: $(this).siblings('.content-slider__prev'),
        nextEl: $(this).siblings('.content-slider__next')
      }
    });
  });
  $('.js-y-scroll').mCustomScrollbar({
    axis: "y",
    advanced: {updateOnContentResize: true},
    mouseWheel: {preventDefault: true},
    scrollInertia: 400
  });
  $('.js-open-popup').magnificPopup({
    type: 'inline',
    midClick: true,
    fixedBgPos: true,
    fixedContentPos: true,
    removalDelay: 400,
    callbacks: {
      open: function () {
        popupShow();
      },
      close: function () {
        popupClose();
      }
    }
  });
  $('.js-open-image').magnificPopup({
    type: 'image',
    midClick: true,
    fixedBgPos: true,
    fixedContentPos: true,
    callbacks: {
      open: function () {
        popupShow();
      },
      close: function () {
        popupClose();
      }
    }
  });
  $('.js-open-gallery').magnificPopup({
    type: 'image',
    midClick: true,
    fixedBgPos: true,
    fixedContentPos: true,
    gallery: {
      enabled: true
    },
    callbacks: {
      open: function () {
        popupShow();
      },
      close: function () {
        popupClose();
      }
    }
  });
  $('.js-open-group').magnificPopup({
    delegate: 'a',
    type: 'image',
    midClick: true,
    fixedBgPos: true,
    fixedContentPos: true,
    removalDelay: 400,
    gallery: {
      enabled: true
    },
    callbacks: {
      open: function () {
        popupShow();
      },
      close: function () {
        popupClose();
      }
    }
  });
  $('.js-open-video').magnificPopup({
    type: 'iframe',
    mainClass: 'mfp-fade',
    fixedBgPos: true,
    fixedContentPos: false
  });
  svg4everybody();
  $('.aside').Stickyfill();
  $('.js-next-toggle').click(function (e) {
    $(this).toggleClass('active').next().slideToggle();
    e.preventDefault();
  });
  $('.js-close-modal').click(function () {
    $.magnificPopup.close();
  });
  /*up button*/
  $('.js-start-page').click(function () {
    $("html, body").animate({scrollTop: 0}, 700);
  });
  $(window).scroll(function () {
    var curScroll = $(this).scrollTop();
    if (curScroll > 0) {
      $('.header').addClass('active');
    }
    else {
      $('.header').removeClass('active');
    }
    if (curScroll > window.innerHeight) {
      $('.js-start-page').addClass('active');
    }
    else {
      $('.js-start-page').removeClass('active');
    }
  });
  /*content*/
  $('.content iframe').each(function () {
    $(this).wrap('<div class="content-iframe"><div></div></div>')
  });
  $('.content table').each(function () {
    $(this).wrap('<div class="content-table js-x-scroll"></div>').parent().mCustomScrollbar({
      axis: "x",
      advanced: {updateOnContentResize: true},
      mouseWheel: {preventDefault: true}
    });
  });
  /*header*/
  $('.js-header-menu').click(function () {
    $(this).toggleClass('active');
    $('.header-menu').toggleClass('active');
  });
  $('.js-menu-next').click(function () {
    $(this).next().addClass('active');
    $('.header-menu-nav').removeAttr('style').css('height', $(this).next().height());
  });
  $('.js-menu-prev').click(function () {
    $(this).parent().removeClass('active');
    $('.header-menu-nav').removeAttr('style').css('height', $(this).parent().parent().parent().height());
  });
  $('.js-header-menu-search').click(function () {
    $('.header-menu-search').toggleClass('active');
  });
  $('.js-header-search').click(function () {
    $('.header-search').slideToggle();
    $(".header-search__field").focus();
  });
  $(document).mouseup(function (e) {
    if (e.target.closest('.header-search') == null && $('.header-search').is(':visible')) {
      $('.header-search').slideUp();
    }
  });
  var navWrap = $('.header-menu-wrap'),
    scrollTop = 0;

  function hideScroll() {
    $('body').css('top', -$(window).scrollTop());
  }

  function showScroll() {
    $(window).scrollTop(scrollTop);
    $('body').removeAttr('style');
  }

  $('.js-navigation').click(function (e) {
    if (navWrap.hasClass('active')) {
      navWrap.removeClass('animate');
      setTimeout(function () {
        navWrap.removeClass('active');
        $('html').removeClass('blocked');
        showScroll();
      }, 500)
    }
    else {
      scrollTop = $(window).scrollTop();
      hideScroll();
      navWrap.css('height', window.innerHeight);
      $('html').addClass('blocked');
      navWrap.addClass('active animate');
    }
    e.stopPropagation();
  });
  if (window.innerWidth >= 768) {
    $('.header-menu').click(function (e) {
      e.stopPropagation();
    });
    navWrap.click(function () {
      navWrap.removeClass('animate');
      setTimeout(function () {
        navWrap.removeClass('active');
        $('html').removeClass('blocked');
        showScroll();
      }, 500)
    });
  }
  /*counter*/
  $('.js-count').each(function () {
    var $this = $(this);
    $this.data('target', parseInt($this.html()));
    $this.data('counted', false);
    $this.html('0');
  });
  $(window).on('scroll', function () {
    var speed = 2000;
    $('.js-count').each(function () {
      var $this = $(this);
      if (!$this.data('counted') && $(window).scrollTop() + $(window).height() >= $this.offset().top) {
        $this.data('counted', true);
        $this.animate({
          dummy: 1
        }, {
          duration: speed,
          step: function (now) {
            var $this = $(this);
            var val = Math.round($this.data('target') * now);
            $this.html(val);
          }
        });
      }
    });
  }).triggerHandler('scroll');
  /*news*/
  $('.js-filter-open').click(function () {
    if ($('.js-filter-open').not($(this)).hasClass('active')) {
      $('.js-filter-open.active').toggleClass('active').next().hide();
    }
    $(this).toggleClass('active').next().slideToggle(0);
  });
  $('.js-filter').click(function () {
    $(this).addClass('active').parents('.filter__body').hide().prev().text($(this).text());
    $(this).siblings('.active').removeClass('active');
  });
  $(document).mouseup(function (e) {
    if (e.target.closest('.filter') == null && $('.filter__head').hasClass('active')) {
      $('.filter__head.active').removeClass('active').next().slideToggle(0);
    }
  });
  /*vision*/
  $.bvi({
    'bvi_target': '.js-bvi-open', // Класс ссылки включения плагина
    "bvi_theme": "white", // Цвет сайта
    "bvi_font": "arial", // Шрифт
    "bvi_font_size": 16, // Размер шрифта
    "bvi_letter_spacing": "normal", // Межбуквенный интервал
    "bvi_line_height": "normal", // Междустрочный интервал
    "bvi_images": true, // Изображения
    "bvi_reload": true, // Перезагрузка страницы при выключении плагина
    "bvi_fixed": false, // Фиксирование панели для слабовидящих вверху страницы
    "bvi_tts": true, // Синтез речи
    "bvi_flash_iframe": true, // Встроенные элементы (видео, карты и тд.)
    "bvi_hide": false // Скрывает панель для слабовидящих и показывает иконку панели.
  });
});
function popupShow() {
  $('body').addClass('popup');
}
function popupClose() {
  $('body').removeClass('popup');
}
