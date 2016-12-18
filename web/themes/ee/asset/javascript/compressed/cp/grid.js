!function (t) {
    var i = window.Grid = {
        _eventHandlers: [], bind: function (t, i, e) {
            void 0 == this._eventHandlers[i] && (this._eventHandlers[i] = []), this._eventHandlers[i][t] = e
        }
    };
    i.Publish = function (i, e) {
        null !== i && void 0 !== i && (this.root = t(i), this.blankRow = t("tr.grid-blank-row", this.root), this.emptyField = t("tr.no-results", this.root), this.tableActions = t("tr.tbl-action", this.root), this.rowContainer = this.root.children("tbody"), this.settings = void 0 !== e ? e : EE.grid_field_settings[i.id], this.init(), this.eventHandlers = [])
    }, i.Publish.prototype = {
        init: function () {
            this._bindSortable(), this._bindAddButton(), this._bindDeleteButton(), this._toggleRowManipulationButtons(), this._fieldDisplay(), this.original_row_count = this._getRows().size(), this.blankRow.find(":input").attr("disabled", "disabled")
        }, _bindSortable: function () {
            var t = this;
            this.root.eeTableReorder({
                beforeSort: function (i) {
                    t._fireEvent("beforeSort", i)
                }, afterSort: function (i) {
                    t._fireEvent("afterSort", i)
                }
            })
        }, _addMinimumRows: function () {
            var t = this._getRows().size(), i = this.settings.grid_min_rows - t;
            for (0 == t && 0 == i && this.emptyField.removeClass("hidden"); i > 0;)this._addRow(), i--
        }, _toggleRowManipulationButtons: function () {
            var i = this._getRows().size(), e = this.root.parents(".grid-publish").find(".toolbar .add a").parents("ul.toolbar"), n = this.root.find("th.reorder-col"), o = this.root.find("th.grid-remove");
            if (e.toggle(i > 0), i > 0 ? (0 == n.size() && t("td.reorder-col", this.root).size() > 0 && t("> thead tr", this.root).prepend(t("<th/>", {"class": "first reorder-col"})), 0 == o.size() && t("> thead tr", this.root).append(t("<th/>", {"class": "last grid-remove"}))) : (n.remove(), o.remove()), "" !== this.settings.grid_max_rows && e.toggle(i < this.settings.grid_max_rows && i > 0), "" !== this.settings.grid_min_rows) {
                var r = this.root.find("td:last-child .toolbar .remove");
                r.toggle(i > this.settings.grid_min_rows)
            }
            this.rowContainer.find("td.reorder-col").toggleClass("sort-cancel", 1 == i)
        }, _getRows: function () {
            return this.rowContainer.children("tr").not(this.blankRow.add(this.emptyField).add(this.tableActions))
        }, _bindAddButton: function () {
            var t = this;
            this.root.parents(".grid-publish").find(".toolbar .add a").add(".no-results .btn", this.root).add(".tbl-action .btn.add", this.root).on("click", function (i) {
                i.preventDefault(), t._addRow()
            })
        }, _addRow: function () {
            el = this.blankRow.clone(), el.removeClass("grid-blank-row"), el.removeClass("hidden"), this.original_row_count++, el.html(el.html().replace(RegExp("new_row_[0-9]{1,}", "g"), "new_row_" + this.original_row_count)), t("> td", el).attr("data-new-row-id", "new_row_" + this.original_row_count), el.find(":input").removeAttr("disabled"), this.tableActions.length ? this.tableActions.before(el) : this.rowContainer.append(el), this.emptyField.addClass("hidden"), this._toggleRowManipulationButtons(), this._fireEvent("display", el), t(this.root).trigger("grid:addRow", el), EE.cp && void 0 !== EE.cp.formValidation && EE.cp.formValidation.bindInputs(el)
        }, _bindDeleteButton: function () {
            var i = this;
            this.root.on("click", "td:last-child .toolbar .remove a", function (e) {
                e.preventDefault(), row = t(this).parents("tr"), i._fireEvent("remove", row), row.remove(), i._toggleRowManipulationButtons(), 0 == i._getRows().size() && i.emptyField.removeClass("hidden"), 0 == t("td.invalid", i.root).size() && EE.cp && void 0 !== EE.cp.formValidation && EE.cp.formValidation.markFieldValid(t("input, select, textarea", i.blankRow).eq(0))
            })
        }, _fieldDisplay: function () {
            var i = this;
            setTimeout(function () {
                i._getRows().each(function () {
                    i._fireEvent("display", t(this))
                }), i._addMinimumRows()
            }, 500)
        }, _fireEvent: function (e, n) {
            if (void 0 !== i._eventHandlers[e])for (var o in i._eventHandlers[e])n.find('td[data-fieldtype="' + o + '"]').each(function () {
                i._eventHandlers[e][o](t(this))
            })
        }
    }, i.Settings = function (i) {
        this.root = t(".grid-wrap"), this.settingsScroller = this.root.find(".grid-clip"), this.settingsContainer = this.root.find(".grid-clip-inner"), this.colTemplateContainer = t("#grid_col_settings_elements"), this.blankColumn = this.colTemplateContainer.find(".grid-item"), this.settings = i, this.init()
    }, i.Settings.prototype = {
        init: function () {
            this._bindResize(), this._bindSortable(), this._bindActionButtons(this.root), this._toggleDeleteButtons(), this._bindColTypeChange(), this._bindValidationCallback(), this._bindAutoColName(this.root.find('div.grid-item[data-field-name^="new_"]')), this._settingsDisplay(), this.colTemplateContainer.find(":input").attr("disabled", "disabled")
        }, _bindValidationCallback: function () {
            EE.cp.formValidation.bindCallbackForField("grid", function (i, e, n) {
                var o = t("div.grid-wrap").prev(), r = n.attr("name"), s = "[" + n.parents(".grid-item").attr("data-field-name") + "]";
                r.indexOf("[") > -1 && (r = r.substr(-(r.length - r.lastIndexOf("["))));
                var a, d = t("<div/>").html(e).contents().html();
                a = void 0 !== e ? t('span[data-field="' + r + '"]:contains("' + d + '")', o) : t('span[data-field="' + r + '"][data-columns*="' + s + '"]', o);
                var l = a.attr("data-columns");
                if (i === !1) {
                    n.parents("fieldset").find("em.ee-form-error-message").remove();
                    var h = t("<span/>").attr({"data-field": r, "data-columns": s, style: "display: block"}).text(d);
                    if (o.hasClass("alert")) 0 == a.size() ? t("p", o).append(h) : l.indexOf(s) == -1 && a.attr("data-columns", l + s); else {
                        var o = t("<div/>").html(EE.alert.grid_error).contents();
                        o.html("<p>" + h.prop("outerHTML") + "</p>"), o.insertBefore(t("div.grid-wrap"))
                    }
                } else o.hasClass("alert") && (a.size() > 0 && (a.attr("data-columns", l.replace(s, "")), "" == a.attr("data-columns") && a.remove()), 0 == t("span", o).size() && o.remove())
            })
        }, _bindResize: function () {
            var i = this;
            t(document).ready(function () {
                i._resizeColContainer()
            })
        }, _resizeColContainer: function (t) {
            this.settingsContainer.animate({width: this._getColumnsWidth()}, 1 == t ? 400 : 0)
        }, _getColumnsWidth: function () {
            var t = this.root.find(".grid-item");
            return t.size() * (t.width() + 32)
        }, _bindSortable: function () {
            this.settingsContainer.sortable({
                axis: "x",
                containment: "parent",
                handle: "li.reorder",
                items: ".grid-item",
                sort: EE.sortable_sort_helper
            }), this.settingsContainer.find("li.reorder a").on("click", function (t) {
                t.preventDefault()
            })
        }, _bindActionButtons: function (t) {
            this._bindAddButton(t), this._bindCopyButton(t), this._bindDeleteButton(t)
        }, _bindAddButton: function (i) {
            var e = this;
            i.find(".grid-tools li.add a").on("click", function (i) {
                i.preventDefault();
                var n = t(this).parents(".grid-item");
                e._insertColumn(e._buildNewColumn(), n)
            })
        }, _bindCopyButton: function (i) {
            var e = this;
            i.find(".grid-tools li.copy a").off("click").on("click", function (i) {
                i.preventDefault();
                var n = t(this).parents(".grid-item");
                e._insertColumn(e._buildNewColumn(n), n)
            })
        }, _bindDeleteButton: function (i) {
            var e = this;
            i.on("click", ".grid-tools li.remove a", function (i) {
                i.preventDefault();
                var n = t(this).parents(".grid-item");
                n.index() == t(".grid-item:last", e.root).index() ? (n.remove(), e._resizeColContainer(!0), e._toggleDeleteButtons()) : n.animate({opacity: 0}, 200, function () {
                        n.html(""), n.animate({width: 0}, 200, function () {
                            n.remove(), e._resizeColContainer(!0), e._toggleDeleteButtons()
                        })
                    })
            })
        }, _toggleDeleteButtons: function () {
            var t = this.root.find(".grid-item").size() > 1, i = this.root.find(".grid-tools li.remove"), e = this.root.find(".grid-tools li.add");
            i.toggle(t), e.toggleClass("last", !t)
        }, _insertColumn: function (i, e) {
            var n = t(".grid-item:last", this.root);
            void 0 == e && (e = n), e.index() != n.index() && i.css({opacity: 0}), i.insertAfter(e), this._resizeColContainer(), this._toggleDeleteButtons(), e.index() == n.index() && this.settingsScroller.animate({scrollLeft: this._getColumnsWidth()}, 700), i.animate({opacity: 1}, 400), this._bindAutoColName(i), this._bindActionButtons(i), EE.cp.formValidation.bindInputs(i), this._fireEvent("displaySettings", t(".grid-col-settings-custom > div", i))
        }, _bindAutoColName: function (i) {
            i.each(function (i, e) {
                t("input.grid_col_field_label", e).bind("keyup keydown", function () {
                    t(this).ee_url_title(t(e).find("input.grid_col_field_name"), !0)
                })
            })
        }, _buildNewColumn: function (i) {
            i = void 0 == i ? this.blankColumn.clone() : this._cloneWithFormValues(i), i.find('input[name$="\\[col_name\\]"]').attr("value", "");
            var e = "new_" + t(".grid-item", this.root).size(), n = i.data("field-name");
            return i.html(i.html().replace(RegExp('name="grid\\[cols\\]\\[' + n + "\\]", "g"), 'name="grid[cols][' + e + "]")), i.attr("data-field-name", e), i.find(":input").removeAttr("disabled").removeClass("grid_settings_error"), i
        }, _bindColTypeChange: function () {
            var i = this;
            this.root.on("change", "select.grid_col_select", function (e) {
                var n = i.colTemplateContainer.find(".grid_col_settings_custom_field_" + t(this).val() + ":last").clone();
                n.find(":input").removeAttr("disabled");
                var o = t(this).parents(".grid-item").find(".grid-col-settings-custom"), r = o.parents(".grid-item").attr("data-field-name"), s = "(new_)?[0-9]{1,}";
                n.html(n.html().replace(RegExp('name="grid\\[cols\\]\\[' + s + "\\]", "g"), 'name="grid[cols][' + r + "]")), o.html(n), i._fireEvent("displaySettings", n)
            })
        }, _cloneWithFormValues: function (i) {
            var e = i.clone();
            return i.find(":input:enabled").each(function () {
                var i = e.find(":input[name='" + t(this).attr("name") + "']:enabled");
                t(this).is("select") ? i.find("option").removeAttr("selected").filter('[value="' + t(this).val() + '"]').attr("selected", "selected") : "checkbox" == t(this).attr("type") ? t(this).prop("checked") && i.attr("checked", "checked") : "radio" == t(this).attr("type") ? i.removeAttr("selected").filter("[value='" + t(this).val() + "']").attr("checked", t(this).attr("checked")) : t(this).is("textarea") ? i.html(t(this).val()) : i.attr("value", t(this).val())
            }), e
        }, _settingsDisplay: function () {
            var i = this;
            this.root.find(".grid-item").each(function () {
                i._fireEvent("displaySettings", t(".grid-col-settings-custom > div", this))
            })
        }, _fireEvent: function (e, n) {
            var o = n.data("fieldtype");
            void 0 !== i._eventHandlers[e] && void 0 != i._eventHandlers[e][o] && i._eventHandlers[e][o](t(n))
        }
    }, EE.grid = function (t, e) {
        return new i.Publish(t, e)
    }, EE.grid_settings = function (t) {
        return new i.Settings(t)
    }, "undefined" != typeof _ && "undefined" !== EE.grid_cache && _.each(EE.grid_cache, function (t) {
        i.bind.apply(i, t)
    })
}(jQuery);