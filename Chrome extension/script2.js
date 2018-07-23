function goToActivityTab() {

    document.getElementsByClassName("fa fa-plus-circle")[0].click();
    document.getElementsByClassName("modalFooterOk_3lIjRo")[0].click();

    chrome.storage.sync.get(['key'], function(result) {
	   	document.getElementsByClassName("ace_text-input")[0].value = result.key;
	    document.getElementsByClassName("ace_text-input")[0].dispatchEvent(new Event('input'));
    });

}

goToActivityTab();
