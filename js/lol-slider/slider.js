;(function() {
	$.fn.createSlider = function (opt, return_object) {

		if (typeof Math.sign !== 'function') {
			Math.sign = function(x) {
			    return typeof x === 'number' ? x ? x < 0 ? -1 : 1 : x === x ? 0 : NaN : NaN;
			}
		}

		if (typeof jQuery.support.cssTransitions !== 'boolean') {
			jQuery.support.cssTransitions = (function() {
			    var b = document.body || document.documentElement,
			        s = b.style,
			        p = 'transition';

			    if (typeof s[p] == 'string') { return true; }

			    // Tests for vendor specific prop
			    var v = ['Moz', 'webkit', 'Webkit', 'Khtml', 'O', 'ms'];
			    p = p.charAt(0).toUpperCase() + p.substr(1);

			    for (var i=0; i<v.length; i++) {
			        if (typeof s[v[i] + p] == 'string') { return true; }
			    }

			    return false;
			})();
		}

		// slider construction beginning
	    var options = $.extend(true, {
	    	touch_control: false,
	    	repeat_slides: true,
	    	autoplay: false,
	    	autoplay_delay: 5,
	    	change_thresold: 10,
	    	control_overlay_selector: 'slider-control-overlay'
	    }, opt);

	    // change_thresold - minimal distance in percentage of the slider width that user should move slide at to change it
		if (typeof options.change_thresold !== 'number' && options.change_thresold < 0 || options.change_thresold > 100) {
			console.log('Invalid \'change_thresold\' value: it is \'' + options.change_thresold + '\', but expected to be a number greater than 0 and lesser than 100. Slider can be created with default thresold value - 10% !');
			options.change_thresold = 10;
		}

		if (return_object) {
			console.log('An object should get returned, but its not yet ready, lol');
		}

	    return this.each(function () {
	    	var base = $( this ), 
	    		list = base.find( options.list_selector ), 
	    		control_overlay = base.find( options.control_overlay_selector ),
	    		arrows = base.find( options.arrows_selector ), 
	    		slides = base.find( options.slides_selector ),
	    		map_items = base.find( options.map_items_selector ),
	    		caption_current = base.find( options.caption_current_selector ), 
	    		width = base.outerWidth(), slider_offset_left = base.offset().left, sliderResizeHandler,
	    		thresold = options.change_thresold,
	    		slides_arr, current,
	    		drag_start_position, relative_position, delta, touch_x, flick, 
	    		get, changeTo, animate,
	    		changeTo_additional_actions = { before: [], after: [] }, 
	    		setAutoplay, autoplay_interval_id,
	    		sign = Math.sign;

	    	if (!list.length) {
	    		console.log('Slider can\'t be created: list element wasn\'t found in the specified slider container: ', base);
	    		return;
	    	}
			if (!slides.length) {
	    		console.log('Slider can\'t be created: slide elements weren\'t found in the specified slider container: ', base);
	    		return; 
	    	}

	    	if (!control_overlay.length) {
	    		control_overlay = $('<div class="' + options.control_overlay_selector + '"></div>');
	    		base.prepend( control_overlay );
	    	}

	    	current = -1;
	    	slides_arr = slides.toArray();

	        if ( caption_current.length ) {
			    caption_current.html( '<span>1</span> / '+ slides.length );
			    caption_current = caption_current.find('span');
			}

		    if (arrows.length) {
			    arrows.each(function() {
					var direction;

					$.each($( this ).attr('class').split(' '), function(i, class_name) {
						if (class_name.indexOf('-back') !== -1) {
							direction = -1;
						} else if (class_name.indexOf('-forward') !== -1) {
							direction = 1;
						}
						return false;
					});

					if (direction) {
						$( this ).on('click', (function(dir) {
							return function() {
								changeTo(current + dir);
							};
						})(direction));
					} else {
						console.log('Warning: some of arrows had neither \"' + options.arrows_selector + '-back' + '\" class nor \"' + options.arrows_selector + '-forward' + '\" class, no event listener can be attached to it!');
					}
			    });
			}

			options.callbacks && options.callbacks.beforeChange && changeTo_additional_actions.before.push(options.callbacks.beforeChange);

	    	get = options.repeat_slides ? 
		    	function(i) {
		    		if ( i<0 ) {
		    			return get( i += slides_arr.length );
		    		} else if (i >= slides_arr.length ) {
		    			return get( i -= slides_arr.length );
		    		}
		    		return i;
		    	} : 
		    	function(i) {
		    		if ( i === slides_arr.length || i === -1 ) {
		    			return current;
		    		}
		    		return i;
		    	};

			if (!options.repeat_slides) {
				changeTo_additional_actions.before.push(function (from, to) {
					if (to === 0) {
						arrows.eq(0).addClass('inactive');
					} else if (to === slides_arr.length - 1) {
						arrows.eq(1).addClass('inactive');
					}
					if (from === 0 && to > from) {
						arrows.eq(0).removeClass('inactive');
					} else if (from === slides_arr.length -1 && to < from) {
						arrows.eq(1).removeClass('inactive');
					}
				});
			}
			if (caption_current.length) {
				changeTo_additional_actions.after.push(function() {
					caption_current.html( current+1 );
				});
			}
		    if ( map_items.length ) {
		    	if ( map_items.length !== slides_arr.length ) {
		    		console('Warning: the amount of map items is not equal to amount of slides in the specified slider container: ', base);
		    	}
		    	map_items.each(function(i, el) {
		    		$( el ).on('click', function() {
		    			changeTo(i);
		    		});
		    	});

		    	changeTo_additional_actions.before.push(function() {
		    		map_items.eq(current).removeClass('active');
		    	})
		    	changeTo_additional_actions.after.push(function() {
		    		map_items.eq(current).addClass('active');
		    	})
		    }

			options.callbacks && options.callbacks.afterChange && changeTo_additional_actions.after.push(options.callbacks.afterChange);
			
			changeTo = function(target) {
				var from = current, 
					to = get( target );

				if (from === to) return;

				var i = 0;
				while (i !== changeTo_additional_actions.before.length) {
					changeTo_additional_actions.before[i](from, to);
					i++;
				}

				current = to;
				animate();

				i = 0;
				while (i !== changeTo_additional_actions.after.length) {
					changeTo_additional_actions.after[i](from, to);
					i++;
				}
			};

			animate = jQuery.support.cssTransitions ? 
				function() {
					list.css('left', -current*100 + '%');
				} :
				function() {
					list.stop(true, false).animate({ 'left': -current*100 + '%' }, 300);
				};

		    /*$( 'body' ).on('keydown',function(e) {
		      if (e.keyCode == 39 || e.keyCode == 37) {
		        changeTo(current+(e.keyCode-38));
		      }
		    })*/
			if (!options.touch_control) {
			    control_overlay.on({
			    	'mousedown': jQuery.support.cssTransitions ?
					function(e) {
			    		e.preventDefault();
			    		base.addClass('dragged');
				    	drag_start_position = e.pageX - slider_offset_left;

				    	if (autoplay_interval_id) {
				    		clearInterval(autoplay_interval_id);
				    		autoplay_interval_id = 0;
				    	}
				    } :
				    function(e) {
			    		e.preventDefault();
			    		base.addClass('dragged');
				    	drag_start_position = e.pageX - slider_offset_left;
				    	list.stop(true, false);

				    	if (autoplay_interval_id) {
				    		clearInterval(autoplay_interval_id);
				    		autoplay_interval_id = 0;
				    	}
				    },
				    'mousemove': function(e) {
				    	if (drag_start_position) {
				    		delta = e.pageX - drag_start_position - slider_offset_left;
				    		// if first or last - restrict moving past them
				    		if ((current === 0 && delta > 0) ||
				    			(current === slides_arr.length - 1 && delta < 0)) {
				    			return;
				    		}

				    		relative_position = delta * (100/width);
				    		list.css('left',  (-current*100 + relative_position) + '%');
					    }
				    },
				    'mouseup': function(e) {
				    	if ( Math.abs(relative_position) > thresold ) {
				    		changeTo( current - sign(relative_position) );
				    	} else {
				    		animate();
				    	}
				    	drag_start_position = 0;
				    	relative_position = 0;
				    	base.removeClass('dragged');

				    	if (options.autoplay) {
				    		setAutoplay();
				    	}
				    }, 
				    'mouseleave': function(e) {
				    	if (drag_start_position) {
					    	if ( Math.abs(relative_position) > thresold ) {
					    		changeTo( current - sign(relative_position) );
					    	} else {
					    		animate();
					    	}
					    	drag_start_position = 0;
					    	relative_position = 0;
					    	base.removeClass('dragged');
					    	
					    	if (options.autoplay) {
					    		setAutoplay();
					    	}
					    }
				    }
			    });
			} else {

			/* if touch */

				/*if (navigator.msMaxTouchPoints) {

				  $('#slider').addClass('ms-touch');

				  $('#slider').on('scroll', function() {
				    list.css('left', ? );
				  });

				}*/
				base.on({
					'touchstart': function(e) {
						flick = true;
						drag_start_position = e.originalEvent.touches[0].pageX - slider_offset_left;

						if (jQuery.support.cssTransitions) {
							list.stop(true, false);
						}

						setTimeout(function() {
							flick = false;
						}, 250);
						
						base.addClass('dragged');

				    	if (autoplay_interval_id) {
				    		clearInterval(autoplay_interval_id);
				    		autoplay_interval_id = 0;
				    	}
					}, 
					'touchmove': function(e) {
						delta = e.originalEvent.touches[0].pageX - drag_start_position - slider_offset_left

			    		if ((current === 0 && delta > 0) || 
			    			(current === slides_arr.length - 1 && delta < 0)) {
			    			return;
			    		}

			    		relative_position = delta * (100/width);
				    	list.css('left', (-current*100 + relative_position) + '%');
					},
					'touchend': function() {
						if ( Math.abs(relative_position) > thresold || flick ) {
				    		changeTo( current - sign(relative_position) );
				    	} else {
				    		animate();
				    	}
				    	drag_start_position = 0;
				    	relative_position = 0;
				    	base.removeClass('dragged');

				    	if (options.autoplay) {
				    		setAutoplay();
				    	}
					}/*,
					'touchcancel': function() {
				    	if ( Math.abs(relative_position) > thresold || flick ) {
				    		changeTo( current - sign(relative_position) );
				    	} else {
				    		animate();
				    	}
				    	drag_start_position = 0;
				    	relative_position = 0;
				    	base.removeClass('dragged');
					}*/
				});
		    } // touch control END

		    // DRAFT!!! Change to some adequate solution
		    // console.log(map_items.filter('.active'));

			sliderResizeHandler = function() {
			    var pre = base.outerWidth(), after = 0;
				slides.hide();
				list.width('auto');
				after = base.outerWidth();
		    	offset_left = base.offset().left;
		    	list.width( pre > after ? after : pre );
		    	slides.show();
		    }

		    window.sliderResize = sliderResizeHandler;
			sliderResizeHandler();
			$( window ).on('resize', function() {
				sliderResizeHandler();
				setTimeout(sliderResizeHandler, 250);
			});

			if (map_items.filter('.active').length) {
				changeTo(map_items.index( map_items.filter('.active') ))
			} else {
				changeTo(0);
			}

			if (options.autoplay) {
				setAutoplay = function() {
					autoplay_interval_id = setInterval(function() {
						changeTo(current + 1);
					}, parseFloat( options.autoplay_delay )*1000)
				}

				setAutoplay();
			}						
	    });
	}; // fn.createSlider END
})()