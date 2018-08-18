function goToActivityTab() {

    
/*

    var object = {};
    object['left-offset'] = 200;
    object['right-offset'] = 200;
    object['terminal-top-offset'] = 500;
    object['currentFile'] = "browser/MyContract.sol";

localStorage.setItem('sol:.remix.config', JSON.stringify(object));

localStorage.clear();

*/


    Object.keys(localStorage)
    	.forEach(function (key) {
            if (!(/^sol:Untitled/.test(key))) {
            	localStorage.removeItem(key);
           	}
        });

	localStorage.setItem('sol:library.sol', 'code');

    document.getElementsByClassName("fa fa-plus-circle")[0].click();
    document.getElementsByClassName("modalFooterOk_3lIjRo")[0].click();


    chrome.storage.sync.get(['key'], function(result) {
		document.getElementsByClassName("ace_text-input")[0].value = result.key;
	    document.getElementsByClassName("ace_text-input")[0].dispatchEvent(new Event('input'));
    });

}

goToActivityTab();




