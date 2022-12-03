! function(i) {
    "use strict";
    "object" != typeof qodef && (window.qodef = {}), window.qodefCore = {}, qodefCore.shortcodes = {}, qodefCore.listShortcodesScripts = {
        qodefSwiper: qodef.qodefSwiper,
        qodefPagination: qodef.qodefPagination,
        qodefFilter: qodef.qodefFilter,
        qodefMasonryLayout: qodef.qodefMasonryLayout
    }, qodefCore.body = i("body"), qodefCore.html = i("html"), qodefCore.windowWidth = i(window).width(), qodefCore.windowHeight = i(window).height(), qodefCore.scroll = 0, i(document).ready(function() {
        qodefCore.scroll = i(window).scrollTop(), e.init()
    }), i(window).resize(function() {
        qodefCore.windowWidth = i(window).width(), qodefCore.windowHeight = i(window).height()
    }), i(window).scroll(function() {
        qodefCore.scroll = i(window).scrollTop()
    }), i(window).load(function() {
        t.init(), r.init()
    });
    qodefCore.qodefIsInViewport = {
        check: function(o, t, i, n) {
            var e, r;
            o.length && (e = void 0 !== o.data("viewport-offset") ? o.data("viewport-offset") : .15, (r = new IntersectionObserver(function(e) {
                !0 === e[0].isIntersecting ? (t.call(o), !1 !== i && r.disconnect()) : n && !1 === i && n.call(o)
            }, {
                threshold: [e]
            })).observe(o[0]))
        }
    };
    var n = {
            disable: function() {
                window.addEventListener && window.addEventListener("wheel", n.preventDefaultValue, {
                    passive: !1
                }), document.onkeydown = n.keyDown
            },
            enable: function() {
                window.removeEventListener && window.removeEventListener("wheel", n.preventDefaultValue, {
                    passive: !1
                }), window.onmousewheel = document.onmousewheel = document.onkeydown = null
            },
            preventDefaultValue: function(e) {
                (e = e || window.event).preventDefault && e.preventDefault(), e.returnValue = !1
            },
            keyDown: function(e) {
                for (var o = [37, 38, 39, 40], t = o.length; t--;)
                    if (e.keyCode === o[t]) return void n.preventDefaultValue(e)
            }
        },
        o = (qodefCore.qodefScroll = n, {
            init: function(e) {
                e.length && o.qodefInitScroll(e)
            },
            qodefInitScroll: function(e) {
                var o = new PerfectScrollbar(e[0], {
                    wheelSpeed: .6,
                    suppressScrollX: !0
                });
                i(window).resize(function() {
                    o.update()
                })
            }
        }),
        e = (qodefCore.qodefPerfectScrollbar = o, {
            init: function() {
                var e;
                this.holder = i("#otaru-core-page-inline-style"), this.holder.length && (e = this.holder.data("style")).length && i("head").append('<style type="text/css">' + e + "</style>")
            }
        }),
        t = {
            init: function() {
                var e = i(".qodef-parallax-item");
                e.length && e.each(function() {
                    var e = i(this),
                        o = Math.floor(-75 * Math.random() - 25);
                    (e.hasClass("qodef-grid-item") ? e.children(".qodef-e-inner") : e).attr("data-parallax", '{"y": ' + o + ', "smoothness": 30}')
                }), t.initParallax()
            },
            initParallax: function() {
                i("[data-parallax]").length && !qodefCore.html.hasClass("touchevents") && "object" == typeof ParallaxScroll && ParallaxScroll.init()
            }
        },
        r = (qodefCore.qodefParallaxItem = t, {
            init: function() {
                this.holder = i(".qodef--has-appear:not(.qodef--appeared), .qodef--custom-appear:not(.qodef--appeared)"), this.holderCustom = i(".qodef--gradient-bg");
                let r = [];

                function a(e, o) {
                    return Math.floor(Math.random() * (o - e)) + e
                }
                this.holder.length && this.holder.each(function(e) {
                    var o = i(this),
                        e = function(e, o, t) {
                            let i = a(e, o);
                            var n = o / 2;
                            return i = 0 === t ? 0 : Math.abs(i - r[t - 1]) >= n ? i : a(e, o), r.push(i), i
                        }(100, 500, e),
                        t = (t = i(this).attr("data-appear-delay")) || e;
                    qodefCore.qodefIsInViewport.check(o, function() {
                        0 != t ? setTimeout(function() {
                            o.addClass("qodef--appeared")
                        }, t) : o.addClass("qodef--appeared")
                    })
                }), this.holderCustom.length && this.holderCustom.each(function() {
                    var e = i(this);
                    qodefCore.qodefIsInViewport.check(e, function() {
                        e.addClass("qodef--in-view")
                    }, !1, function() {
                        e.removeClass("qodef--in-view")
                    })
                })
            }
        });
    qodef.qodefAppear = r
}(jQuery),
function(r) {
    "use strict";
    r(document).ready(function() {
        a.init()
    });
    var a = {
        init: function() {
            this.holder = r("#qodef-back-to-top"), this.holder.length && (this.holder.on("click", function(e) {
                e.preventDefault(), a.animateScrollToTop()
            }), a.showHideBackToTop())
        },
        animateScrollToTop: function() {
            function o() {
                var e;
                0 !== n && (n < 1e-4 && (n = 0), e = a.easingFunction((i - n) / i), r("html, body").scrollTop(i - (i - n) * e), n *= .9, t = requestAnimationFrame(o))
            }
            var t, i = qodef.scroll,
                n = qodef.scroll;
            o(), r(window).one("wheel touchstart", function() {
                cancelAnimationFrame(t)
            })
        },
        easingFunction: function(e) {
            return 0 == e ? 0 : Math.pow(1024, e - 1)
        },
        showHideBackToTop: function() {
            r(window).scroll(function() {
                var e = r(this),
                    o = e.scrollTop(),
                    e = e.height(),
                    o = 0 < o ? o + e / 2 : 1;
                o < 1e3 ? a.addClass("off") : a.addClass("on")
            })
        },
        addClass: function(e) {
            this.holder.removeClass("qodef--off qodef--on"), "on" === e ? this.holder.addClass("qodef--on") : this.holder.addClass("qodef--off")
        }
    }
}(jQuery),
function(o) {
    "use strict";
    o(window).on("load", function() {
        i.init()
    }), o(window).resize(function() {
        i.init()
    });
    var i = {
        init: function() {
            var e = o(".qodef-background-text");
            e.length && e.each(function() {
                i.responsiveOutputHandler(o(this))
            })
        },
        responsiveOutputHandler: function(t) {
            o.each({
                3840: 1441,
                1440: 1367,
                1366: 1025,
                1024: 1
            }, function(e, o) {
                qodef.windowWidth <= e && qodef.windowWidth >= o && i.generateResponsiveOutput(t, e)
            })
        },
        generateResponsiveOutput: function(e, o) {
            e = e.find(".qodef-m-background-text");
            e.length && e.css({
                "font-size": e.data("size-" + o) + "px",
                top: e.data("vertical-offset-" + o) + "px"
            })
        }
    };
    window.qodefBackgroundText = i
}(jQuery),
function(t) {
    "use strict";
    t(window).on("load", function() {
        e.init()
    });
    var e = {
        holder: "",
        init: function() {
            this.holder = t("#qodef-page-footer.qodef--uncover"), this.holder.length && !qodefCore.html.hasClass("touchevents") && (e.addClass(), e.setHeight(this.holder), t(window).resize(function() {
                e.setHeight(e.holder)
            }))
        },
        setHeight: function(e) {
            e.css("height", "auto");
            var o = e.outerHeight();
            0 < o && (t("#qodef-page-outer").css({
                "margin-bottom": o,
                "background-color": qodefCore.body.css("backgroundColor")
            }), e.css("height", o))
        },
        addClass: function() {
            qodefCore.body.addClass("qodef-page-footer--uncover")
        }
    }
}(jQuery),
function(i) {
    "use strict";
    i(document).ready(function() {
        n.init()
    }), i(window).on("resize", function() {
        n.handleHeaderWidth("resize")
    });
    var n = {
        init: function() {
            var t = i("a.qodef-fullscreen-menu-opener"),
                e = i("#qodef-fullscreen-area nav ul li a");
            t.length && (n.handleHeaderWidth("init"), t.on("click", function(e) {
                e.preventDefault();
                var o = i(this);
                qodefCore.body.hasClass("qodef-fullscreen-menu--opened") ? n.closeFullscreen(o) : (n.openFullscreen(o), i(document).keyup(function(e) {
                    27 === e.keyCode && n.closeFullscreen(o)
                }))
            }), e.on("tap click", function(e) {
                var o = i(this);
                o.parent().hasClass("menu-item-has-children") ? (e.preventDefault(), n.clickItemWithChild(o)) : "http://#" !== o.attr("href") && "#" !== o.attr("href") && n.closeFullscreen(t)
            }))
        },
        openFullscreen: function(e) {
            e.addClass("qodef--opened"), qodefCore.body.removeClass("qodef-fullscreen-menu-animate--out").addClass("qodef-fullscreen-menu--opened qodef-fullscreen-menu-animate--in"), qodefCore.qodefScroll.disable()
        },
        closeFullscreen: function(e) {
            e.removeClass("qodef--opened"), qodefCore.body.removeClass("qodef-fullscreen-menu--opened qodef-fullscreen-menu-animate--in").addClass("qodef-fullscreen-menu-animate--out"), qodefCore.qodefScroll.enable(), i("nav.qodef-fullscreen-menu ul.sub_menu").slideUp(600)
        },
        clickItemWithChild: function(e) {
            var e = e.parent(),
                o = e.find(".sub-menu").first();
            o.is(":visible") ? (o.slideUp(600), e.removeClass("qodef--opened")) : (o.slideDown(400), e.addClass("qodef--opened").siblings().removeClass("qodef--opened").find(".sub-menu").slideUp(400))
        },
        handleHeaderWidth: function(e) {
            var o = i("#qodef-page-header"),
                t = i("a.qodef-fullscreen-menu-opener");
            o.length && t.length && (1024 < qodefCore.windowWidth ? qodefCore.body.height() > qodefCore.windowHeight && ("resize" === e && o.css({
                width: ""
            }), o.width(o.width())) : o.css({
                width: ""
            }))
        }
    }
}(jQuery),
function() {
    "use strict";
    jQuery(document).ready(function() {
        e.init()
    });
    var e = {
        appearanceType: function() {
            return -1 !== qodefCore.body.attr("class").indexOf("qodef-header-appearance--") ? qodefCore.body.attr("class").match(/qodef-header-appearance--([\w]+)/)[1] : ""
        },
        init: function() {
            var e = this.appearanceType();
            "" !== e && "none" !== e && qodefCore[e + "HeaderAppearance"]()
        }
    }
}(),
function(d) {
    "use strict";
    d(document).ready(function() {
        e.init()
    });
    var e = {
        init: function() {
            e.dropdownBehavior(), e.wideDropdownPosition(), e.dropdownPosition()
        },
        dropdownBehavior: function() {
            d(".qodef-header-navigation > ul > li").each(function() {
                var t = d(this);
                t.find(".qodef-drop-down-second").length && qodef.qodefWaitForImages.check(t, function() {
                    var e = t.find(".qodef-drop-down-second"),
                        o = e.find(".qodef-drop-down-second-inner ul").outerHeight();
                    navigator.userAgent.match(/(iPod|iPhone|iPad)/) ? t.on("touchstart mouseenter", function() {
                        e.css({
                            height: o,
                            overflow: "visible",
                            visibility: "visible",
                            opacity: "1"
                        })
                    }).on("mouseleave", function() {
                        e.css({
                            height: "0px",
                            overflow: "hidden",
                            visibility: "hidden",
                            opacity: "0"
                        })
                    }) : qodefCore.body.hasClass("qodef-drop-down-second--animate-height") ? t.hoverIntent({
                        interval: 0,
                        over: function() {
                            setTimeout(function() {
                                e.addClass("qodef-drop-down--start").css({
                                    visibility: "visible",
                                    height: "0",
                                    opacity: "1"
                                }), e.stop().animate({
                                    height: o
                                }, 400, "linear", function() {
                                    e.css("overflow", "visible")
                                })
                            }, 100)
                        },
                        timeout: 100,
                        out: function() {
                            e.stop().animate({
                                height: "0",
                                opacity: 0
                            }, 100, function() {
                                e.css({
                                    overflow: "hidden",
                                    visibility: "hidden"
                                })
                            }), e.removeClass("qodef-drop-down--start")
                        }
                    }) : t.hoverIntent({
                        interval: 0,
                        over: function() {
                            setTimeout(function() {
                                e.addClass("qodef-drop-down--start").stop().css({
                                    height: o
                                })
                            }, 150)
                        },
                        timeout: 150,
                        out: function() {
                            e.stop().css({
                                height: "0"
                            }).removeClass("qodef-drop-down--start")
                        }
                    })
                })
            })
        },
        wideDropdownPosition: function() {
            var e = d(".qodef-header-navigation > ul > li.qodef-menu-item--wide");
            e.length && e.each(function() {
                var e, o, t = d(this).find(".qodef-drop-down-second");
                t.length && (t.css("left", 0), e = t.offset().left, qodefCore.body.hasClass("qodef--boxed") ? (o = d(".qodef--boxed #qodef-page-wrapper").outerWidth(), e -= (qodefCore.windowWidth - o) / 2, t.css({
                    left: -e,
                    width: o
                })) : qodefCore.body.hasClass("qodef-drop-down-second--full-width") ? t.css({
                    left: -e,
                    width: qodefCore.windowWidth
                }) : t.css({
                    left: -e + (qodefCore.windowWidth - t.width()) / 2
                }))
            })
        },
        dropdownPosition: function() {
            var e = d(".qodef-header-navigation > ul > li.qodef-menu-item--narrow.menu-item-has-children");
            e.length && e.each(function() {
                var e, o = d(this),
                    t = o.offset().left,
                    i = o.find(".qodef-drop-down-second"),
                    n = i.find(".qodef-drop-down-second-inner ul"),
                    r = n.outerWidth(),
                    a = d(window).width() - t;
                qodef.body.hasClass("qodef--boxed") && (a = d(".qodef--boxed #qodef-page-wrapper").outerWidth() - t), 0 < o.find("li.menu-item-has-children").length && (e = a - r), i.removeClass("qodef-drop-down--right"), n.removeClass("qodef-drop-down--right"), (a < r || e < r) && (i.addClass("qodef-drop-down--right"), n.addClass("qodef-drop-down--right"))
            })
        }
    }
}(jQuery),
function(i) {
    "use strict";
    i(document).ready(function() {
        n.init()
    });
    var n = {
        init: function() {
            var e, o, t;
            qodefCore.body.hasClass("qodef-mobile-header-appearance--sticky") && (e = qodefCore.scroll, o = qodefGlobal.vars.mobileHeaderHeight + qodefGlobal.vars.adminBarHeight, t = i("#qodef-page-outer"), n.showHideMobileHeader(e, o, t), i(window).scroll(function() {
                n.showHideMobileHeader(e, o, t), e = qodefCore.scroll
            }), i(window).resize(function() {
                t.css("padding-top", 0), n.showHideMobileHeader(e, o, t)
            }))
        },
        showHideMobileHeader: function(e, o, t) {
            qodefCore.windowWidth <= 1024 && (qodefCore.scroll > 2 * o ? (qodefCore.body.addClass("qodef-mobile-header--sticky"), setTimeout(function() {
                qodefCore.body.addClass("qodef-mobile-header--sticky-animation")
            }, 300), t.css("padding-top", qodefGlobal.vars.mobileHeaderHeight)) : (qodefCore.body.removeClass("qodef-mobile-header--sticky"), setTimeout(function() {
                qodefCore.body.removeClass("qodef-mobile-header--sticky-animation")
            }, 300), t.css("padding-top", 0)), qodefCore.scroll > e && qodefCore.scroll > o || qodefCore.scroll < 3 * o ? qodefCore.body.removeClass("qodef-mobile-header--sticky-display") : qodefCore.body.addClass("qodef-mobile-header--sticky-display"))
        }
    }
}(jQuery),
function(t) {
    "use strict";
    t(window).on("load", function() {
        i.init()
    });
    var i = {
        init: function(e) {
            this.$sections = t(".qodef-parallax"), t.extend(this.$sections, e);
            e = !qodefCore.html.hasClass("touchevents") && !qodefCore.body.hasClass("qodef-browser--edge") && !qodefCore.body.hasClass("qodef-browser--ms-explorer");
            this.$sections.length && e && this.$sections.each(function(e, o) {
                t(this).hasClass("qodef-parallax--init") || i.ready(t(this), e)
            })
        },
        ready: function(e, o) {
            e.rowHolder = e.find(".qodef-parallax-row-holder"), e.$imgHolder = e.find(".qodef-parallax-img-holder"), e.$imgWrapper = e.find(".qodef-parallax-img-wrapper"), e.$img = e.find("img.qodef-parallax-img"), qodef.qodefWaitForImages.check(e, function() {
                e.$imgHolder.animate({
                    opacity: 1
                }, 1e3), i.calc(e), i.animateParallax(e, o)
            }), t(window).on("resize", function() {
                i.calc(e)
            })
        },
        calc: function(e) {
            var o = (.2 * Math.random() + 1.1).toFixed(2),
                o = (e.speed = parseFloat(e.rowHolder.attr("data-speed")), e.speed = e.speed && !isNaN(e.speed) ? e.speed : o, e.speedNormalized = (e.speed - 1).toFixed(2), e.$imgHolder.css({
                    top: -Math.abs(100 * e.speedNormalized) + "%",
                    height: 100 + Math.abs(100 * e.speedNormalized) + "%"
                }), e.$imgWrapper.height()),
                t = e.$imgWrapper.width(),
                o = e.$img.height() - o,
                t = e.$img.width() - t;
            t < 0 && t <= o && e.$img.css({
                width: "100%",
                height: "auto"
            }), o < 0 && o <= t && e.$img.css({
                height: "100%",
                width: "auto",
                "max-width": "unset"
            })
        },
        animateParallax: function(o, e) {
            var t, i;
            0 != o.speedNormalized && (t = Math.round(o.outerHeight() * o.speedNormalized - 10), i = .5 * Math.random() + .3, gsap.registerPlugin(ScrollTrigger), gsap.timeline({
                defaults: {
                    duration: 1
                },
                scrollTrigger: {
                    trigger: o,
                    scrub: !0,
                    start: () => "top bottom",
                    end: () => "bottom top",
                    onUpdate: e => {
                        gsap.to(o.$imgWrapper, {
                            y: t * e.progress.toFixed(2),
                            duration: i
                        })
                    }
                }
            }))
        }
    };
    qodefCore.qodefParallaxBackground = i
}(jQuery),
function(i) {
    "use strict";
    i(document).ready(function() {
        n.init()
    });
    var n = {
        init: function() {
            var e = i("a.qodef-side-area-opener"),
                o = i("#qodef-side-area-close"),
                t = i("#qodef-side-area");
            n.openerHoverColor(e), e.on("click", function(e) {
                e.preventDefault(), qodefCore.body.hasClass("qodef-side-area--opened") ? n.closeSideArea() : (n.openSideArea(), i(document).keyup(function(e) {
                    27 === e.keyCode && n.closeSideArea()
                }))
            }), o.on("click", function(e) {
                e.preventDefault(), n.closeSideArea()
            }), t.length && "object" == typeof qodefCore.qodefPerfectScrollbar && qodefCore.qodefPerfectScrollbar.init(t)
        },
        openSideArea: function() {
            var e = i("#qodef-page-wrapper"),
                o = i(window).scrollTop();
            i(".qodef-side-area-cover").remove(), e.prepend('<div class="qodef-side-area-cover"/>'), qodefCore.body.removeClass("qodef-side-area-animate--out").addClass("qodef-side-area--opened qodef-side-area-animate--in"), i(".qodef-side-area-cover").on("click", function(e) {
                e.preventDefault(), n.closeSideArea()
            }), i(window).scroll(function() {
                400 < Math.abs(qodefCore.scroll - o) && n.closeSideArea()
            })
        },
        closeSideArea: function() {
            qodefCore.body.removeClass("qodef-side-area--opened qodef-side-area-animate--in").addClass("qodef-side-area-animate--out")
        },
        openerHoverColor: function(e) {
            var o, t;
            void 0 !== e.data("hover-color") && (o = e.data("hover-color"), t = e.css("color"), e.on("mouseenter", function() {
                e.css("color", o)
            }).on("mouseleave", function() {
                e.css("color", t)
            }))
        }
    }
}(jQuery),
function(n) {
    "use strict";
    n(document).ready(function() {
        r.init()
    }), n(window).on("load", function() {
        r.windowLoaded = !0, "visible" === document.visibilityState ? r.fadeOutLoader() : document.addEventListener("visibilitychange", function() {
            "visible" === document.visibilityState && r.fadeOutLoader()
        })
    }), n(window).on("elementor/frontend/init", function() {
        var e = Boolean(elementorFrontend.isEditMode());
        e && r.init(e)
    });
    var r = {
        holder: "",
        windowLoaded: !1,
        init: function(e) {
            this.holder = n("#qodef-page-spinner:not(.qodef--custom-spinner):not(.qodef-layout--textual)"), this.holder.length && (r.animateSpinner(e), r.fadeOutAnimation())
        },
        animateSpinner: function(e) {
            e && r.fadeOutLoader()
        },
        fadeOutLoader: function(o, e, t) {
            var i = r.holder.length ? r.holder : n("#qodef-page-spinner:not(.qodef--custom-spinner):not(.qodef-layout--textual)");
            o = o || 600, t = t || "swing", i.delay(e = e || 0).fadeOut(o, t), n(window).on("bind", "pageshow", function(e) {
                e.originalEvent.persisted && i.fadeOut(o, t)
            })
        },
        fadeOutAnimation: function() {
            var t, e;
            qodefCore.body.hasClass("qodef-spinner--fade-out") && (t = n("#qodef-page-wrapper"), e = n("a"), window.addEventListener("pageshow", function(e) {
                (e.persisted || void 0 !== window.performance && 2 === window.performance.navigation.type) && !t.is(":visible") && t.show()
            }), e.on("click", function(e) {
                var o = n(this);
                1 === e.which && 0 <= o.attr("href").indexOf(window.location.host) && !o.hasClass("remove") && o.parent(".product-remove").length <= 0 && o.parents(".woocommerce-product-gallery__image").length <= 0 && void 0 === o.data("rel") && void 0 === o.attr("rel") && !o.hasClass("lightbox-active") && (void 0 === o.attr("target") || "_self" === o.attr("target")) && o.attr("href").split("#")[0] !== window.location.href.split("#")[0] && (e.preventDefault(), t.fadeOut(600, "easeOutSine", function() {
                    window.location = o.attr("href")
                }))
            }))
        }
    };
    qodefCore.qodefSpinner = r
}(jQuery),
function(o) {
    "use strict";
    qodefCore.shortcodes.otaru_core_accordion = {}, o(document).ready(function() {
        t.init()
    });
    var t = {
        init: function() {
            var e = o(".qodef-accordion");
            e.length && e.each(function() {
                t.initItem(o(this))
            })
        },
        initItem: function(e) {
            e.hasClass("qodef-behavior--accordion") && t.initAccordion(e), e.hasClass("qodef-behavior--toggle") && t.initToggle(e), e.addClass("qodef--init")
        },
        initAccordion: function(e) {
            e.accordion({
                animate: "swing",
                collapsible: !0,
                active: 0,
                icons: "",
                heightStyle: "content"
            })
        },
        initToggle: function(e) {
            e.find(".qodef-accordion-title").off().on("mouseenter", function() {
                o(this).addClass("ui-state-hover")
            }).on("mouseleave", function() {
                o(this).removeClass("ui-state-hover")
            }).on("click", function(e) {
                e.preventDefault(), e.stopImmediatePropagation();
                e = o(this);
                e.hasClass("ui-state-active") ? (e.removeClass("ui-state-active"), e.next().removeClass("ui-accordion-content-active").slideUp(300)) : (e.addClass("ui-state-active"), e.next().addClass("ui-accordion-content-active").slideDown(400))
            })
        }
    };
    qodefCore.shortcodes.otaru_core_accordion.qodefAccordion = t
}(jQuery),
function(e) {
    "use strict";
    qodefCore.shortcodes.otaru_core_button = {}, e(document).ready(function() {
        i.init()
    });
    var i = {
        init: function() {
            this.buttons = e(".qodef-button"), this.buttons.length && this.buttons.each(function() {
                i.initItem(e(this))
            })
        },
        initItem: function(e) {
            i.buttonHoverColor(e), i.buttonHoverBgColor(e), i.buttonHoverBorderColor(e)
        },
        buttonHoverColor: function(e) {
            var o, t;
            void 0 !== e.data("hover-color") && (o = e.data("hover-color"), t = e.css("color"), e.on("mouseenter touchstart", function() {
                i.changeColor(e, "color", o)
            }), e.on("mouseleave touchend", function() {
                i.changeColor(e, "color", t)
            }))
        },
        buttonHoverBgColor: function(e) {
            var o, t;
            void 0 !== e.data("hover-background-color") && (o = e.data("hover-background-color"), t = e.css("background-color"), e.on("mouseenter touchstart", function() {
                i.changeColor(e, "background-color", o)
            }), e.on("mouseleave touchend", function() {
                i.changeColor(e, "background-color", t)
            }))
        },
        buttonHoverBorderColor: function(e) {
            var o, t;
            void 0 !== e.data("hover-border-color") && (o = e.data("hover-border-color"), t = e.css("borderTopColor"), e.on("mouseenter touchstart", function() {
                i.changeColor(e, "border-color", o)
            }), e.on("mouseleave touchend", function() {
                i.changeColor(e, "border-color", t)
            }))
        },
        changeColor: function(e, o, t) {
            e.css(o, t)
        }
    };
    qodefCore.shortcodes.otaru_core_button.qodefButton = i
}(jQuery),
function(e) {
    "use strict";
    qodefCore.shortcodes.otaru_core_countdown = {}, e(document).ready(function() {
        s.init()
    });
    var s = {
        init: function() {
            this.countdowns = e(".qodef-countdown"), this.countdowns.length && this.countdowns.each(function() {
                s.initItem(e(this))
            })
        },
        initItem: function(e) {
            var o = e.find(".qodef-m-date"),
                t = ["week", "day", "hour", "minute", "second"],
                e = s.generateOptions(e, t);
            s.initCountdown(o, e, t)
        },
        generateOptions: function(e, o) {
            var t = {};
            t.date = void 0 !== e.data("date") ? e.data("date") : null;
            for (var i = 0; i < o.length; i++) {
                var n = o[i] + "Label",
                    r = o[i] + "LabelPlural";
                t[n] = void 0 !== e.data(o[i] + "-label") ? e.data(o[i] + "-label") : "", t[r] = void 0 !== e.data(o[i] + "-label-plural") ? e.data(o[i] + "-label-plural") : ""
            }
            return t
        },
        initCountdown: function(i, n, r) {
            var a = new Date(n.date).getTime(),
                d = setInterval(function() {
                    var e = (new Date).getTime(),
                        e = a - e;
                    this.weeks = Math.floor(e / 6048e5), this.days = Math.floor(e % 6048e5 / 864e5), this.hours = Math.floor(e % 864e5 / 36e5), this.minutes = Math.floor(e % 36e5 / 6e4), this.seconds = Math.floor(e % 6e4 / 1e3);
                    for (var o = 0; o < r.length; o++) {
                        var t = r[o] + "s";
                        s.initiateDate(i, this[t], r[o], n)
                    }
                    e < 0 && (clearInterval(d), s.afterClearInterval(i, r, n))
                }, 1e3)
        },
        initiateDate: function(e, o, t, i) {
            e = e.find(".qodef-" + t + "s");
            e.find(".qodef-label").html(1 === o ? i[t + "Label"] : i[t + "LabelPlural"]), o = o < 10 ? "0" + o : o, e.find(".qodef-digit").html(o)
        },
        afterClearInterval: function(e, o, t) {
            for (var i = 0; i < o.length; i++) {
                var n = e.find(".qodef-" + o[i] + "s");
                n.find(".qodef-label").html(t[o[i] + "LabelPlural"]), n.find(".qodef-digit").html("00")
            }
        }
    };
    qodefCore.shortcodes.otaru_core_countdown.qodefCountdown = s
}(jQuery),
function(a) {
    "use strict";
    qodefCore.shortcodes.otaru_core_counter = {}, a(document).ready(function() {
        i.init()
    });
    var i = {
        init: function() {
            this.counters = a(".qodef-counter"), this.counters.length && this.counters.each(function() {
                i.initItem(a(this))
            })
        },
        initItem: function(e) {
            var o = e.find(".qodef-m-digit"),
                t = i.generateOptions(e);
            qodefCore.qodefIsInViewport.check(e, function() {
                i.counterScript(o, t)
            }, !1)
        },
        generateOptions: function(e) {
            var o = {};
            return o.start = void 0 !== e.data("start-digit") && "" !== e.data("start-digit") ? e.data("start-digit") : 0, o.end = void 0 !== e.data("end-digit") && "" !== e.data("end-digit") ? e.data("end-digit") : null, o.step = void 0 !== e.data("step-digit") && "" !== e.data("step-digit") ? e.data("step-digit") : 1, o.delay = void 0 !== e.data("step-delay") && "" !== e.data("step-delay") ? parseInt(e.data("step-delay"), 10) : 100, o.txt = void 0 !== e.data("digit-label") && "" !== e.data("digit-label") ? e.data("digit-label") : "", o
        },
        counterScript: function(e, o) {
            var t = a.extend({
                    start: 0,
                    end: null,
                    step: 1,
                    delay: 50,
                    txt: ""
                }, o || {}),
                i = t.start,
                n = t.end,
                r = (e.text(i + t.txt), setInterval(function() {
                    null !== n && n <= i || (i += t.step, n <= i && (i = n, clearInterval(r)), e.text(i + t.txt))
                }, t.delay))
        }
    };
    qodefCore.shortcodes.otaru_core_counter.qodefCounter = i
}(jQuery),
function(e) {
    "use strict";
    qodefCore.shortcodes.otaru_core_google_map = {}, e(document).ready(function() {
        o.init()
    });
    var o = {
        init: function() {
            this.holder = e(".qodef-google-map"), this.holder.length && this.holder.each(function() {
                o.initItem(e(this))
            })
        },
        initItem: function(e) {
            void 0 !== window.qodefGoogleMap && window.qodefGoogleMap.init(e.find(".qodef-m-map"))
        }
    };
    qodefCore.shortcodes.otaru_core_google_map.qodefGoogleMap = o
}(jQuery),
function(s) {
    "use strict";
    qodefCore.shortcodes.otaru_core_horizontal_accordion_showcase = {}, s(document).ready(function() {
        n.init()
    });
    var n = {
        init: function() {
            const e = s(".qodef-horizontal-accordion-showcase");
            e.length && e.each(function() {
                var e = s(this);
                n.tabItemStyle(e), n.initTab(e)
            })
        },
        initTab: function(e) {
            const d = e.find(".qodef-m-header");
            d.length && d.each(function(o) {
                const e = s(this),
                    t = e.parent(),
                    i = t.find(".elementor-widget"),
                    n = t.find(".qodef-m-content-left-top, .qodef-m-description, .qodef-m-button"),
                    r = t.find(".qodef-m-content-right .qodef-m-image"),
                    a = gsap.timeline({
                        paused: !0
                    });
                a.from(i, {
                    y: 0,
                    opacity: 0,
                    duration: 1.5,
                    stagger: .2
                }).from(n, {
                    y: 50,
                    opacity: 0,
                    duration: .8,
                    stagger: .28
                }, "0").from(r, {
                    scale: .6,
                    y: 120,
                    opacity: 0,
                    duration: 1.2
                }, "<.3"), t.hasClass("active") || 0 !== o || (t.addClass("active"), a.play(0)), e.on("click", function() {
                    t.hasClass("active") && t.index() !== o ? t.removeClass("active") : (t.addClass("active"), a.play(0)), t.siblings(".active").removeClass("active"), d.parent().each(function(e) {
                        e = e <= o ? 0 : 100;
                        s(this).css("transform", "translate3d(" + e + "%, 0, 0)")
                    })
                })
            })
        },
        tabItemStyle: function(t) {
            const i = t.find(".qodef-m-item");
            i.length && i.each(function(e) {
                e++;
                var o = s(this).find(".qodef-m-header");
                n.tabItemStyleDesktop(s(this), i, o, e), e === i.length && t.addClass("qodef--init")
            })
        },
        tabItemStyleDesktop: function(e, o, t, i) {
            t = t.outerWidth();
            e.css({
                width: "calc(100% - " + o.length + " * " + t + "px)",
                left: t * i + "px",
                transform: "translate3d(100%, 0, 0)"
            })
        }
    };
    qodefCore.shortcodes.otaru_core_horizontal_accordion_showcase.qodefHorizontalAccordionShowcase = n
}(jQuery),
function(e) {
    "use strict";
    qodefCore.shortcodes.otaru_core_icon = {}, e(document).ready(function() {
        n.init()
    });
    var n = {
        init: function() {
            this.icons = e(".qodef-icon-holder"), this.icons.length && this.icons.each(function() {
                n.initItem(e(this))
            })
        },
        initItem: function(e) {
            n.iconHoverColor(e), n.iconHoverBgColor(e), n.iconHoverBorderColor(e)
        },
        iconHoverColor: function(e) {
            var o, t, i;
            void 0 !== e.data("hover-color") && (o = e.find("span").length ? e.find("span") : e, t = o.css("color"), i = e.data("hover-color"), e.on("mouseenter", function() {
                n.changeColor(o, "color", i)
            }), e.on("mouseleave", function() {
                n.changeColor(o, "color", t)
            }))
        },
        iconHoverBgColor: function(e) {
            var o, t;
            void 0 !== e.data("hover-background-color") && (o = e.data("hover-background-color"), t = e.css("background-color"), e.on("mouseenter", function() {
                n.changeColor(e, "background-color", o)
            }), e.on("mouseleave", function() {
                n.changeColor(e, "background-color", t)
            }))
        },
        iconHoverBorderColor: function(e) {
            var o, t;
            void 0 !== e.data("hover-border-color") && (o = e.data("hover-border-color"), t = e.css("borderTopColor"), e.on("mouseenter", function() {
                n.changeColor(e, "border-color", o)
            }), e.on("mouseleave", function() {
                n.changeColor(e, "border-color", t)
            }))
        },
        changeColor: function(e, o, t) {
            e.css(o, t)
        }
    };
    qodefCore.shortcodes.otaru_core_icon.qodefIcon = n
}(jQuery),
function() {
    "use strict";
    qodefCore.shortcodes.otaru_core_image_gallery = {}, qodefCore.shortcodes.otaru_core_image_gallery.qodefSwiper = qodef.qodefSwiper, qodefCore.shortcodes.otaru_core_image_gallery.qodefMasonryLayout = qodef.qodefMasonryLayout, qodefCore.shortcodes.otaru_core_image_gallery.qodefMagnificPopup = qodef.qodefMagnificPopup
}(jQuery),
function() {
    "use strict";
    qodefCore.shortcodes.otaru_core_image_slider_with_text = {}, qodefCore.shortcodes.otaru_core_image_slider_with_text.qodefSwiper = qodef.qodefSwiper
}(jQuery),
function(l) {
    "use strict";
    qodefCore.shortcodes.otaru_core_image_with_text = {}, l(window).load(function() {
        f.init()
    });
    var f = {
        init: function() {
            this.holder = document.querySelectorAll(".qodef--canvas-effects .qodef-m-image"), this.holder.length && !qodefCore.html.hasClass("touchevents") && f.initCanvas()
        },
        initCanvas: function() {
            const e = l("#qodef-page-content");
            0 === l(".qodef--main-canvas-holder").length && (e.prepend('<div class="qodef--main-canvas-holder"><canvas id="qodef--main-canvas">\nBrowser does not support canvas</div></canvas>'), f.addScene())
        },
        addScene: function() {
            const e = document.querySelector("#qodef--main-canvas");
            f.mainScene = new class {
                constructor() {
                    this.container = e, this.scene = new THREE.Scene, this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 100), this.camera.position.z = 50, this.renderer = new THREE.WebGLRenderer({
                        antialias: !0,
                        alpha: !0,
                        canvas: this.container,
                        depth: !1
                    }), this.renderer.setPixelRatio(gsap.utils.clamp(1.5, 2, window.devicePixelRatio)), this.renderer.setSize(window.innerWidth, window.innerHeight), this.renderer.setClearColor(15921906, 0), this.clock = new THREE.Clock, this.init()
                }
                init() {
                    this.bindEvent(), this.update()
                }
                bindEvent() {
                    window.addEventListener("resize", () => {
                        this.resize()
                    })
                }
                update() {
                    var o = this.clock.getElapsedTime();
                    for (let e = 0; e < this.scene.children.length; e++) {
                        const t = this.scene.children[e];
                        t.updatePosition(window.scrollY), t.updateTime(o)
                    }
                    this.render();
                    requestAnimationFrame(this.update.bind(this))
                }
                render() {
                    this.renderer.render(this.scene, this.camera)
                }
                resize() {
                    this.renderer.setSize(window.innerWidth, window.innerHeight), this.camera.updateProjectionMatrix();
                    for (let e = 0; e < this.scene.children.length; e++) {
                        const o = this.scene.children[e];
                        o.resize()
                    }
                }
            };
            var o = f.getSimplexNoise(),
                t = f.getVertexShaderImage(),
                o = f.getFragmentShaderImageWave(`
			uniform sampler2D u_map;
			uniform sampler2D u_hovermap;

			uniform float u_time;
			uniform float u_opacity;
			uniform float u_progressHover;

			uniform vec2 u_res;
			uniform vec2 u_mouse;
			uniform vec2 u_ratio;
			uniform vec2 u_hoverratio;

			uniform float u_aspect;
			uniform vec3  u_borderColor;
			uniform float u_borderWidth;

			varying vec2 v_uv;`, o);
            const i = new THREE.PlaneBufferGeometry(1, 1, 1, 1),
                n = new THREE.ShaderMaterial({
                    vertexShader: t,
                    fragmentShader: o,
                    defines: {
                        PR: f.mainScene.renderer.getPixelRatio().toFixed(1)
                    }
                });
            f.holder.forEach((e, o) => f.createFigure(e, o, f.mainScene, i, n))
        },
        createFigure: function(i, e, t, n, r) {
            const o = window.getComputedStyle(i);
            let a = parseFloat(o.getPropertyValue("border-block-start-width")),
                d = o.getPropertyValue("border-block-start-color");
            var s = 0 <= d.indexOf("#");
            d = s ? parseInt(d.replace("#", "0x").toLowerCase(), 16) : d, d = new THREE.Color(d);
            class c extends THREE.Object3D {
                constructor(e, o, t) {
                    super(), this.el = e, this.scene = t.scene, this.mainScene = t, this.resize()
                }
                setBounds() {
                    this.rect = this.el.getBoundingClientRect(), this.bounds = {
                        left: this.rect.left,
                        top: this.rect.top + window.scrollY,
                        width: this.rect.width,
                        height: this.rect.height
                    }, this.updateSize(), this.updatePosition()
                }
                resize() {
                    this.visible && this.setBounds()
                }
                calculateUnitSize(e = this.position.z) {
                    var o = this.mainScene.camera.fov * Math.PI / 180,
                        o = 2 * Math.tan(o / 2) * e;
                    return {
                        width: o * this.mainScene.camera.aspect,
                        height: o
                    }
                }
                updateSize() {
                    this.camUnit = this.calculateUnitSize(this.mainScene.camera.position.z - this.position.z);
                    var e = this.bounds.width / window.innerWidth,
                        o = this.bounds.height / window.innerHeight;
                    e && o && (this.scale.x = this.camUnit.width * e, this.scale.y = this.camUnit.height * o)
                }
                updateY(e = 0) {
                    var {
                        top: o,
                        height: t
                    } = this.bounds;
                    this.position.y = this.camUnit.height / 2 - this.scale.y / 2, this.position.y -= (o - e) / window.innerHeight * this.camUnit.height, this.progress = gsap.utils.clamp(0, 1, 1 - (-e + o + t) / (window.innerHeight + t))
                }
                updateX(e = 0) {
                    var o = this.bounds["left"];
                    this.position.x = -this.camUnit.width / 2 + this.scale.x / 2, this.position.x += (o + e) / window.innerWidth * this.camUnit.width
                }
                updatePosition(e) {
                    this.updateY(e), this.updateX(0)
                }
            }
            return new class extends c {
                constructor(e, o, t) {
                    super(e, o, t), this.$image = i.querySelector(".qodef-m-initial-image img"), this.$hoverImage = i.querySelector(".qodef-m-hover-image img"), this.images = [], this.loader = new THREE.TextureLoader, this.preload([this.$image.src, this.$hoverImage.src], () => {
                        this.start(), e.parentElement.classList.add("qodef--init")
                    }), this.mouse = new THREE.Vector2(0, 0)
                }
                start() {
                    this.addMesh(), this.addEvents()
                }
                addEvents() {
                    i.addEventListener("mouseenter", () => {
                        this.onMouseEnter()
                    }), i.addEventListener("mouseleave", () => {
                        this.onMouseLeave()
                    }), qodefCore.qodefIsInViewport.check(l(i), () => {
                        this.onAppear()
                    })
                }
                addMesh() {
                    var e = this.images[0],
                        o = this.images[1];
                    this.uniforms = {
                        u_mouse: {
                            value: this.mouse
                        },
                        u_time: {
                            value: 0
                        },
                        u_res: {
                            value: new THREE.Vector2(window.innerWidth, window.innerHeight)
                        },
                        u_map: {
                            type: "t",
                            value: e
                        },
                        u_ratio: {
                            value: f.getRatio({
                                x: this.bounds.width,
                                y: this.bounds.height
                            }, e.image)
                        },
                        u_hovermap: {
                            type: "t",
                            value: o
                        },
                        u_hoverratio: {
                            value: f.getRatio({
                                x: this.bounds.width,
                                y: this.bounds.height
                            }, o.image)
                        },
                        u_progressHover: {
                            value: 0
                        },
                        u_aspect: {
                            value: this.bounds.height / this.bounds.width
                        },
                        u_borderWidth: {
                            value: a / this.bounds.width
                        },
                        u_borderColor: {
                            value: d
                        },
                        u_opacity: {
                            value: 0
                        }
                    }, this.geometry = n, this.material = r.clone(), this.material.uniforms = this.uniforms, this.mesh = new THREE.Mesh(this.geometry, this.material), this.add(this.mesh), t.scene.add(this)
                }
                updateTime(e) {
                    this.material.uniforms.u_time.value = e
                }
                onMouseEnter() {
                    this.uniforms && gsap.to(this.uniforms.u_progressHover, {
                        value: 1,
                        duration: 1,
                        overwrite: !0
                    })
                }
                onMouseLeave() {
                    this.uniforms && (gsap.to(this.mouse, {
                        x: 0,
                        y: 0,
                        duration: .5
                    }), gsap.to(this.uniforms.u_progressHover, {
                        value: 0,
                        duration: 1,
                        overwrite: !0
                    }))
                }
                onAppear() {
                    gsap.to(this.uniforms.u_opacity, {
                        value: 1,
                        duration: 1
                    })
                }
                preload(e, o) {
                    let t = 0;
                    const i = e.length,
                        n = (e, o) => {
                            const t = this.loader.load(e, o);
                            t.center.set(.5, .5), this.images.push(t)
                        };
                    e.forEach(e => {
                        n(e, () => {
                            (t += 1) === i && o()
                        })
                    })
                }
            }(i, e, t)
        },
        getRatio: function({
            x: e,
            y: o
        }, {
            width: t,
            height: i
        }) {
            var n, r, a, d;
            return [{
                x: e,
                y: o
            }, {
                width: t,
                height: i
            }, n = 0] = [{
                x: e,
                y: o
            }, {
                width: t,
                height: i
            }], n = THREE.MathUtils.degToRad(n), n = [Math.cos(n), -Math.sin(n), Math.sin(n), Math.cos(n)], e = [e, o], o = n[0], r = n[1], a = n[2], n = n[3], d = e[0], e = e[1], o = [Math.abs(d * o + e * a), Math.abs(d * r + e * n)], a = {
                w: o[0] / t,
                h: o[1] / i
            }, d = 1 / Math.max(a.w, a.h), new THREE.Vector2(a.w * d, a.h * d)
        },
        getSimplexNoise() {
            return `
				float circle(in vec2 _st, in float _radius, in float blurriness){
					vec2 dist = _st;
					return 1.-smoothstep(_radius-(_radius*blurriness), _radius+(_radius*blurriness), dot(dist,dist)*4.0);
				}

				vec3 mod289(vec3 x) {
					return x - floor(x * (1.0 / 289.0)) * 289.0;
				}

				vec4 mod289(vec4 x) {
					return x - floor(x * (1.0 / 289.0)) * 289.0;
				}

				vec4 permute(vec4 x) {
					return mod289(((x*34.0)+1.0)*x);
				}

				vec4 taylorInvSqrt(vec4 r)
				{
					return 1.79284291400159 - 0.85373472095314 * r;
				}

				float snoise3(vec3 v)
				{
					const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
					const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

					// First corner
					vec3 i  = floor(v + dot(v, C.yyy) );
					vec3 x0 =   v - i + dot(i, C.xxx) ;

					// Other corners
					vec3 g = step(x0.yzx, x0.xyz);
					vec3 l = 1.0 - g;
					vec3 i1 = min( g.xyz, l.zxy );
					vec3 i2 = max( g.xyz, l.zxy );

					//   x0 = x0 - 0.0 + 0.0 * C.xxx;
					//   x1 = x0 - i1  + 1.0 * C.xxx;
					//   x2 = x0 - i2  + 2.0 * C.xxx;
					//   x3 = x0 - 1.0 + 3.0 * C.xxx;
					vec3 x1 = x0 - i1 + C.xxx;
					vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
					vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y

					// Permutations
					i = mod289(i);
					vec4 p = permute( permute( permute(
					i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
					+ i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
					+ i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

					// Gradients: 7x7 points over a square, mapped onto an octahedron.
					// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
					float n_ = 0.142857142857; // 1.0/7.0
					vec3  ns = n_ * D.wyz - D.xzx;

					vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

					vec4 x_ = floor(j * ns.z);
					vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

					vec4 x = x_ *ns.x + ns.yyyy;
					vec4 y = y_ *ns.x + ns.yyyy;
					vec4 h = 1.0 - abs(x) - abs(y);

					vec4 b0 = vec4( x.xy, y.xy );
					vec4 b1 = vec4( x.zw, y.zw );

					//vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
					//vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
					vec4 s0 = floor(b0)*2.0 + 1.0;
					vec4 s1 = floor(b1)*2.0 + 1.0;
					vec4 sh = -step(h, vec4(0.0));

					vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
					vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

					vec3 p0 = vec3(a0.xy,h.x);
					vec3 p1 = vec3(a0.zw,h.y);
					vec3 p2 = vec3(a1.xy,h.z);
					vec3 p3 = vec3(a1.zw,h.w);

					//Normalise gradients
					vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
					p0 *= norm.x;
					p1 *= norm.y;
					p2 *= norm.z;
					p3 *= norm.w;

					// Mix final noise value
					vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
					m = m * m;
					return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),dot(p2,x2), dot(p3,x3) ) );
				}`
        },
        getVertexShaderDefault() {
            return `
				varying vec2 v_uv;

				void main() {
					v_uv = uv;
					vec3 pos = position;

					gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
				}`
        },
        getFragmentShaderDefault() {
            return `
					varying vec2 v_uv;

					void main() {
						vec4 borderColor = vec4(1.0, 0., 1.0, 1.0);

						gl_FragColor = borderColor;
					}`
        },
        getVertexShaderImage() {
            return `
				varying vec2 v_uv;

				void main() {
					v_uv = uv;

					gl_Position = projectionMatrix * modelViewMatrix *
						vec4(position, 1.);
				}`
        },
        getFragmentShaderImageWave(e, o) {
            return `
					${e}

					${o}

					void main() {
					 	vec2 resolution = u_res * PR;
						float time = u_time * 0.06;
						float opacity = u_opacity;

						float progressHover = u_progressHover;
						vec2 uv = v_uv;
						vec2 uv_h = v_uv;

						vec2 st = gl_FragCoord.xy / resolution.xy - vec2(.5);
						st.y *= resolution.y / resolution.x;

						vec2 mouse = u_mouse * -0.5;

						float offX = uv.x * .3 - time * 0.3;
						float offY = uv.y + sin(uv.x * 5.) * .1 - sin(time * 0.5) + snoise3(vec3(uv.x, uv.y, time) * 0.5);
						offX += snoise3(vec3(offX, offY, time) * 5.) * .3;
						offY += snoise3(vec3(offX, offX, time * 0.3)) * .1;
						float nc = (snoise3(vec3(offX, offY, time * .5) * 8.)) * progressHover;
						float nh = (snoise3(vec3(offX, offY, time * .5 ) * 2.)) * .03;

						nh *= smoothstep(nh, 0.5, 0.6);

						uv_h -= vec2(0.5);
						uv_h *= u_hoverratio;
						uv_h += vec2(0.5);

						uv -= vec2(0.5);
						uv *= u_ratio;
						uv += vec2(0.5);

						vec4 image = texture2D(u_map, uv_h + vec2(nc + nh) * progressHover);
						vec4 hover = texture2D(u_hovermap, uv + vec2(nc + nh) * progressHover);

						vec4 finalImage = mix(image, hover, clamp(nh + progressHover, 0., 1.0));

						//border edges
						float minX = u_borderWidth;
						float maxX = 1.0 - minX;
						float minY = minX / u_aspect;
						// float maxY = 1.0 - minY;
						float maxY = 1.0 - (minY * 1.5); //1.5 bug fix, top border does not render well

						vec4 borderColor = vec4(vec3(u_borderColor), 1.0);

						vec4 finalFigure = vec4(1.0, 1.0, 1.0, 1.0);

						if (uv.x < minX || uv.x > maxX || uv.y < minY || uv.y > maxY ) {//border
						 finalFigure = borderColor;
					   } else {
						 finalFigure = finalImage;
					   }

					   gl_FragColor = finalFigure * opacity;
					}`
        }
    };
    qodefCore.shortcodes.otaru_core_image_with_text.qodefCanvasEffect = f, qodefCore.shortcodes.otaru_core_image_with_text.qodefMagnificPopup = qodef.qodefMagnificPopup
}(jQuery),
function() {
    "use strict";
    qodefCore.shortcodes.otaru_core_interactive_link_showcase = {}
}(jQuery),
function(e) {
    "use strict";
    qodefCore.shortcodes.otaru_core_item_showcase = {}, e(document).ready(function() {
        o.init()
    });
    var o = {
        init: function() {
            this.holder = e(".qodef-item-showcase"), this.holder.length && this.holder.each(function() {
                o.initItem(e(this))
            })
        },
        initItem: function(e) {
            qodefCore.qodefIsInViewport.check(e, function() {
                e.addClass("qodef--init")
            })
        }
    };
    qodefCore.shortcodes.otaru_core_item_showcase.qodefItemShowcaseList = o
}(jQuery),
function(e) {
    "use strict";
    qodefCore.shortcodes.otaru_core_progress_bar = {}, e(document).ready(function() {
        r.init()
    });
    var r = {
        init: function() {
            this.holder = e(".qodef-progress-bar"), this.holder.length && this.holder.each(function() {
                r.initItem(e(this))
            })
        },
        initItem: function(i) {
            var n = i.data("layout");
            qodefCore.qodefIsInViewport.check(i, function() {
                i.addClass("qodef--init");
                var e = i.find(".qodef-m-canvas"),
                    o = r.generateBarData(i, n),
                    t = i.data("number") / 100;
                switch (n) {
                    case "circle":
                        r.initCircleBar(e, o, t);
                        break;
                    case "line":
                        o = r.generateLineData(i, t), r.initLineBar(e, o)
                }
            }, !1)
        },
        generateBarData: function(e, t) {
            var o = e.data("active-line-width"),
                i = e.data("active-line-color"),
                n = e.data("inactive-line-width"),
                r = e.data("inactive-line-color");
            return {
                strokeWidth: o,
                color: i,
                trailWidth: n,
                trailColor: r,
                easing: "linear",
                duration: void 0 !== e.data("duration") && "" !== e.data("duration") ? parseInt(e.data("duration"), 10) : 1600,
                svgStyle: {
                    width: "100%",
                    height: "100%"
                },
                text: {
                    style: {
                        color: e.data("text-color")
                    },
                    autoStyleContainer: !1
                },
                from: {
                    color: r
                },
                to: {
                    color: i
                },
                step: function(e, o) {
                    "custom" !== t && o.setText(Math.round(100 * o.value()) + '<span class="qodef--mark">$</span>')
                }
            }
        },
        generateLineData: function(e, o) {
            var t = e.data("active-line-width"),
                i = e.data("active-line-color"),
                n = e.data("inactive-line-width"),
                r = e.data("inactive-line-color"),
                a = void 0 !== e.data("duration") && "" !== e.data("duration") ? parseInt(e.data("duration"), 10) : 1600,
                d = e.data("text-color");
            return {
                percentage: 100 * o,
                duration: a,
                fillBackgroundColor: i,
                backgroundColor: r,
                height: t,
                inactiveHeight: n,
                followText: e.hasClass("qodef-percentage--floating"),
                textColor: d
            }
        },
        initCircleBar: function(e, o, t) {
            r.checkBar(e) && new ProgressBar.Circle(e[0], o).animate(t)
        },
        initLineBar: function(e, o) {
            e.LineProgressbar(o)
        },
        checkBar: function(e) {
            return !e.find("svg").length
        }
    };
    qodefCore.shortcodes.otaru_core_progress_bar.qodefProgressBar = r
}(jQuery),
function(o) {
    "use strict";
    qodefCore.shortcodes.otaru_core_section_title = {}, o(window).load(function() {
        t.init()
    });
    var t = {
        init: function() {
            var e = o(".qodef-section-title.qodef--has-appear");
            e.length && e.each(function() {
                var e = o(this);
                t.initAppear(e)
            })
        },
        initAppear: function(e) {
            gsap.set(e, {
                opacity: 0,
                y: 80,
                skewY: 6
            }), qodefCore.qodefIsInViewport.check(e, function() {
                gsap.to(e, {
                    opacity: 1,
                    y: 0,
                    skewY: 0,
                    duration: .9
                })
            })
        }
    };
    qodefCore.shortcodes.otaru_core_section_title.qodefSectionTitleAppear = t, qodefCore.shortcodes.otaru_core_section_title.qodefAppear = qodefCore.qodefAppear
}(jQuery),
function(a) {
    "use strict";
    qodefCore.shortcodes.otaru_core_tabbed_info = {}, a(document).ready(function() {
        t.init()
    }), a(window).resize(function() {
        t.init()
    });
    const t = {
        init() {
            this.holder = a(".qodef-m.qodef-tabbed-info:not(.qodef-button)"), this.holder.length && this.holder.each((e, o) => {
                o = a(o);
                t.itemInit(o), t.setHeight(o)
            })
        },
        itemInit(e) {
            e.children(".qodef-m-content").each(function(e) {
                e += 1;
                var o = a(this),
                    t = o.attr("id"),
                    o = o.parent().find(".qodef-m-navigation li:nth-child(" + e + ") a"),
                    e = o.attr("href"); - 1 < (t = "#" + t).indexOf(e) && o.attr("href", t)
            }), e.addClass("qodef--init").tabs()
        },
        setHeight(e) {
            const o = e.find(".qodef-m-navigation"),
                t = e.find(".qodef-m-content");
            let i, n, r = 0;
            o.length && (i = o.outerHeight(!0)), t.length && t.each((e, o) => {
                n = a(o).outerHeight(!0), r = n > r ? n : r
            }), e.height(i + r)
        }
    };
    qodefCore.shortcodes.otaru_core_tabbed_info.qodefTabbedInfo = t
}(jQuery),
function() {
    "use strict";
    qodefCore.shortcodes.otaru_core_video_button = {}, qodefCore.shortcodes.otaru_core_video_button.qodefMagnificPopup = qodef.qodefMagnificPopup
}(jQuery),
function(e) {
    "use strict";
    qodefCore.shortcodes.otaru_core_text_marquee = {}, e(document).ready(function() {
        r.init()
    }), e(window).resize(function() {
        r.init()
    });
    var r = {
        init: function() {
            this.holder = e(".qodef-text-marquee"), this.holder.length && this.holder.each(function() {
                r.prepareContent(e(this)), r.calculateWidthRatio(e(this))
            })
        },
        prepareContent: function(e) {
            var o = e.find(".qodef--copy");
            e.removeClass("qodef--init"), o.length && o.remove()
        },
        calculateWidthRatio: function(e) {
            for (var o = e.find(".qodef-m-content"), t = o.find(".qodef-m-content-inner"), i = Math.ceil(o.outerWidth() / t.outerWidth()), n = 0; n < i; n++) r.duplicateContent(o, t);
            e.addClass("qodef--init")
        },
        duplicateContent: function(e, o) {
            o.clone().appendTo(e).addClass("qodef--copy")
        }
    };
    qodefCore.shortcodes.otaru_core_text_marquee.qodefTextMarquee = r
}(jQuery),
function(e) {
    "use strict";
    var t = "otaru_core_blog_list";
    qodefCore.shortcodes[t] = {}, "object" == typeof qodefCore.listShortcodesScripts && e.each(qodefCore.listShortcodesScripts, function(e, o) {
        qodefCore.shortcodes[t][e] = o
    }), qodefCore.shortcodes[t].qodefResizeIframes = qodef.qodefResizeIframes
}(jQuery),
function(a) {
    "use strict";
    a(document).ready(function() {
        t.init()
    });
    var t = {
        openedScroll: 0,
        initNavigation: function(e) {
            e = e.find(".qodef-header-vertical-sliding-navigation");
            e.hasClass("qodef-vertical-sliding-drop-down--below") ? t.dropdownClickToggle(e) : e.hasClass("qodef-vertical-sliding-drop-down--side") && t.dropdownFloat(e)
        },
        dropdownClickToggle: function(e) {
            var r = e.find("ul li.menu-item-has-children");
            r.each(function() {
                var o = a(this).find(" > .qodef-drop-down-second, > ul"),
                    t = this,
                    i = a(this).find("> a"),
                    n = "fast";
                i.on("click tap", function(e) {
                    e.preventDefault(), e.stopPropagation(), o.is(":visible") ? (a(t).removeClass("qodef-menu-item--open"), o.slideUp(n)) : (i.parent().parent().children().hasClass("qodef-menu-item--open") && i.parent().parent().parent().hasClass("qodef-vertical-menu") ? (a(this).parent().parent().children().removeClass("qodef-menu-item--open"), a(this).parent().parent().children().find(" > .qodef-drop-down-second").slideUp(n)) : (a(this).parents("li").hasClass("qodef-menu-item--open") || (r.removeClass("qodef-menu-item--open"), r.find(" > .qodef-drop-down-second, > ul").slideUp(n)), a(this).parent().parent().children().hasClass("qodef-menu-item--open") && (a(this).parent().parent().children().removeClass("qodef-menu-item--open"), a(this).parent().parent().children().find(" > .qodef-drop-down-second, > ul").slideUp(n))), a(t).addClass("qodef-menu-item--open"), o.slideDown("slow"))
                })
            })
        },
        dropdownFloat: function(e) {
            var i = e.find("ul li.menu-item-has-children"),
                n = i.find(" > .qodef-drop-down-second > .qodef-drop-down-second-inner > ul, > ul");
            i.each(function() {
                var o = a(this).find(" > .qodef-drop-down-second > .qodef-drop-down-second-inner > ul, > ul"),
                    t = this;
                Modernizr.touch ? a(this).find("> a").on("click tap", function(e) {
                    e.preventDefault(), e.stopPropagation(), o.hasClass("qodef-float--open") ? (o.removeClass("qodef-float--open"), a(t).removeClass("qodef-menu-item--open")) : (a(this).parents("li").hasClass("qodef-menu-item--open") || (i.removeClass("qodef-menu-item--open"), n.removeClass("qodef-float--open")), o.addClass("qodef-float--open"), a(t).addClass("qodef-menu-item--open"))
                }) : a(this).hoverIntent({
                    over: function() {
                        o.addClass("qodef-float--open"), a(t).addClass("qodef-menu-item--open")
                    },
                    out: function() {
                        o.removeClass("qodef-float--open"), a(t).removeClass("qodef-menu-item--open")
                    },
                    timeout: 300
                })
            })
        },
        verticalSlidingAreaScrollable: function(e) {
            return e.hasClass("qodef-with-scroll")
        },
        initVerticalSlidingAreaScroll: function(e) {
            t.verticalSlidingAreaScrollable(e) && "object" == typeof qodefCore.qodefPerfectScrollbar && qodefCore.qodefPerfectScrollbar.init(e)
        },
        verticalSlidingAreaShowHide: function(o) {
            o.find(".qodef-vertical-sliding-menu-opener").on("click", function(e) {
                e.preventDefault();
                e = a(this);
                o.hasClass("qodef-vertical-sliding-menu--opened") ? (e.removeClass("qodef--opened"), o.removeClass("qodef-vertical-sliding-menu--opened")) : (e.addClass("qodef--opened"), o.addClass("qodef-vertical-sliding-menu--opened"), t.openedScroll = qodef.window.scrollTop())
            })
        },
        verticalSlidingAreaCloseOnScroll: function(e) {
            qodef.window.on("scroll", function() {
                e.hasClass("qodef-vertical-sliding-menu--opened") && 400 < Math.abs(qodef.scroll - t.openedScroll) && (e.find(".qodef-vertical-sliding-menu-opener").removeClass("qodef--opened"), e.removeClass("qodef-vertical-sliding-menu--opened"))
            })
        },
        init: function() {
            var e = a(".qodef-header--vertical-sliding #qodef-page-header");
            e.length && (t.verticalSlidingAreaShowHide(e), t.verticalSlidingAreaCloseOnScroll(e), t.initNavigation(e), t.initVerticalSlidingAreaScroll(e))
        }
    }
}(jQuery),
function(t) {
    "use strict";
    var i = {
        showHideHeader: function(e, o) {
            1024 < qodefCore.windowWidth && (qodefCore.scroll <= 0 ? (qodefCore.body.removeClass("qodef-header--fixed-display"), e.css("padding-top", "0"), o.css("margin-top", "0")) : (qodefCore.body.addClass("qodef-header--fixed-display"), e.css("padding-top", parseInt(qodefGlobal.vars.headerHeight + qodefGlobal.vars.topAreaHeight) + "px"), o.css("margin-top", parseInt(qodefGlobal.vars.topAreaHeight) + "px")))
        },
        init: function() {
            var e, o;
            qodefCore.body.hasClass("qodef-header--vertical") || (e = t("#qodef-page-outer"), o = t("#qodef-page-header"), i.showHideHeader(e, o), t(window).scroll(function() {
                i.showHideHeader(e, o)
            }), t(window).resize(function() {
                e.css("padding-top", "0"), i.showHideHeader(e, o)
            }))
        }
    };
    qodefCore.fixedHeaderAppearance = i.init
}(jQuery),
function(i) {
    "use strict";
    var n = {
        header: "",
        docYScroll: 0,
        init: function() {
            var e = n.displayAmount();
            n.header = i(".qodef-header-sticky"), n.docYScroll = i(document).scrollTop(), n.setVisibility(e), i(window).scroll(function() {
                n.setVisibility(e)
            })
        },
        displayAmount: function() {
            return 0 !== qodefGlobal.vars.qodefStickyHeaderScrollAmount ? parseInt(qodefGlobal.vars.qodefStickyHeaderScrollAmount, 10) : parseInt(qodefGlobal.vars.headerHeight + qodefGlobal.vars.adminBarHeight, 10)
        },
        setVisibility: function(e) {
            var o, t = qodefCore.scroll < e;
            n.header.hasClass("qodef-appearance--up") && (t = (o = i(document).scrollTop()) > n.docYScroll && e < o || o < e, n.docYScroll = i(document).scrollTop()), n.showHideHeader(t)
        },
        showHideHeader: function(e) {
            e ? qodefCore.body.removeClass("qodef-header--sticky-display") : qodefCore.body.addClass("qodef-header--sticky-display")
        }
    };
    qodefCore.stickyHeaderAppearance = n.init
}(jQuery),
function(a) {
    "use strict";
    a(document).ready(function() {
        o.init()
    });
    var o = {
        initNavigation: function(e) {
            e = e.find(".qodef-header-vertical-navigation");
            e.hasClass("qodef-vertical-drop-down--below") ? o.dropdownClickToggle(e) : e.hasClass("qodef-vertical-drop-down--side") && o.dropdownFloat(e)
        },
        dropdownClickToggle: function(e) {
            var r = e.find("ul li.menu-item-has-children");
            r.each(function() {
                var o = a(this).find(" > .qodef-drop-down-second, > ul"),
                    t = this,
                    i = a(this).find("> a"),
                    n = "fast";
                i.on("click tap", function(e) {
                    e.preventDefault(), e.stopPropagation(), o.is(":visible") ? (a(t).removeClass("qodef-menu-item--open"), o.slideUp(n)) : (i.parent().parent().children().hasClass("qodef-menu-item--open") && i.parent().parent().parent().hasClass("qodef-vertical-menu") ? (a(this).parent().parent().children().removeClass("qodef-menu-item--open"), a(this).parent().parent().children().find(" > .qodef-drop-down-second").slideUp(n)) : (a(this).parents("li").hasClass("qodef-menu-item--open") || (r.removeClass("qodef-menu-item--open"), r.find(" > .qodef-drop-down-second, > ul").slideUp(n)), a(this).parent().parent().children().hasClass("qodef-menu-item--open") && (a(this).parent().parent().children().removeClass("qodef-menu-item--open"), a(this).parent().parent().children().find(" > .qodef-drop-down-second, > ul").slideUp(n))), a(t).addClass("qodef-menu-item--open"), o.slideDown("slow"))
                })
            })
        },
        dropdownFloat: function(e) {
            var i = e.find("ul li.menu-item-has-children"),
                n = i.find(" > .qodef-drop-down-second > .qodef-drop-down-second-inner > ul, > ul");
            i.each(function() {
                var o = a(this).find(" > .qodef-drop-down-second > .qodef-drop-down-second-inner > ul, > ul"),
                    t = this;
                Modernizr.touch ? a(this).find("> a").on("click tap", function(e) {
                    e.preventDefault(), e.stopPropagation(), o.hasClass("qodef-float--open") ? (o.removeClass("qodef-float--open"), a(t).removeClass("qodef-menu-item--open")) : (a(this).parents("li").hasClass("qodef-menu-item--open") || (i.removeClass("qodef-menu-item--open"), n.removeClass("qodef-float--open")), o.addClass("qodef-float--open"), a(t).addClass("qodef-menu-item--open"))
                }) : a(this).hoverIntent({
                    over: function() {
                        o.addClass("qodef-float--open"), a(t).addClass("qodef-menu-item--open")
                    },
                    out: function() {
                        o.removeClass("qodef-float--open"), a(t).removeClass("qodef-menu-item--open")
                    },
                    timeout: 300
                })
            })
        },
        verticalAreaScrollable: function(e) {
            return e.hasClass("qodef-with-scroll")
        },
        initVerticalAreaScroll: function(e) {
            o.verticalAreaScrollable(e) && "object" == typeof qodefCore.qodefPerfectScrollbar && qodefCore.qodefPerfectScrollbar.init(e)
        },
        init: function() {
            var e = a(".qodef-header--vertical #qodef-page-header");
            e.length && (o.initNavigation(e), o.initVerticalAreaScroll(e))
        }
    }
}(jQuery),
function(a) {
    "use strict";
    a(document).ready(function() {
        t.init()
    });
    var t = {
        init: function() {
            var e, o = a("#qodef-side-area-mobile-header");
            o.length && qodefCore.body.hasClass("qodef-mobile-header--side-area") && (e = o.find(".qodef-m-navigation"), t.initOpenerTrigger(o, e), t.initNavigationClickToggle(e), "object" == typeof qodefCore.qodefPerfectScrollbar && qodefCore.qodefPerfectScrollbar.init(o))
        },
        initOpenerTrigger: function(o, e) {
            var t = a(".qodef-side-area-mobile-header-opener"),
                i = o.children(".qodef-m-close");
            t.length && e.length && t.on("tap click", function(e) {
                e.stopPropagation(), e.preventDefault(), o.hasClass("qodef--opened") ? o.removeClass("qodef--opened") : o.addClass("qodef--opened")
            }), i.on("tap click", function(e) {
                e.stopPropagation(), e.preventDefault(), o.hasClass("qodef--opened") && o.removeClass("qodef--opened")
            })
        },
        initNavigationClickToggle: function(e) {
            var r = e.find("ul li.menu-item-has-children");
            r.each(function() {
                var o = a(this),
                    t = o.find(" > .qodef-drop-down-second, > ul"),
                    i = o.find("> .qodef-menu-item-arrow"),
                    n = "fast";
                i.on("click tap", function(e) {
                    e.preventDefault(), e.stopPropagation(), t.is(":visible") ? (o.removeClass("qodef-menu-item--open"), t.slideUp(n)) : (i.parent().parent().children().hasClass("qodef-menu-item--open") && i.parent().parent().parent().hasClass("qodef-vertical-menu") ? (o.parent().parent().children().removeClass("qodef-menu-item--open"), o.parent().parent().children().find(" > .qodef-drop-down-second").slideUp(n)) : (o.parents("li").hasClass("qodef-menu-item--open") || (r.removeClass("qodef-menu-item--open"), r.find(" > .qodef-drop-down-second, > ul").slideUp(n)), o.parent().parent().children().hasClass("qodef-menu-item--open") && (o.parent().parent().children().removeClass("qodef-menu-item--open"), o.parent().parent().children().find(" > .qodef-drop-down-second, > ul").slideUp(n))), o.addClass("qodef-menu-item--open"), t.slideDown("slow"))
                })
            })
        }
    }
}(jQuery),
function(n) {
    "use strict";
    n(document).ready(function() {
        r.init()
    }), n(window).on("load", function() {
        r.windowLoaded = !0, r.completeAnimation()
    }), n(window).on("elementor/frontend/init", function() {
        var e = Boolean(elementorFrontend.isEditMode());
        e && r.init(e)
    });
    var r = {
        holder: "",
        windowLoaded: !1,
        percentNumber: 0,
        init: function(e) {
            this.holder = n("#qodef-page-spinner.qodef-layout--progress-bar"), this.holder.length && r.animateSpinner(this.holder, e)
        },
        animateSpinner: function(e, o) {
            var t = e.find(".qodef-m-spinner-number-label"),
                i = (e.find(".qodef-m-spinner-line-front").animate({
                    width: "100%"
                }, 1e4, "linear"), setInterval(function() {
                    r.animatePercent(t, r.percentNumber), r.windowLoaded && clearInterval(i)
                }, 100));
            o && r.fadeOutLoader(e)
        },
        completeAnimation: function() {
            var e = r.holder.length ? r.holder : n("#qodef-page-spinner.qodef-layout--progress-bar"),
                o = setInterval(function() {
                    100 <= r.percentNumber ? (clearInterval(o), e.find(".qodef-m-spinner-line-front").stop().animate({
                        width: "100%"
                    }, 500), e.addClass("qodef--finished"), setTimeout(function() {
                        r.fadeOutLoader(e)
                    }, 600)) : r.animatePercent(e.find(".qodef-m-spinner-number-label"), r.percentNumber)
                }, 6)
        },
        animatePercent: function(e, o) {
            o < 100 && (e.text(o += 5), r.percentNumber = o)
        },
        fadeOutLoader: function(o, t, e, i) {
            t = t || 600, i = i || "swing", o.delay(e = e || 0).fadeOut(t, i), n(window).on("bind", "pageshow", function(e) {
                e.originalEvent.persisted && o.fadeOut(t, i)
            })
        }
    }
}(jQuery),
function(r) {
    "use strict";
    r(document).ready(function() {
        t.init()
    }), r(window).on("elementor/frontend/init", function() {
        var e = Boolean(elementorFrontend.isEditMode());
        e && t.init(e)
    });
    const t = {
        init(e) {
            var o = r("#qodef-page-spinner.qodef-layout--textual");
            o.length && !e && t.animateSpinner(o)
        },
        animateSpinner(e) {
            var o = e.find(".qodef-m-textual"),
                t = r(".qodef--custom-landing-appear"),
                i = gsap.timeline({
                    paused: !0,
                    onStart: () => {
                        e.addClass("qodef--complete")
                    }
                });
            i.to(o, {
                autoAlpha: 0,
                duration: 1,
                onComplete: () => {
                    o.css("animation", "none")
                }
            }).to(e, {
                autoAlpha: 0,
                duration: 1.5
            }, ">-.2").from(t, {
                y: 50,
                opacity: 0,
                duration: .7,
                stagger: .4
            }, ">-1.2");
            var n = setInterval(function() {
                qodefCore.qodefSpinner.windowLoaded && (window.scrollTo(0, 0), i.play(), clearInterval(n))
            }, 3e3)
        }
    }
}(jQuery),
function(a) {
    "use strict";
    qodefCore.shortcodes.otaru_core_instagram_list = {}, a(document).ready(function() {
        i.init()
    });
    var i = {
        init: function() {
            this.holder = a(".qodef-instagram-list #sb_instagram"), this.holder.length && this.holder.each(function() {
                var e, o, t;
                a(this).parent().hasClass("qodef-instagram-columns") ? (o = (e = a(this).find("#sbi_images")).find(".sbi_item.sbi_type_image"), t = e.css("padding"), e.css("padding", "0"), e.css("margin", "-" + t), e.css("width", "calc(100% + " + t + " + " + t + ")"), o.attr("style", "padding: " + t + "!important")) : a(this).parent().hasClass("qodef-instagram-slider") && i.initSlider(a(this))
            })
        },
        initSlider: function(e, o) {
            var t = e.find("#sbi_images"),
                i = e.find(".sbi_item.sbi_type_image"),
                n = t.css("padding"),
                r = (t.css("padding", "0"), i.css("padding", "0"), t.attr("style", "margin-right: " + 2 * parseInt(n) + "px !important"), {});
            r.spaceBetween = 2 * parseInt(n), r.customStages = !0, r.slidesPerView = void 0 !== e.data("cols") && "" !== e.data("cols") ? e.data("cols") : 3, r.slidesPerView1024 = void 0 !== e.data("cols") && "" !== e.data("cols") ? e.data("cols") : 3, r.slidesPerView680 = void 0 !== e.data("colstablet") && "" !== e.data("colstablet") ? e.data("colstablet") : 2, r.slidesPerView480 = void 0 !== e.data("colsmobile") && "" !== e.data("colsmobile") ? e.data("colsmobile") : 1, e.attr("data-options", JSON.stringify(r)), t.addClass("swiper-wrapper"), i.length && i.each(function() {
                a(this).addClass("qodef-e qodef-image-wrapper swiper-slide")
            }), "object" == typeof qodef.qodefSwiper && (!1 === o ? qodef.qodefSwiper.initSlider(e) : qodef.qodefSwiper.init(e))
        }
    };
    qodefCore.shortcodes.otaru_core_instagram_list.qodefInstagram = i, qodefCore.shortcodes.otaru_core_instagram_list.qodefSwiper = qodef.qodefSwiper
}(jQuery),
function(o) {
    "use strict";
    o(document).on("qv_loader_stop qv_variation_gallery_loaded", function() {
        t.init()
    });
    var t = {
        init: function(e) {
            this.holder = [], this.holder.push({
                holder: o("#yith-quick-view-modal .variations select"),
                options: {
                    minimumResultsForSearch: 1 / 0
                }
            }), o.extend(this.holder, e), "object" == typeof this.holder && o.each(this.holder, function(e, o) {
                t.createSelect2(o.holder, o.options)
            })
        },
        createSelect2: function(e, o) {
            "function" == typeof e.select2 && e.select2(o)
        }
    }
}(jQuery),
function() {
    "use strict";
    jQuery(document).on("yith_wccl_product_gallery_loaded", function() {
        "function" == typeof qodefCore.qodefWooMagnificPopup && qodefCore.qodefWooMagnificPopup.init()
    })
}(),
function() {
    "use strict";
    qodefCore.shortcodes.otaru_core_product_category_list = {}, qodefCore.shortcodes.otaru_core_product_category_list.qodefMasonryLayout = qodef.qodefMasonryLayout, qodefCore.shortcodes.otaru_core_product_category_list.qodefSwiper = qodef.qodefSwiper
}(jQuery),
function(e) {
    "use strict";
    var t = "otaru_core_product_list";
    qodefCore.shortcodes[t] = {}, "object" == typeof qodefCore.listShortcodesScripts && e.each(qodefCore.listShortcodesScripts, function(e, o) {
        qodefCore.shortcodes[t][e] = o
    })
}(jQuery),
function(o) {
    "use strict";
    o(document).ready(function() {
        t.init()
    });
    var t = {
        init: function() {
            var e = o(".qodef-widget-dropdown-cart-content");
            e.length && e.off().each(function() {
                var e = o(this);
                t.trigger(e), qodefCore.body.on("added_to_cart removed_from_cart", function() {
                    t.init()
                })
            })
        },
        trigger: function(e) {
            e = e.find(".qodef-woo-mini-cart");
            e.length && "object" == typeof qodefCore.qodefPerfectScrollbar && qodefCore.qodefPerfectScrollbar.init(e)
        }
    }
}(jQuery),
function() {
    "use strict";
    qodefCore.shortcodes.otaru_core_clients_list = {}, qodefCore.shortcodes.otaru_core_clients_list.qodefSwiper = qodef.qodefSwiper
}(jQuery),
function(e) {
    "use strict";
    qodefCore.shortcodes.otaru_core_accordion_portfolio_slider = {}, e(document).ready(function() {
        o.init()
    });
    var o = {
        init: function() {
            this.holder = e(".qodef-accordion-portfolio-slider"), this.holder.length && this.holder.each(function() {
                qodefCore.shortcodes.otaru_core_horizontal_accordion_showcase.qodefHorizontalAccordionShowcase.init()
            })
        }
    };
    qodefCore.shortcodes.otaru_core_accordion_portfolio_slider.qodefAccordionPortfolioSlider = o
}(jQuery),
function(e) {
    "use strict";
    var t = "otaru_core_portfolio_list";
    qodefCore.shortcodes[t] = {}, "object" == typeof qodefCore.listShortcodesScripts && e.each(qodefCore.listShortcodesScripts, function(e, o) {
        qodefCore.shortcodes[t][e] = o
    })
}(jQuery),
function(e) {
    "use strict";
    var t = "otaru_core_team_list";
    qodefCore.shortcodes[t] = {}, "object" == typeof qodefCore.listShortcodesScripts && e.each(qodefCore.listShortcodesScripts, function(e, o) {
        qodefCore.shortcodes[t][e] = o
    })
}(jQuery),
function() {
    "use strict";
    qodefCore.shortcodes.otaru_core_testimonials_list = {}, qodefCore.shortcodes.otaru_core_testimonials_list.qodefSwiper = qodef.qodefSwiper
}(jQuery),
function(n) {
    "use strict";
    n(document).ready(function() {
        e.init()
    });
    var e = {
        init: function() {
            this.holder = n(".qodef-interactive-link-showcase.qodef-layout--list"), this.holder.length && this.holder.each(function() {
                e.initItem(n(this))
            })
        },
        initItem: function(e) {
            var t = e.find(".qodef-m-image"),
                i = e.find(".qodef-m-item");
            t.eq(0).addClass("qodef--active"), i.eq(0).addClass("qodef--active"), i.on("touchstart mouseenter", function(e) {
                var o = n(this);
                (!qodefCore.html.hasClass("touchevents") || !o.hasClass("qodef--active") && 680 < qodefCore.windowWidth) && (e.preventDefault(), t.removeClass("qodef--active").eq(o.index()).addClass("qodef--active"), i.removeClass("qodef--active").eq(o.index()).addClass("qodef--active"))
            }).on("touchend mouseleave", function() {
                var e = n(this);
                (!qodefCore.html.hasClass("touchevents") || !e.hasClass("qodef--active") && 680 < qodefCore.windowWidth) && (i.removeClass("qodef--active").eq(e.index()).addClass("qodef--active"), t.removeClass("qodef--active").eq(e.index()).addClass("qodef--active"))
            }), e.addClass("qodef--init")
        }
    };
    qodefCore.shortcodes.otaru_core_interactive_link_showcase.qodefInteractiveLinkShowcaseList = e
}(jQuery);