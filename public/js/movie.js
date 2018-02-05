var reviews=document.getElementsByClassName("review_info");
var edit=document.getElementsByClassName("edit_button");
var txt=document.getElementsByClassName("edit_text");
function func (k) {
	console.log(k);
	reviews[k].style.display = 'none';
	txt[k].style.display = 'block';
	txt[k].children[0][0].value=reviews[k].children[1].firstChild.nodeValue;
	}
for(var i=0;i<edit.length;i++){
	let index=i;
	edit[i].onclick=function () {
		func(index);
	};
}
$(window).scroll(function () {
    sessionStorage.scrollPos = $(window).scrollTop();
});
var init = function () {
    $(window).scrollTop(sessionStorage.scrollPos || 0)
};
window.onload = init;