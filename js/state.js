'use strict';
// state.js: shared browser scripts loaded in index.html order.
const $=id=>document.getElementById(id);let pages=[],sources=new Map(),history=[],active=null,seq=0,busy=false,sounds=true,audio,toastTimer,renderToken=0,largeTask,moveId;
const ready=!!(window.pdfjsLib&&window.PDFLib&&window.Sortable);
if(window.pdfjsLib)pdfjsLib.GlobalWorkerOptions.workerSrc='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
