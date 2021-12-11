
function select_by_attribute () {  
    var select = document.getElementById('places');
    var option = select.options[select.selectedIndex].value;
    
    var value_layer="etiopia:tourist_site"
    var value_attribute="etiopia:name"
    var value_operator="="
    var url = "http://localhost:8080/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName="+value_layer+"&CQL_FILTER="+value_attribute+"+"+value_operator+"+'"+option+"'&outputFormat=application/json"
    
    var style = new ol.style.Style({
      fill: new ol.style.Fill({
          color: 'rgba(255, 255, 255, 0.1)'
      }),
      stroke: new ol.style.Stroke({
          color: '#ffcc33',
          width: 3
      }),
  
      image: new ol.style.Circle({
          radius: 7,
          fill: new ol.style.Fill({
              color: '#ffcc33'
          })
      })
  });
    
        newGeojson = new ol.layer.Vector({
          //title:option,
         //title: '<h5>' + value_crop+' '+ value_param +' '+ value_seas+' '+value_level+'</h5>',
              source: new ol.source.Vector({
                url: url,
                format: new ol.format.GeoJSON(),
              }),
              style: style,
              
            });
            newGeojson.getSource().on('addfeature', function(){
                map.getView().fit(
                newGeojson.getSource().getExtent(),
                { duration: 1590, size: map.getSize() });
  

            });
            overlays.getLayers().push(newGeojson)
    
    var postData_filter =
                '<wfs:GetFeature service="WFS" version="1.0.0"\n' +
                'xmlns:cdf="http://www.opengis.net/cite/data"\n' +
                'xmlns:ogc="http://www.opengis.net/ogc"\n' +
                'xmlns:wfs="http://www.opengis.net/wfs"\n' +
                'xmlns:etiopia="www.etiopia.com">\n' +
                '<wfs:Query typeName="etiopia:tourist_site">\n' +
                '<ogc:Filter>\n' +
                    '<ogc:PropertyIsEqualTo>\n'+
                        '<ogc:PropertyName>etiopia:name</ogc:PropertyName>\\n'+
                        '<ogc:Literal>\n'+
                            option + '\n' +
                         '</ogc:Literal>\n'+
                    '</ogc:PropertyIsEqualTo>\n'+
                '</ogc:Filter>\n' +
                '</wfs:Query>\n' +
                '</wfs:GetFeature>\n';
    
    var request= makeRequest("POST","http://localhost:8080/geoserver/wfs",postData_filter)
    strXML=request.response
    var doc;
    if(window.ActiveXObject)  
    {  
        doc = new ActiveXObject('Microsoft.XMLDOM'); // For IE6, IE5  
        doc.async = 'false';  
        doc.loadXML(strXML);     
    }  else{  
            var parser = new DOMParser();  
            doc = parser.parseFromString(strXML, 'text/xml'); // For Firefox, Chrome etc  
    } 
    
    var name = doc.getElementsByTagName("etiopia:name")[0].childNodes[0].nodeValue;
    var type=doc.getElementsByTagName("etiopia:type")[0].childNodes[0].nodeValue;
    var sub_city=doc.getElementsByTagName("etiopia:sub_city")[0].childNodes[0].nodeValue;
    
    var lat=parseFloat(doc.getElementsByTagName("etiopia:latitude")[0].childNodes[0].nodeValue);
    var lon=parseFloat(doc.getElementsByTagName("etiopia:longitude")[0].childNodes[0].nodeValue);

    var searchContent = '<h3>' + name + '</h3>';
        searchContent += '<h5>' + type + '</h5>';
        searchContent += '<h5>' + sub_city + '</h5>';
    
        content.innerHTML = searchContent;
        var source=newGeojson.getSource()
        var lonLat = new ol.geom.Point(lat,lon);
        var pointFeature = new ol.Feature({
            geometry: lonLat,
            weight: 1 ,
        });
        source.addFeature(pointFeature);
        // var route = new ol.Feature();
        // var coordinates = [[2.173403, 40.385064], [lat,lon]];
        // var geometry = new ol.geom.LineString(coordinates);
        // geometry.transform('EPSG:4326', 'EPSG:3857'); //Transform to your map projection
        // route.setGeometry(geometry);
        // source.addFeature(route)
            
    
        // create the layer
        // heatMapLayer = new ol.layer.Heatmap({
        //     //source: source,
        //     // radius: 18,
        //     // shadow: 500,
        //     // gradient: ['#00f', '#0ff', '#0f0', '#ff0', '#f00'],
        //     // blur:45
        // });
         
        //map.addLayer(heatMapLayer);
        // heatMapLayer.set('name','heatMapLayer')    
        // map.on('click', highlight); 
        // map.zoomToExtent(heatMapLayer.getDataExtent());
        // var layersToRemove = [];
        // map.getLayers().forEach(function (layer) {   
    };