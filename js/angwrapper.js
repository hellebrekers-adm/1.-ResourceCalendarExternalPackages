    // Initialize Angular
function init()
{
    console.log('Loading Angular');
    console.log('what the heck');
    //Get control addin div
    var div = document.getElementById('controlAddIn');    
        
    //Add angular root element
    div.innerHTML += '<app-root></app-root>'; 

    var baseUrl = 'https://h2909571.stratoserver.net/HellebrekerPackages/1.ResourceCalendarExternalPackages/';

    //Load angular scripts
    var runtimeUrl   = baseUrl + 'js/runtime.js';// Microsoft.Dynamics.NAV.GetImageResource('runtime.js');
    var polyfillsUrl = baseUrl + 'js/polyfills.js';// Microsoft.Dynamics.NAV.GetImageResource('polyfills.js');
    var mainUrl      = baseUrl + 'js/main.js';// Microsoft.Dynamics.NAV.GetImageResource('main.js');

    //Hack to fix path if you use the images folder
    // runtimeUrl = runtimeUrl.replace('runtime.js','src/addins/agenda/images/runtime.js'); 
    // polyfillsUrl = polyfillsUrl.replace('polyfills.js','src/addins/agenda/images/polyfills.js');
    // mainUrl = mainUrl.replace('main.js','src/addins/agenda/images/main.js');

    //Load script function
    function loadScript(url, callback) {
        var script = document.createElement('script');
        script.onload = callback;
        script.src = url;
        document.head.appendChild(script);
    }

    document.body.style.overflowX = "auto";
    document.body.style.overflowY = "auto";
    document.documentElement.style.overflowX = 'auto';
    document.documentElement.style.overflowY = 'auto';


    //Load scripts in order
    loadScript(runtimeUrl, function() {
        loadScript(polyfillsUrl, function() {
            loadScript(mainUrl, function() {
                console.log('Angular loaded');
                Microsoft.Dynamics.NAV.InvokeExtensibilityMethod("ControlReady",[]);
            });
        });
    });    
}

//add hour to date helper
function addHour(h, d){
    var copiedDate = new Date(d.getTime());
    copiedDate.setHours(copiedDate.getHours()+h);
    return copiedDate;
}

function AddEmployee(name, id)
{
    window.dispatchEvent(new CustomEvent('add_resource', {detail: {args: [{name: name, id: id}]}}));
}

function AddEvent(start, end, id, text, resource, backColor, cssClass, html)
{
    start = new Date(start);
    end = new Date(end);

    let startIso = start.toISOString();
    let endIso = end.toISOString();

    start = new Date(startIso);        
    end = new Date(endIso);

    start.setHours(start.getHours() + 2);
    end.setHours(end.getHours() + 2);

    if(start.toISOString() == end.toISOString())
    {
        end = addHour(1, start);
    }

    console.log('adding event to emp: ' + resource + " that starts at: " + start + " and ends at: " + end);

    window.dispatchEvent(new CustomEvent('add_new_event', {
    detail: {
        args: [
        {
            start: start,
            end: end,
            id: id,
            text: text,
            resource: resource,
            backColor: backColor,
            cssClass: cssClass,
            html: html
            
        }]
    }
    }));
}