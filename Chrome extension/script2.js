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

// Clear local storage from 'Untitled' contracts
    Object.keys(localStorage)
    	.forEach(function (key) {
            if (!(/^sol:Untitled/.test(key))) {
            	localStorage.removeItem(key);
           	}
        });



// NB > Assumption: to have the Chrome Extension import all the required contracts, in addition to the contract being edited, the Registry API should be ON

try {
	// Retrieve external contracts and libraries list from Registry API
	var jsonObjFull;
	var requestFull = new XMLHttpRequest();
	requestFull.open('GET', 'http://localhost:3000/contracts', false); 
	requestFull.send(null);
	if (requestFull.status === 200) {
		jsonObjFull = JSON.parse(requestFull.responseText);
	}

	var importsArray = ['Claimable', 'ConvertLib', 'Destructible']; // Lista da costruire dinamicamente andando a leggere gli import nel contratto principale, e ricorsivamente nei contratti derivati

	if (typeof jsonObjFull != 'undefined') {
		for(var i = 0; i < jsonObjFull.length; i++) 
			for(var j = 0; j < importsArray.length; j++)
				if (jsonObjFull[i]['JSON']['contract']['descriptor']['name'] == importsArray[j]) {
					localStorage.setItem('sol:' + importsArray[j] + '.sol', jsonObjFull[i]['code']);
				}
	}
}
catch(err) {
    console.log("Solidity smart contract registry API not available!");
}

    document.getElementsByClassName("fa fa-plus-circle")[0].click();
    document.getElementsByClassName("modalFooterOk_3lIjRo")[0].click();


    chrome.storage.sync.get(['key'], function(result) {
		document.getElementsByClassName("ace_text-input")[0].value = result.key;
	    document.getElementsByClassName("ace_text-input")[0].dispatchEvent(new Event('input'));
    });

}

goToActivityTab();
