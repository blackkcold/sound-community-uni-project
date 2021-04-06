(function() {
    var textarea_elem = textarea.document;
    textarea_elem.document.getElementsByTagName("body")[0].innerHTML = "<textarea placeholder='texthere'"
    var boldify = function() {
        textarea_elem.execCommand('bold', false, null);
    };

    var italify = function() {
        textarea_elem.execCommand('italic', false, null);
    };

    var underline = function() {
        textarea_elem.execCommand('underline', false, null);
    };

    var font_size = function() {
        var size = prompt('Font-size (1 to 7)', '');
        textarea_elem.execCommand('FontSize', false, size);
    };

    var font_color = function() {
        var color = prompt('FontColor (enter either color name or hex or rgb or hsl) :', '');
        textarea_elem.execCommand('ForeColor', false, color);
    };

    var create_link = function() {
        var linkURL = prompt("URL for the link:", "http://");
        textarea_elem.execCommand("CreateLink", false, linkURL);
    };

    var add_image = function() {
        var imgSrc = prompt('Enter image address', '');
        if (imgSrc !== null) {
            textarea_elem.execCommand('insertimage', false, imgSrc);
        }
    };

    var insert_horizontal = function() {
        textarea_elem.execCommand('inserthorizontalrule', false, null);
    };

    var insert_ol = function() {
        textarea_elem.execCommand("InsertOrderedList", false, "newOL");
    };

    var insert_ul = function() {
        textarea_elem.execCommand("InsertUnorderedList", false, "newUL");
    };

    window.onload = function() {
        textarea_elem.designMode = 'On';
        document.querySelector('.boldify').addEventListener('click', boldify);
        document.querySelector('.italify').addEventListener('click', italify);
        document.querySelector('.underline').addEventListener('click', underline);
        document.querySelector('.font_size').addEventListener('click', font_size);
        document.querySelector('.font_color').addEventListener('click', font_color);
        document.querySelector('.create_link').addEventListener('click', create_link);
        document.querySelector('.add_image').addEventListener('click', add_image);
        document.querySelector('.insert_horizontal').addEventListener('click', insert_horizontal);
        document.querySelector('.insert_ol').addEventListener('click', insert_ol);
        document.querySelector('.insert_ul').addEventListener('click', insert_ul);
    };
})();// JavaScript Document