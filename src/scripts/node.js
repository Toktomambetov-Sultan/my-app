const fs = require("fs");
const func = require("./OBJtoXML");
const { isFunction } = require("jquery");
var o2x = require('object-to-xml');
let obj = {
};
let xml;
const xmls = [];
const mandatory = ["Address", "Size", "Title", "Description", "Images"];
function writeXml(xmls) {
    const data = xmls.map((xml) => func.OBJtoXML(xml)).reduce((first, xml) => (first + xml), '<Ads formatVersion="3" target="Avito.ru">') + '</Ads>';
    fs.writeFile("main.xml", data, (err) => { console.log(data) });
}
$("form").on("submit", (event) => {
    obj = {
    };
    event.preventDefault();
    $("[name]").each((index, elem) => {
        elem = $(elem);
        if (!obj[elem.attr("name")]) {
            obj[elem.attr("name")] = (function () {
                if (elem.attr("type") === "radio") {
                    if (elem.parent().find("[data-value]") && elem.prop("checked")) {
                        return $(elem.parent().find("[data-value]")).text();
                    }
                } else {
                    return elem.val();
                }
            })();
        }
    });
    xml = {
        Ad: {
            Id: new Date().getTime(),
            Category: "Одежда, обувь, аксессуары",
            Apparel: "Обувь",
        }
    };
    Object.keys(obj).map((elem) => {
        if (obj[elem]) {
            xml.Ad[elem] = obj[elem];
        }
    });
    if (fileUploader.files.length) {
        xml.Ad["Images"] = {
            Image: []
        };
        fileUploader.files.map((file) => {
            xml.Ad["Images"]["Image"].push({
                '@': {
                    name: file.path,
                }
            });
        })
    }
    if(mandatory.reduce((first, elem) => {
        if (elem in xml.Ad) {
            return true
        }
        return false
    }, true)){
        xmls.push({
            Ad: xml.Ad
        })
        writeXml(xmls);
    }else{
        alert("Какое-то поле осталось не заполненным!");
    }
})

