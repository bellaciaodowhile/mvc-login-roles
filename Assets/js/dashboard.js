console.log('Dashboard')

function dataUsers() {
    const tableUsers = el('#table__users');
    cleanHtml(tableUsers);
    AJAXGJ8({
        url: 'Usuarios/getUsers',
        success: function (res) {
            res = JSON.parse(res);
            let x = 1;
            for (item of res) {
                if (item != undefined) {
                    viewHtml({
                        el: tableUsers,
                        content: /* html */ `
                        <tr class="trow">
                            <td>${ x++ }</td>
                            <td>${ item.nombre }</td>
                            <td>${ item.apellido }</td>
                            <td>${ item.usuario }</td>
                            <td>${ item.status ? 'Activo' : 'Inactivo' }</td>
                            <td>${ item.tipo }</td>
                            <td>
                                <button ripple class="btn btn-icon">
                                    <i class="material-icons-outlined">edit</i>
                                </button>
                            </td>
                        </tr>`
                    });
                }
            }
        }
    });
}
dataUsers();

// * Add Users
const formAddUsers = el('.form__add__users');
submit({
    el: formAddUsers,
    res: function (res) {
        console.log(res)
        let data = new FormData(formAddUsers);
        let tipo = formAddUsers.querySelector('.select__header__label').textContent;

        AJAXGJ8({
            url: 'Usuarios/setUsers',
            data: [{
                nombre: data.get('nombre'),
                apellido: data.get('apellido'),
                usuario: data.get('usuario'),
                contrasena: data.get('contrasena'),
                estado: data.get('estado'),
                tipo
            }],
            success: function (res) {
                console.log(res)
                res = JSON.parse(res)
                if (res.status) {
                    alert(res.msg)
                    formAddUsers.reset();
                    let idModal = '#' + formAddUsers.closest('.modal').getAttribute('id')
                    closeModal(idModal)
                    dataUsers();
                } else {
                    alert(res.msg)
                }
            }
        });
    }
});
// * HTML Editor
// let htmlEditorm = ace.edit("html-box");
// htmlEditorm.setTheme("ace/theme/monokai");
// htmlEditorm.getSession().setMode("ace/mode/html");
// htmlEditorm.setOptions({
//     autoScrollEditorIntoView: true,
//     copyWithEmptySelection: true,
//     fontFamily: 'Ubuntu',
//     // fontSize: '10pt'
// });
// htmlEditorm.session.setUseWrapMode(true);
// htmlEditorm.commands.addCommand({
//     name: 'myCommand',
//     bindKey: {win: 'Ctrl-S',  mac: 'Command-S'},
//     exec: function(editor) {
//         alert('Cambios guardados')
//     },
//     readOnly: true, // false if this command should not apply in readOnly mode
//     // multiSelectAction: "forEach", optional way to control behavior with multiple cursors
//     // scrollIntoView: "cursor", control how cursor is scolled into view after the command
// });

// let cssEditorm = ace.edit("css-box");
// cssEditorm.setTheme("ace/theme/monokai");
// cssEditorm.getSession().setMode("ace/mode/css");
// cssEditorm.setOptions({
//     autoScrollEditorIntoView: true,
//     copyWithEmptySelection: true,
// });
// cssEditorm.session.setUseWrapMode(true);
// cssEditorm.commands.addCommand({
//     name: 'myCommand',
//     bindKey: {win: 'Ctrl-S',  mac: 'Command-S'},
//     exec: function(editor) {
//         alert('Cambios guardados')
//     },
//     readOnly: true, // false if this command should not apply in readOnly mode
//     // multiSelectAction: "forEach", optional way to control behavior with multiple cursors
//     // scrollIntoView: "cursor", control how cursor is scolled into view after the command
// });
// let jsEditorm = ace.edit("js-box");
// jsEditorm.setTheme("ace/theme/monokai");
// jsEditorm.getSession().setMode("ace/mode/javascript");
// jsEditorm.setOptions({
//     autoScrollEditorIntoView: true,
//     copyWithEmptySelection: true,
// });
// jsEditorm.session.setUseWrapMode(true);
// jsEditorm.commands.addCommand({
//     name: 'myCommand',
//     bindKey: {win: 'Ctrl-S',  mac: 'Command-S'},
//     exec: function(editor) {
//         alert('Cambios guardados')
//     },
//     readOnly: true, // false if this command should not apply in readOnly mode
//     // multiSelectAction: "forEach", optional way to control behavior with multiple cursors
//     // scrollIntoView: "cursor", control how cursor is scolled into view after the command
// });

// let html = htmlEditorm.getValue();
// let css = cssEditorm.getValue();
// let js = jsEditorm.getValue();

// htmlEditorm.session.on('change', function (delta) {
//     console.log(delta);
// });

// let outputFrame = document.getElementById("output").contentWindow.document;
// outputFrame.open();
// outputFrame.write(html + "<style>" + css + "</style><script>" + js + "</script>");
// outputFrame.close();


// ! CLONE CODEPEN
// window.onload = function () {
//     for (var i = 0; i < document.getElementsByClassName("code").length; i++)
//         document.getElementsByClassName("code")[i].style.height = document.querySelector(".code-editor").clientHeight - 40 + "px";

//     let htmlEditor = ace.edit("html");
//     htmlEditor.session.setMode("ace/mode/html");
//     htmlEditor.setTheme("ace/theme/nord_dark");
//     if (localStorage.getItem("lc-codepen-clone-html") == null)
//         htmlEditor.session.setValue(`<!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Document</title>
// </head>
// <body>

// </body>
// </html>`);
//     else htmlEditor.session.setValue(localStorage.getItem("lc-codepen-clone-html"))
//     htmlEditor.session.setUseWrapMode(true);
//     htmlEditor.setShowPrintMargin(false);
//     htmlEditor.setHighlightActiveLine(false);
//     htmlEditor.session.on('change', function (delta) {
//         update();
//     });


//     let cssEditor = ace.edit("css");
//     cssEditor.session.setMode("ace/mode/css");
//     cssEditor.setTheme("ace/theme/nord_dark");
//     cssEditor.setOptions({
//         enableBasicAutocompletion: true,
//         enableSnippets: true,
//         enableLiveAutocompletion: false
//     });

//     if (localStorage.getItem("lc-codepen-clone-css") == null)
//         cssEditor.session.setValue(`body{

//     }`);
//     else cssEditor.session.setValue(localStorage.getItem("lc-codepen-clone-css"))
//     cssEditor.session.setUseWrapMode(true);
//     cssEditor.setShowPrintMargin(false);
//     cssEditor.setHighlightActiveLine(false);
//     cssEditor.session.on('change', function (delta) {
//         update();
//     });

//     let jsEditor = ace.edit("javascript");
//     jsEditor.session.setMode("ace/mode/javascript");
//     jsEditor.setTheme("ace/theme/nord_dark");
//     jsEditor.setOptions({
//         enableBasicAutocompletion: true,
//         enableSnippets: true,
//         enableLiveAutocompletion: false
//     });
//     if (localStorage.getItem("lc-codepen-clone-js") == null)
//         jsEditor.session.setValue(`//JavaScript goes here`);
//     else
//         jsEditor.session.setValue(localStorage.getItem("lc-codepen-clone-js"))
//     jsEditor.session.setUseWrapMode(true);
//     jsEditor.setShowPrintMargin(false);
//     jsEditor.setHighlightActiveLine(false);
//     jsEditor.session.on('change', function (delta) {
//         update();
//     });
//     update();

//     function update() {
//         let output = document.querySelector(".output .virtual-iframe").contentWindow.document;
//         console.log(output)
//         output.open();
//         output.write("<style>" + cssEditor.getValue() + "</style>" + htmlEditor.getValue() + "<script>" + jsEditor.getValue() + "</script>");
//         output.close();
//         localStorage.setItem("lc-codepen-clone-html", htmlEditor.getValue())
//         localStorage.setItem("lc-codepen-clone-css", cssEditor.getValue())
//         localStorage.setItem("lc-codepen-clone-js", jsEditor.getValue())
//     }

//     window.addEventListener("resize", e => {
//         for (var i = 0; i < document.getElementsByClassName("code").length; i++)
//             document.getElementsByClassName("code")[i].style.height = document.querySelector(".code-editor").clientHeight - 40 + "px";
//         htmlEditor.resize();
//         cssEditor.resize();
//         jsEditor.resize();
//     })

//     let layout = 0;

//     document.querySelector(".change-layout").addEventListener("click", function () {
//         layout++;
//         if (layout > 1) layout = 0;
//         changeLayout();
//     })

//     function changeLayout() {
//         switch (layout) {
//             case 0:
//                 document.querySelector(".coder").classList.add("view1")
//                 document.querySelector(".coder").classList.remove("view2")
//                 document.querySelector(".container").classList.add("view1")
//                 document.querySelector(".container").classList.remove("view2")

//                 for (var i = 0; i < document.getElementsByClassName("code").length; i++) {
//                     document.getElementsByClassName("code")[i].style.maxHeight = "unset";
//                     document.getElementsByClassName("code")[i].style.height = document.querySelector(".code-editor").clientHeight - 40 + "px";
//                 }
//                 htmlEditor.resize();
//                 cssEditor.resize();
//                 jsEditor.resize();
//                 break;
//             case 1:
//                 document.querySelector(".coder").classList.add("view2")
//                 document.querySelector(".coder").classList.remove("view1")
//                 document.querySelector(".container").classList.add("view2")
//                 document.querySelector(".container").classList.remove("view1")

//                 for (var i = 0; i < document.getElementsByClassName("code").length; i++) {
//                     document.getElementsByClassName("code")[i].style.height = document.querySelector(".code-editor").clientHeight - 40 + "px";
//                     document.getElementsByClassName("code")[i].style.maxHeight = "194px";
//                 }
//                 htmlEditor.resize();
//                 cssEditor.resize();
//                 jsEditor.resize();
//                 break;
//         }
//     }
// }

// setTimeout(() => {

// const htmlEditor = el('.html__editor .monaco-editor');
// console.log(htmlEditor)
// }, 2000);
// const viewContent = el('.view__content');
// onclick({el: viewContent, res: (res) => {
//     getAllElements({el: '.view-line'}).map(line => {
//         console.log(line.textContent)
//     })
// }});

// Load the Monaco Editor.
require.config({
    paths: {
        'vs': 'https://topiaires.fr/monaco-editor/node_modules/monaco-editor/min/vs'
    }
});
require(['vs/editor/editor.main'], function () {
    // monaco.editor.defineTheme('myTheme', {
    //     base: 'vs',
    //     inherit: true,
    //     rules: [{ background: 'EDF9FA' }],
    //     // colors: { 'editor.lineHighlightBackground': '#0000FF20' }
    // });
    // monaco.editor.setTheme('myTheme');
    // let htmlEditor = monaco.editor.create(document.getElementById('js__editor'), {
    //     value: [ // Initial code to put in the editor.
    //         'function x() {',
    //         '\tconsole.log("Hello world!");',
    //         '}'
    //     ].join('\n'),
    //     language: 'javascript',
    //     // theme: 'vs-dark'
    // });

    var fileCounter = 0;
    var editorArray = [];
    var defaultCode = [
        'function helloWorld() {',
        '   console.log("Hello world!");',
        '}'
    ].join('\n');

    // monaco.editor.setTheme('dracula');
   

    // 新建一个编辑器
    function newEditor(container_id, code, language) {
        var model = monaco.editor.createModel(code, language);
        var editor = monaco.editor.create(document.getElementById(container_id), {
            model: model,
            // theme: 'vs-dark'
            automaticLayout: true,

        });
        editorArray.push(editor);
        window.onresize = function (e) {
            editor.layout()
        }

        return editor;
    }
    let htmlEditor = monaco.editor.create(document.getElementById('html__editor'), {
        language: 'html',
        // theme: 'vs-dark'
        automaticLayout: true
    });
    let cssEditor = monaco.editor.create(document.getElementById('css__editor'), {
        language: 'css',
        // theme: 'vs-dark'
        automaticLayout: true
    });
    let jsEditor = monaco.editor.create(document.getElementById('js__editor'), {
        language: 'javascript',
        // theme: 'vs-dark'
        automaticLayout: true
    });
    // editorArray.push(editor);
    // window.onresize = function(e) {
    //     editor.layout()
    // }
    setTimeout(() => {
        // Define el tema personalizado
        monaco.editor.defineTheme('myCustomTheme', {
            base: 'vs-dark', // Elige la base del tema (puede ser 'vs', 'vs-dark' o 'hc-black')
            inherit: true, // Indica si hereda estilos de otro tema
            rules: [{
                "background": "282a36",
                "token": ""
            },
            {
                "foreground": "6272a4",
                "token": "comment"
            },
            {
                "foreground": "f1fa8c",
                "token": "string"
            },
            {
                "foreground": "bd93f9",
                "token": "constant.numeric"
            },
            {
                "foreground": "bd93f9",
                "token": "constant.language"
            },
            {
                "foreground": "bd93f9",
                "token": "constant.character"
            },
            {
                "foreground": "bd93f9",
                "token": "constant.other"
            },
            {
                "foreground": "ffb86c",
                "token": "variable.other.readwrite.instance"
            },
            {
                "foreground": "ff79c6",
                "token": "constant.character.escaped"
            },
            {
                "foreground": "ff79c6",
                "token": "constant.character.escape"
            },
            {
                "foreground": "ff79c6",
                "token": "string source"
            },
            {
                "foreground": "ff79c6",
                "token": "string source.ruby"
            },
            {
                "foreground": "ff79c6",
                "token": "keyword"
            },
            {
                "foreground": "ff79c6",
                "token": "storage"
            },
            {
                "foreground": "8be9fd",
                "fontStyle": "italic",
                "token": "storage.type"
            },
            {
                "foreground": "50fa7b",
                "fontStyle": "underline",
                "token": "entity.name.class"
            },
            {
                "foreground": "50fa7b",
                "fontStyle": "italic underline",
                "token": "entity.other.inherited-class"
            },
            {
                "foreground": "50fa7b",
                "token": "entity.name.function"
            },
            {
                "foreground": "ffb86c",
                "fontStyle": "italic",
                "token": "variable.parameter"
            },
            {
                "foreground": "ff79c6",
                "token": "entity.name.tag"
            },
            {
                "foreground": "50fa7b",
                "token": "entity.other.attribute-name"
            },
            {
                "foreground": "8be9fd",
                "token": "support.function"
            },
            {
                "foreground": "6be5fd",
                "token": "support.constant"
            },
            {
                "foreground": "66d9ef",
                "fontStyle": " italic",
                "token": "support.type"
            },
            {
                "foreground": "66d9ef",
                "fontStyle": " italic",
                "token": "support.class"
            },
            {
                "foreground": "f8f8f0",
                "background": "ff79c6",
                "token": "invalid"
            },
            {
                "foreground": "f8f8f0",
                "background": "bd93f9",
                "token": "invalid.deprecated"
            },
            {
                "foreground": "cfcfc2",
                "token": "meta.structure.dictionary.json string.quoted.double.json"
            },
            {
                "foreground": "6272a4",
                "token": "meta.diff"
            },
            {
                "foreground": "6272a4",
                "token": "meta.diff.header"
            },
            {
                "foreground": "ff79c6",
                "token": "markup.deleted"
            },
            {
                "foreground": "50fa7b",
                "token": "markup.inserted"
            },
            {
                "foreground": "e6db74",
                "token": "markup.changed"
            },
            {
                "foreground": "bd93f9",
                "token": "constant.numeric.line-number.find-in-files - match"
            },
            {
                "foreground": "e6db74",
                "token": "entity.name.filename"
            },
            {
                "foreground": "f83333",
                "token": "message.error"
            },
            {
                "foreground": "eeeeee",
                "token": "punctuation.definition.string.begin.json - meta.structure.dictionary.value.json"
            },
            {
                "foreground": "eeeeee",
                "token": "punctuation.definition.string.end.json - meta.structure.dictionary.value.json"
            },
            {
                "foreground": "8be9fd",
                "token": "meta.structure.dictionary.json string.quoted.double.json"
            },
            {
                "foreground": "f1fa8c",
                "token": "meta.structure.dictionary.value.json string.quoted.double.json"
            },
            {
                "foreground": "50fa7b",
                "token": "meta meta meta meta meta meta meta.structure.dictionary.value string"
            },
            {
                "foreground": "ffb86c",
                "token": "meta meta meta meta meta meta.structure.dictionary.value string"
            },
            {
                "foreground": "ff79c6",
                "token": "meta meta meta meta meta.structure.dictionary.value string"
            },
            {
                "foreground": "bd93f9",
                "token": "meta meta meta meta.structure.dictionary.value string"
            },
            {
                "foreground": "50fa7b",
                "token": "meta meta meta.structure.dictionary.value string"
            },
            {
                "foreground": "ffb86c",
                "token": "meta meta.structure.dictionary.value string"
            }
        ],
        colors: {
            "editor.foreground": "#f8f8f2",
            "editor.background": "#282a36",
            "editor.selectionBackground": "#44475a",
            "editor.lineHighlightBackground": "#44475a",
            "editorCursor.foreground": "#f8f8f0",
            "editorWhitespace.foreground": "#3B3A32",
            "editorIndentGuide.activeBackground": "#9D550FB0",
            "editor.selectionHighlightBorder": "#222218"
        }
            // colors: {
            //     'editor.background': '#CB4335', // Establece el color de fondo del editor
            //     'editorLineNumber.foreground': '#58D68D', // Establece el color de las líneas de número
            //     // Agrega más colores de tema según tus necesidades
            // }
        });

        // Aplica el tema personalizado al editor
        monaco.editor.setTheme('myCustomTheme');
    }, 4000);

    [document.getElementById('html__editor'), document.getElementById('css__editor'), document.getElementById('js__editor')].map(editor => {
        editor.addEventListener('keyup', function (e) {
            let editor = e.currentTarget;
            console.log(editor)
            if (editor.id == 'html__editor') {
                updateIframeOutput({
                    lang: 'html',
                    value: htmlEditor.getValue()
                })
                console.log(htmlEditor.getValue())
            } else if (editor.id == 'css__editor') {
                updateIframeOutput({
                    lang: 'css',
                    value: cssEditor.getValue()
                })
                console.log(cssEditor.getValue())
            } else if (editor.id == 'js__editor') {
                updateIframeOutput({
                    lang: 'js',
                    value: jsEditor.getValue()
                })
                console.log(jsEditor.getValue())
            }
        })
    });


    // editorArray.push(editor2);
    window.onresize = function (e) {
        htmlEditor.layout()
    }





    el('#handler').addEventListener('mousedown', function () {
        document.addEventListener('mousemove', function (e) {
            htmlEditor.layout();
            cssEditor.layout();
            jsEditor.layout();
        });
    });

    // function addNewEditor(code, language, id) {
    //     var new_container = document.createElement("DIV");
    //     // new_container.id = "container-" + fileCounter.toString(10);
    //     new_container.className = "box__editor";
    //     document.getElementById(id).appendChild(new_container);
    //     newEditor(new_container.id, code, language);
    //     fileCounter += 1;
    // }

    // addNewEditor(defaultCode, 'javascript', 'root');
    // addNewEditor(defaultCode, 'html', 'html__editor');
    // addNewEditor(defaultCode, 'css', 'css__editor');

    // var btn = document.createElement("button");
    // btn.id = "show-content";
    // btn.innerHTML = "点我获取编辑器内容";
    // var header = document.getElementById("header__");
    // header.appendChild(btn);

    // 点击 button 弹出编辑器内容
    // document.getElementById("show-content").addEventListener("click", function () {
    //     // 获取编辑器内容
    //     alert(editorArray[0].getValue());
    // });
});

function updateIframeOutput(res) {

    const iframeResult = el('#components__result');
    const iframeDoc = iframeResult.contentDocument;
    const iframeHead = iframeDoc.head;
    const iframeBody = iframeDoc.body;
    if (res.lang == 'css') {
        iframeHead.innerHTML = "\n<style>\n" + res.value + "\n</style>\n";
    } else if (res.lang == 'html') {
        iframeBody.innerHTML = "\n" + res.value + "\n";
    } else {
        const script = iframeDoc.createElement("script");
        script.innerHTML = "\n" + res.value + "\n";
        iframeBody.appendChild(script);
    }
    console.log(res)
}




(function () {
    document.addEventListener('DOMContentLoaded', function () {
        var grid, handler, pa, pb, pc, pd, resize_panel;
        grid = document.querySelector('.panel-grid');
        handler = document.querySelector('#handler');
        pa = document.querySelector('#panel-a');
        pb = document.querySelector('#panel-b');
        pc = document.querySelector('#panel-c');
        pd = document.querySelector('#panel-d');
        resize_panel = function (e) {
            handler.style.left = e.pageX - 5 + 'px';
            handler.style.top = e.pageY - 5 + 'px';
            pa.style.width = e.pageX + 'px';
            pa.style.height = e.pageY + 'px';
            pb.style.left = e.pageX + 'px';
            pb.style.height = e.pageY + 'px';
            pc.style.width = e.pageX + 'px';
            pc.style.top = e.pageY - 5 + 'px';
            pd.style.left = e.pageX + 'px';
            pd.style.top = e.pageY - 5 + 'px';
        };
        handler.addEventListener('mousedown', function () {
            document.addEventListener('mousemove', resize_panel);
        });
        grid.addEventListener('mouseup', function () {
            document.removeEventListener('mousemove', resize_panel);
        });
    });
}).call(this);


// Evento keydown para detectar cuando se presionan las teclas
var isCtrl = false;
document.onkeyup = function (e) {
    if (e.keyCode == 17) isCtrl = false;
}

document.onkeydown = function (e) {
    if (e.keyCode == 17) isCtrl = true;
    if (e.keyCode == 83 && isCtrl == true) {
        //run code for CTRL+S -- ie, save!
        alert('guardado')
        return false;

    }
}











// ! Temporary
const createComponent = getAllElements({
    el: `.create__component`
});
console.log(createComponent)
const closeComponents = el(`.close__component`);
const components = el(`.create__components`);
onclick({
    el: closeComponents,
    res: (res) => {
        components.classList.toggle('create__components--active');
    }
});
createComponent.map(btn => {
    onclick({
        el: btn,
        res: (res) => {
            components.classList.toggle('create__components--active');
        }
    });
});