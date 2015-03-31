(function($) {
	$.fn.socialShare = function() {
		var stringFormat = function() {
			var args = arguments;
			if (!args.length) return "";
			if (typeof args[0] != "string") return "";
			return args[0].replace(/{\d+}/g, function(match, number) {
				var mi = parseInt(match.substr(1, match.length - 2));
				return typeof args[mi + 1] != 'undefined' ? args[mi + 1] : match;
			});
		}
		var SocialShare = function(el, config) {
			this.config = config || {};
			var el = this.el = $(el),
				me = this;
			if (!this.el) return;
			var renderType = this.config.renderType = this.el.data('render') ? this.el.data('render') : "line";
			this.config.hostImgSrc = this.el.data('src');
			this.config.arcStart = typeof this.el.data('arcstart') !== 'undefined' ? parseInt(this.el.data('arcstart')) : 180;
			this.config.arcLength = typeof this.el.data("arclength") !== 'undefined' ? parseInt(this.el.data('arclength')) : 180;
			this.config.gap = typeof this.el.data('gap') !== 'undefined' ? parseInt(this.el.data('gap')) : 50;
			this.config.radius = typeof this.el.data('radius') !== 'undefined' ? parseInt(el.data('radius')) : 80;
			this.config.delayTime = typeof this.el.data('delaytime') !== 'undefined' ? parseInt(this.el.data('delaytime') !== 'undefined') : 500;
			this.config.delayGap = typeof this.el.data('delaygap') !== 'undefined' ? parseInt(typeof this.el.data('delaygap')) : 250;

			var shareMainBtn = [
					'<a class="smain disabled" title="click to show share panel" alt="click to show share panel">',
					stringFormat('<img src="{0}" alt="show share panel"/>', this.config.hostImgSrc),
					'</a>'
				].join(''),
				shareBtnTpl = stringFormat('<a class="sbutton {0}"> </a>', ""),
				dpReg = /^share/,
				dataConfig = this.el.data(),
				shareBtnData = [];
			//roll the dataset format like: data-share-fb & data-fb-url as pairs to an object
			for (var key in dataConfig) {
				if (dpReg.test(key)) {
					var surl = key.substring('share'.length, key.length).toLowerCase();
					shareBtnData.push({
						name: surl,
						src: dataConfig[key],
						url: dataConfig[surl + 'Url']
					});
				}
			}
			console.log(JSON.stringify(shareBtnData));

			//build the social share tree declarative
			var shareBtnDom = '';
			_.each(shareBtnData, function(item) {
				shareBtnDom += stringFormat('<a class="sbutton {0}" href="{1}" data-src="{2}">{2}</a>', item.name, item.url, item.src, item.name);
				//add the css rule dynamically
			});

			var sBtnContainerDom = [
				'<div class="scontainer default">',
				shareBtnDom,
				'</div>'
			].join('');
			//console.log(sBtnContainerDom);
			el.append($(shareMainBtn)).append($(sBtnContainerDom));
			var sContainer = $('.scontainer', el),
				shareMainBtn = $('smain', el);;
			//calculate the render absolute pixs & set the background
			$('a.sbutton', sContainer).each(function(index) {
				var el = $(this);
				el.css({
					'background-image': stringFormat('url({0})', el.data('src'))
				});
			});
			//render the share buttons with circle
			//el.find('.smain').click(renderType === 'line' ? this.lineRender : this.circleRender);
			el.find('.smain').click(function() {
				switch (renderType) {
					case "line":
						me.lineRender();
						break;
					case "lineRight":
						me.lineRightRender();
						break;
					case "circle":
						me.circleRender();
						break;
				}
			});
		}


		SocialShare.prototype.circleRender = function() {
			// console.log('circleRender')
			if ($(this.el).hasClass('disabled')) return;
			var el = $(this.el),
				gap = this.config.gap,
				arcLength = this.config.arcLength,
				radius = this.config.radius,
				delayTime = this.config.delayTime,
				delayGap = this.config.delayGap,
				arcStart = this.config.arcStart;
			var t = delayGap,
				r = el.find('.sbutton').length,
				i = delayTime + (r - 1) * t,
				s = 0;
			var triggleWidth = el.outerWidth(),
				triggleHeight = el.outerHeight();
			var btnWidth = el.find('.sbutton:eq(0)').outerWidth(),
				btnHeight = el.find('.sbutton:eq(0)').outerHeight();
			var p = (triggleWidth - btnWidth) / 2,
				d = (triggleHeight - btnHeight) / 2;
			if (!el.hasClass('active')) {
				el.addClass('disabled').delay(i).queue(function(e) {
					el.removeClass('disabled').addClass('active');
					e();
				});
				var v = arcLength / r,
					m = arcStart + v / 2;
				el.find('.sbutton').each(function() {
					var n = m / 180 * Math.PI,
						r = p + radius * Math.cos(n),
						i = d + radius * Math.sin(n);
					$(this).css({
						display: 'block',
						left: p + 'px',
						top: d + 'px'
					}).stop().delay(t * s).animate({
						left: r + 'px',
						top: i + 'px'
					}, delayTime);
					m += v;
					s++;
				});
			} else {
				s = r - 1;
				el.addClass('disabled').delay(i).queue(function(e) {
					el.removeClass('disabled').removeClass('active');
					e();
				});
				el.find('.sbutton').each(function() {
					$(this).stop().delay(t * s).animate({
						left: p,
						top: d
					}, delayTime);
					s--;
				});
			}
		};
		//render the share buttons with line
		SocialShare.prototype.lineRender = function() {
				if ($(this.el).hasClass('disabled')) return;
				var el = $(this.el),
					gap = this.config.gap,
					delayTime = this.config.delayTime,
					delayGap = this.config.delayGap,
					arcStart = this.config.arcStart;
				var t = delayGap,
					r = el.find('.sbutton').length,
					s = delayTime + (r - 1) * t,
					i = this.config.gap,
					o = 1;
				var triggleWidth = el.outerWidth(),
					triggleHeight = el.outerHeight();
				var btnWidth = el.find('.sbutton:eq(0)').outerWidth(),
					btnHeight = el.find('.sbutton:eq(0)').outerHeight();
				var p = (triggleWidth - btnWidth) / 2,
					d = (triggleHeight - btnHeight) / 2,
					v = arcStart / 180 * Math.PI;

				if (!el.hasClass('active')) {
					el.addClass('disabled').delay(delayTime).queue(function(e) {
						$(el).removeClass('disabled').addClass('active');
						e();
					});
					el.find('.sbutton').each(function() {
						//console.log($(this));
						var n = p + (p + i * o) * Math.cos(v),
							r = d + (d + i * o) * Math.sin(v);
						$(this).css({
							display: 'block',
							left: d + 'px',
							top: p + 'px'
						}).stop().delay(t * o).animate({
							left: r + 'px',
							top: n + 'px'
						}, delayTime);
						o++;
					});
				} else {
					o = r;
					$(this).addClass('disabled').delay(s).queue(function(e) {
						$(el).removeClass('disabled').removeClass('active');
						e();
					});
					el.find('.sbutton').each(function() {
						$(this).stop().delay(t * o).animate({
							left: d,
							top: p
						}, delayTime);
						o--;
					});

				}
			}
			//render the share buttons line right
		SocialShare.prototype.lineRightRender = function() {
			if ($(this.el).hasClass('disabled')) return;
			console.log(this);
			var el = $(this.el),
				gap = this.config.gap,
				delayTime = this.config.delayTime,
				delayGap = this.config.delayGap,
				arcStart = this.config.arcStart;

			var t = delayGap,
				r = el.find('.sbutton').length,
				i = gap,
				s = delayTime + (r - 1) * t,
				o = 1;
			var triggleWidth = $(el).outerWidth(),
				triggleHeight = $(el).outerHeight();
			var btnWidth = el.find('.sbutton:eq(0)').outerWidth(),
				btnHeight = el.find('.sbutton:eq(0)').outerHeight();
			var p = (triggleWidth - btnWidth) / 2,
				d = (triggleHeight - btnHeight) / 2,
				v = arcStart / 180 * Math.PI;
			if (!el.hasClass('active')) {
				el.addClass('disabled').delay(s).queue(function(e) {
					el.removeClass('disabled').addClass('active');
					e();
				});
				el.find('.sbutton').each(function() {
					console.log(Math.cos(v));
					var n = p + (p + i * o) * Math.cos(v),
						r = d + (d + i * o) * Math.sin(v);
					console.log("render left = " + n + "; top = " + r);
					$(this).css({
						display: 'block',
						left: p + 'px',
						top: d + 'px'
					}).stop().delay(t * o).animate({
						left: n + 'px',
						top: r + 'px'
					}, delayTime);
					o++;
				});
			} else {
				o = r;
				el.addClass('disabled').delay(s).queue(function(e) {
					el.removeClass('disabled').removeClass('active');
					e();
				});
				el.find('.sbutton').each(function() {
					$(this).stop().delay(t * o).animate({
						left: p,
						top: d
					}, delayTime);
					o--;
				});
			}
		}

		return this.each(function() {
			return new SocialShare(this);
		});

	}
})(jQuery);