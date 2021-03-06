/*!
 * ExpressionEngine - by EllisLab
 *
 * @package		ExpressionEngine
 * @author		EllisLab Dev Team
 * @copyright	Copyright (c) 2003 - 2016, EllisLab, Inc.
 * @license		https://expressionengine.com/license
 * @link		https://ellislab.com
 * @since		Version 3.0
 * @filesource
 */
"use strict";
!function (e) {
    e(document).ready(function () {
        function a(a, l, r, i) {
            var d = e(a).closest(".relate-wrap").data("settings"), c = {};
            c.settings = d, c.search = l, c.channel_id = r, clearTimeout(s), n && n.abort(), s = setTimeout(function () {
                n = e.ajax({
                    url: EE.relationship.filter_url,
                    data: e.param(c),
                    type: "POST",
                    dataType: "json",
                    success: function (l) {
                        var s = e(a).closest(".relate-wrap").find(".scroll-wrap").first();
                        t(s, l)
                    }
                })
            }, i)
        }

        function t(e, a) {
            var t = e.closest(".relate-wrap"), s = t.hasClass("w-8"), n = e.find(".no-results"), r = e.find(".input-name").attr("name");
            n.addClass("hidden"), e.find("label").remove(), 0 == a.length && n.removeClass("hidden");
            for (i in a)e.append(l(a[i], r, s))
        }

        function l(a, t, l) {
            var s = e('input[name="' + t + '"][value=' + a.entry_id + "]").length > 0, n = s ? " chosen" : "", r = l ? "checkbox" : "radio", i = e("<label/>", {
                "class": "choice block" + n,
                "data-channel-id": a.channel_id,
                "data-channel-title": a.channel_name,
                "data-entry-title": a.title
            }), d = e("<input/>", {type: r, name: "checkbox" == r ? "" : t + "[dummy][]", value: a.entry_id});
            s && d.attr("checked", "checked");
            var c = e("<i/>").html(" &mdash; " + a.channel_name);
            return i.append(d).append(" " + a.title).append(c)
        }

        e("div.publish").on("click", ".relate-wrap input:radio", function (a) {
            var t = e(this).closest(".relate-wrap"), l = e(this).closest("label"), s = t.find(".input-name").attr("name"), n = e(this).closest(".scroll-wrap").data("template").replace(/{entry-id}/g, e(this).val()).replace(/{entry-title}/g, l.data("entry-title")).replace(/{channel-title}/g, l.data("channel-title"));
            t.find(".relate-wrap-chosen .no-results").closest("label").addClass("hidden").removeClass("block"), t.find(".relate-wrap-chosen .relate-manage").remove(), t.find(".relate-wrap-chosen").first().append(n), t.find(".relate-wrap-chosen label.chosen").append(e("<input/>", {
                type: "hidden",
                name: s,
                value: e(this).val()
            })), t.removeClass("empty")
        }), e("div.publish").on("click", ".relate-wrap input:checkbox", function (a) {
            var t = e(this).closest(".relate-wrap").siblings(".relate-wrap").first(), l = e(this).closest("label"), s = e(this).closest(".relate-wrap").find(".input-name").attr("name"), n = e("<div/>").text(l.data("entry-title")).html(), r = e(this).closest(".scroll-wrap").data("template").replace(/{entry-id}/g, e(this).val()).replace(/{entry-title}/g, n).replace(/{entry-title-lower}/g, n.toLowerCase()).replace(/{channel-title}/g, l.data("channel-title"));
            return 0 == e(this).prop("checked") ? void t.find(".scroll-wrap a[data-entry-id=" + e(this).val() + "]").click() : (t.find(".scroll-wrap .no-results").addClass("hidden"), t.removeClass("empty"), t.find(".scroll-wrap").first().append(r), t.find(".scroll-wrap label").last().data("entry-title", n).data("channel-id", l.data("channel-id")).data("channel-title", l.data("channel-title")).prepend('<span class="relate-reorder"></span>').append(e("<input/>", {
                    type: "hidden",
                    name: s,
                    value: e(this).val()
                })), void e(this).siblings("input:hidden").val(t.find(".scroll-wrap label").length))
        }), e("div.publish").on("click", ".relate-wrap .relate-manage a", function (a) {
            var t = e(this).closest(".relate-wrap"), l = e(this).closest(".relate-wrap");
            t.hasClass("w-8") ? t = t.siblings(".relate-wrap").first() : t.addClass("empty"), t.find(".scroll-wrap :checked[value=" + e(this).data("entry-id") + "]").attr("checked", !1).parents(".choice").removeClass("chosen"), e(this).closest("label").remove(), 0 == l.find(".relate-manage").length && (l.hasClass("w-8") ? l.addClass("empty").find(".no-results").removeClass("hidden") : l.find(".relate-wrap-chosen .no-results").closest("label").removeClass("hidden").addClass("block")), a.preventDefault()
        });
        var s, n;
        e("div.publish").on("click", ".relate-wrap .relate-actions .filters a[data-channel-id]", function (t) {
            var l = e(this).closest(".relate-wrap").find(".relate-search").val(), s = e(this).closest(".filters").find("a.has-sub"), n = e(this).data("channel-id"), r = e("<span/>", {
                "class": "faded",
                "data-channel-id": n
            }).html(" (" + e(this).text() + ")");
            s.find("span").remove(), s.append(r), a(this, l, n, 0), e(document).click(), t.preventDefault()
        }), e("div.publish").on("interact", ".relate-wrap.col.w-8[data-field] .relate-search, .relate-wrap.col.w-16 .relate-search", function (t) {
            var l = e(this).closest(".relate-actions").find(".filters .has-sub .faded").data("channel-id");
            a(this, e(this).val(), l, 300)
        }), e("div.publish").on("interact", ".relate-wrap.col.w-8.last .relate-search", function (a) {
            var t = e(this).closest(".relate-wrap"), l = t.find("label.chosen"), s = t.find(".no-results");
            return s.addClass("hidden"), this.value ? (l.removeClass("hidden").not('label[data-search*="' + this.value.toLowerCase() + '"]').addClass("hidden"), void(0 == t.find("label.chosen:visible").size() && s.removeClass("hidden"))) : (l.removeClass("hidden"), void s.toggleClass("hidden", 0 != t.find("label.chosen:visible").size()))
        });
        var r = {axis: "y", cursor: "move", handle: ".relate-reorder", items: "label"};
        e(".w-8.relate-wrap .scroll-wrap").sortable(r), Grid.bind("relationship", "display", function (a) {
            e(".w-8.relate-wrap .scroll-wrap", a).sortable(r)
        })
    })
}(jQuery);