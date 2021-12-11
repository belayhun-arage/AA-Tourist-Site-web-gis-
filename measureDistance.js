// // const newSource=new ol.source.Vector({format: new ol.format.GeoJSON(),}),

// // const vector = new ol.layer.Vector({
// //   source: newSource,
// //   style:  new ol.style.Circle({
// //     fill:  new ol.style.Fill({
// //       color: 'rgba(255, 255, 255, 0.2)',
// //     }),
// //     stroke: new ol.style.Stroke({
// //       color: '#ffcc33',
// //       width: 2,
// //     }),
// //     image: new ol.style.CircleStyle({
// //       radius: 7,
// //       fill: new ol.style.Fill({
// //         color: '#ffcc33',
// //       }),
// //     }),
// //   }),
// // });

// let sketch;
// let helpTooltipElement;
// let helpTooltip;
// let measureTooltipElement;
// let measureTooltip;
// const continueLineMsg = 'Click to continue drawing the line';
// const unByKey=new ol.Observable.unByKey()

// function createHelpTooltip() {
//     if (helpTooltipElement) {
//         helpTooltipElement.parentNode.removeChild(helpTooltipElement);
//     }
//     helpTooltipElement = document.createElement('div')
//     helpTooltipElement.className = 'ol-tooltip hidden';
//     helpTooltip = new ol.Overlay({
//         element: helpTooltipElement,
//         offset: [15, 0],
//         positioning: 'center-left',
//     });
//     map.addOverlay(helpTooltip);
// }

// function createMeasureTooltip() {
//     if (measureTooltipElement) {
//         measureTooltipElement.parentNode.removeChild(measureTooltipElement);
//     }
//     measureTooltipElement = document.createElement('div');
//     measureTooltipElement.className = 'ol-tooltip ol-tooltip-measure';
//     measureTooltip = new ol.Overlay({
//         element: measureTooltipElement,
//         offset: [0, -15],
//         positioning: 'bottom-center',
//         stopEvent: false,
//         insertFirst: false,
//     });
//     map.addOverlay(measureTooltip);
// }

// const pointerMoveHandler = function (evt) {
//     console.log("handling pointer moving")
//     if (evt.dragging) {
//         return;
//     }
//     let helpMsg = 'Click to start drawing';
//     if (sketch) {
//         const geom = sketch.getGeometry();
//         if (geom instanceof new ol.geom.LineString()) {
//         helpMsg = continueLineMsg;
//         }
//     }
//     helpTooltipElement.innerHTML = helpMsg;
//     helpTooltip.setPosition(evt.coordinate);
//     helpTooltipElement.classList.remove('hidden');
// };
// map.on('pointermove', pointerMoveHandler);
// map.getViewport().addEventListener('mouseout', function () {
//   helpTooltipElement.classList.add('hidden');
// });
// const formatLength = function (line) {
//   var length = ol.Sphere.getLength(line)
//   let output;
//   if (length > 100) {
//     output = Math.round((length / 1000) * 100) / 100 + ' ' + 'km';
//   } else {
//     output = Math.round(length * 100) / 100 + ' ' + 'm';
//   }
//   return output;
// };

// function measureDistance() {
//     let newSource=new ol.source.Vector({format: new ol.format.GeoJSON(),})
//     const draw = new ol.interaction.Draw({
//         source: newSource,
//         type: 'LineString',
//         style: new ol.style.Style({
//             fill: new ol.style.Fill({color: 'rgba(255, 25, 255,0.8)',}),
//             stroke: new ol.style.Stroke({color: 'rgba(255, 255, 255)',lineDash: [5, 5],width: 4,}),
//             image: new ol.style.Circle({radius: 5,stroke: new ol.style.Stroke({color: 'rgba(255, 255, 255)',}),fill: new ol.style.Fill({color: 'rgba(255, 255, 255)',}),}),
//         }),
//     });
//     map.addInteraction(draw);
//     createMeasureTooltip();
//     createHelpTooltip();
//     let listener;
//     draw.on('drawstart', function (evt) {
//         console.log("drawing started")
//         // set sketch
//         sketch = evt.feature;

//         /** @type {import("../src/ol/coordinate.js").Coordinate|undefined} */
//         let tooltipCoord = evt.coordinate;

//         listener = sketch.getGeometry().on('change', function (evt) {
//         const geom = evt.target;
//         let output;
//         if (geom instanceof new ol.geom.LineString()) {
//             output = formatLength(geom);
//             tooltipCoord = geom.getLastCoordinate();
//         }
//         measureTooltipElement.innerHTML = output;
//         measureTooltip.setPosition(tooltipCoord);
//         });
//     },this);
//     draw.on('drawend', function () {
//         console.log("drawing finished")
//         measureTooltipElement.className = 'ol-tooltip ol-tooltip-static';
//         measureTooltip.setOffset([0, -7]);
//         // unset sketch
//         sketch = null;
//         // unset tooltip so that a new one can be created
//         measureTooltipElement = null;
//         createMeasureTooltip();
//         ol.Observable.unByKey(listener);
//     },this);
// }