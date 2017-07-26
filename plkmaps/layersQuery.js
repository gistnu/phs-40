Ext.namespace("Heron");
Ext.namespace("Heron.options");
Ext.namespace("Heron.options.map");
Ext.namespace("Heron.geoportal");

OpenLayers.Util.onImageLoadErrorColor = "transparent";
OpenLayers.ProxyHost = "/cgi-bin/proxy.cgi?url=";
//OpenLayers.ProxyHost = "geoproxy.php?url=";
OpenLayers.DOTS_PER_INCH = 25.4 / 0.28;

Ext.BLANK_IMAGE_URL = 'http://cdnjs.cloudflare.com/ajax/libs/extjs/3.4.1-1/resources/images/default/s.gif';

var prj4326 = new OpenLayers.Projection("EPSG:4326");
//var prj32647 = new OpenLayers.Projection("EPSG:32647");
var prj3857 = new OpenLayers.Projection("EPSG:3857");
var pnt = new OpenLayers.LonLat(100, 17.04);
//var center = pnt.transform(prj4326, prj3857);
//map.zoomToExtent(new OpenLayers.Bounds(10880654.89,1709976.28,11331413.44,2082257.42).transform("EPSG:4326", "EPSG:900913"));

// Without default bottom status bar.
Heron.options.map.statusbar = [
	{type: "any", options:{xtype: 'tbtext', text: 'Location'}},
	{type: "-"},
  {type: "xcoord"},
  {type: "ycoord"}
];


Ext.namespace("Heron.options.map.settings");
Heron.options.map.settings = {
    projection: prj3857,
    displayProjection: prj4326, //prj32647
    units: 'm',
    maxExtent: '-20037508, -20037508,20037508, 20037508.34',
    center: center,
    maxResolution: '156543.0339', //'0.17578125',
    xy_precision: 5,
    zoom: zoom,
    theme: null,
    controls: [
        new OpenLayers.Control.Zoom(),
        new OpenLayers.Control.Attribution(),
        new OpenLayers.Control.Navigation()
    ],
};

Ext.namespace("Heron.scratch");
Heron.scratch.urls = {
    OwsGistNU3: 'http://www3.cgistln.nu.ac.th/geoserver/ows?',
	OwsGeo: 'http://www.geo-nred.nu.ac.th/geoserver/ows?',
	OwsGistNU2: 'http://www2.cgistln.nu.ac.th/geoserver/ows?',
	OwsMapNU1: 'http://www.map.nu.ac.th/geoserver/ows?',
	OwsHgisMapNU: 'http://www.map.nu.ac.th/geoserver-hgis/ows?',
    wmsAlr: 'http://map.nu.ac.th/gs-alr/ows?',
    gwcAlr: 'http://map.nu.ac.th/gs-alr/gwc/service/wms?',
    wmsAlr2: 'http://map.nu.ac.th/gs-alr2/ows?',
    gwcAlr2: 'http://map.nu.ac.th/gs-alr2/gwc/service/wms?',
    gwcTrf: 'http://map.nu.ac.th/geoserver-trfland/gwc/service/wms?',
    OwsMapNU: 'http://map.nu.ac.th/geoserver-trfland/ows?',
    OwsGistNU: 'http://www2.cgistln.nu.ac.th/para/ows?',
    OwsGISTDA: 'http://tile.gistda.or.th/geoserver/ows?',
    OwsFGDS: 'http://fgds.gistda.or.th/geoserver/ows?',
    GwcGistNU: 'http://www2.cgistln.nu.ac.th/para/gwc/service/wms?',
	GwcGistNU2: 'http://www2.cgistln.nu.ac.th/geoserver/gwc/service/wms?',
	thaichote: 'http://go-tiles1.gistda.or.th/mapproxy/service?'
	//http://go-tiles1.gistda.or.th/mapproxy/service?
};

Ext.namespace("Heron.options.wfs");
Heron.options.wfs.downloadFormats = [{
    name: 'CSV',
    outputFormat: 'csv',
    fileExt: '.csv'
}];

var filter = null;
var ip = 'www.map.nu.ac.th';
var hosturl = 'http://' + ip + '/geoserver-hgis/ows?';


//////////
var gTerrain = new OpenLayers.Layer.Google(
    "Google Terrain", {
        type: google.maps.MapTypeId.TERRAIN,
        visibility: true,
        group: 'background'
    }, {
        singleTile: false,
        buffer: 0,
        isBaseLayer: true
    }
);
var gSatellite = new OpenLayers.Layer.Google(
    "Google Satellite", {
        type: google.maps.MapTypeId.SATELLITE,
        visibility: false,
        group: 'background'
    }, {
        singleTile: false,
        buffer: 0,
        isBaseLayer: true
    }
);
var gStreet = new OpenLayers.Layer.Google(
    "Google Streets", // the default
    {
        type: google.maps.MapTypeId.ROADMAP,
        visibility: false,
        group: 'background'
    }, {
        singleTile: false,
        buffer: 0,
        isBaseLayer: true
    }
);
// flood
var flood_2005_geo = new OpenLayers.Layer.WMS(
    "พื้นที่น้ำท่วมปี 2548",
    Heron.scratch.urls.OwsGISTDA, { layers: "flood:flood_2005_geo", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'lyrService'
    }
);
var flood_2006_geo = new OpenLayers.Layer.WMS(
    "พื้นที่น้ำท่วมปี 2549",
    Heron.scratch.urls.OwsGISTDA, { layers: "flood:flood_2006_geo", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'lyrService'
    }
);
var flood_2007_geo = new OpenLayers.Layer.WMS(
    "พื้นที่น้ำท่วมปี 2550",
    Heron.scratch.urls.OwsGISTDA, { layers: "flood:flood_2007_geo", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'lyrService'
    }
);
var flood_2008_geo = new OpenLayers.Layer.WMS(
    "พื้นที่น้ำท่วมปี 2551",
    Heron.scratch.urls.OwsGISTDA, { layers: "flood:flood_2008_geo", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'lyrService'
    }
);
var flood_2009_geo = new OpenLayers.Layer.WMS(
    "พื้นที่น้ำท่วมปี 2552",
    Heron.scratch.urls.OwsGISTDA, { layers: "flood:flood_2009_geo", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'lyrService'
    }
);
var flood_2010_geo = new OpenLayers.Layer.WMS(
    "พื้นที่น้ำท่วมปี 2553",
    Heron.scratch.urls.OwsGISTDA, { layers: "flood:flood_2010_geo", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'lyrService'
    }
);
var flood_2011_geo = new OpenLayers.Layer.WMS(
    "พื้นที่น้ำท่วมปี 2554",
    Heron.scratch.urls.OwsGISTDA, { layers: "flood:flood_2011_geo", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'lyrService'
    }
);
var flood_2012_geo = new OpenLayers.Layer.WMS(
    "พื้นที่น้ำท่วมปี 2555",
    Heron.scratch.urls.OwsGISTDA, { layers: "flood:flood_2012_geo", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'lyrService'
    }
);
var flood_2013_geo = new OpenLayers.Layer.WMS(
    "พื้นที่น้ำท่วมปี 2556",
    Heron.scratch.urls.OwsGISTDA, { layers: "flood:flood_2013_geo", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'lyrService'
    }
);
var repeated_flooding = new OpenLayers.Layer.WMS(
    "พื้นที่น้ำท่วมซ้ำซาก",
    Heron.scratch.urls.gwcAlr2, { layers: "alrmap:flood_10y", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        group: 'disaster'
    }
);

// disaster
var scl_drought4326 = new OpenLayers.Layer.WMS(
    "ระดับเสี่ยงแล้ง",
    Heron.scratch.urls.gwcAlr2, { layers: "alrmap:rcl_drought", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'disaster'
    }
);
var scl_erosion4326 = new OpenLayers.Layer.WMS(
    "ระดับเสี่ยงการสูญเสียดิน",
    Heron.scratch.urls.gwcAlr2, { layers: "alrmap:rcl_erosion", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'disaster'
    }
);

var scl_landslide4326 = new OpenLayers.Layer.WMS(
    "ระดับเสี่ยงดินถล่ม",
    Heron.scratch.urls.gwcAlr2, { layers: "alrmap:rcl_landslide", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'disaster'
    }
);
// healthgis
var reportpoint = new OpenLayers.Layer.WMS(
    "ตำแหน่งที่ถูกแจ้งเป็นแหล่งเพาะพันธุ์ยุงลาย",
    Heron.scratch.urls.OwsHgisMapNU, { layers: "vmobile:reportpoint", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'healthgis'
    }
);
var v_prev_prov = new OpenLayers.Layer.WMS(
    "จำนวนผู้ป่วยโรคไข้เลือดออกระดับจังหวัด (คน : 100,000 ประชากร)",
    Heron.scratch.urls.OwsHgisMapNU, { layers: "hgis:v_prev_prov", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'healthgis'
    }
);
var v_prev_amp = new OpenLayers.Layer.WMS(
    "จำนวนผู้ป่วยโรคไข้เลือดออกระดับอำเภอ (คน : 100,000 ประชากร)",
    Heron.scratch.urls.OwsHgisMapNU, { layers: "hgis:v_prev_amp", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'healthgis'
    }
);
var v_prev_tam = new OpenLayers.Layer.WMS(
    "จำนวนผู้ป่วยโรคไข้เลือดออกระดับตำบล (คน : 100,000 ประชากร)",
    Heron.scratch.urls.OwsHgisMapNU, { layers: "hgis:v_prev_tam", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'healthgis'
    }
);
var v_vill_dengue = new OpenLayers.Layer.WMS(
    "จำนวนผู้ป่วยโรคไข้เลือดออกระดับหมู่บ้าน (คน)",
    Heron.scratch.urls.OwsHgisMapNU, { layers: "hgis:v_vill_dengue", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'healthgis'
    }
);


// soilsuite
var pararubber = new OpenLayers.Layer.WMS(
    "พื้นที่ปลูกยางพารา",
    Heron.scratch.urls.OwsGistNU, { layers: "para:_pararubber", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'soilsuite'
    }
);
var soil_group = new OpenLayers.Layer.WMS(
    "กลุ่มดิน",
    Heron.scratch.urls.wmsAlr2, { layers: "alr:ln9p_soil_group_4326", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'soilsuite'
    }
);
var soil_series = new OpenLayers.Layer.WMS(
    "ชุดดิน",
    Heron.scratch.urls.wmsAlr2, { layers: "alr:ln9p_soil_series_4326", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'soilsuite'
    }
);
var s_cassava = new OpenLayers.Layer.WMS(
    "ระดับเหมาะสมปลูกมันสำปะหลัง",
    Heron.scratch.urls.wmsAlr2, { layers: "alr:s_cassava", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'soilsuite'
    }
);
var s_maize = new OpenLayers.Layer.WMS(
    "ระดับเหมาะสมปลูกข้าวโพด",
    Heron.scratch.urls.wmsAlr2, { layers: "alr:s_maize", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'soilsuite'
    }
);
var s_rice = new OpenLayers.Layer.WMS(
    "ระดับเหมาะสมปลูกข้าว",
    Heron.scratch.urls.wmsAlr2, { layers: "alr:s_rice", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'soilsuite'
    }
);
var s_sugar = new OpenLayers.Layer.WMS(
    "ระดับเหมาะสมปลูกอ้อย",
    Heron.scratch.urls.wmsAlr2, { layers: "alr:s_sugar", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'soilsuite'
    }
);
var s_pasture = new OpenLayers.Layer.WMS(
    "ระดับเหมาะสมปลูกทุ่งหญ้าเลี้ยงสัตว์",
    Heron.scratch.urls.wmsAlr2, { layers: "alr:s_pasture", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'soilsuite'
    }
);
var s_fruit = new OpenLayers.Layer.WMS(
    "ระดับเหมาะสมปลูกผลไม้",
    Heron.scratch.urls.wmsAlr2, { layers: "alr:s_fruit", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'soilsuite'
    }
);
var s_vege = new OpenLayers.Layer.WMS(
    "ระดับเหมาะสมปลูกพืชผัก",
    Heron.scratch.urls.wmsAlr2, { layers: "alr:s_vege", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'soilsuite'
    }
);

var s_wheat = new OpenLayers.Layer.WMS(
    "ความเหมาะสมต่อการปลูกข้าวสาลี",
    Heron.scratch.urls.wmsAlr2, { layers: "alr:s_wheat", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'soilsuite'
    }
);
var s_barley = new OpenLayers.Layer.WMS(
    "ความเหมาะสมต่อการปลูกข้าวบาร์เล่ย์",
    Heron.scratch.urls.wmsAlr2, { layers: "alr:s_barley", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'soilsuite'
    }
);
var s_sorghum = new OpenLayers.Layer.WMS(
    "ความเหมาะสมต่อการปลูกข้าวฟ่าง",
    Heron.scratch.urls.wmsAlr2, { layers: "alr:s_sorghum", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'soilsuite'
    }
);
var s_soybean = new OpenLayers.Layer.WMS(
    "ความเหมาะสมต่อการปลูกถั่วเหลือง",
    Heron.scratch.urls.wmsAlr2, { layers: "alr:s_soybean", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'soilsuite'
    }
);
var s_peanut = new OpenLayers.Layer.WMS(
    "ความเหมาะสมต่อการปลูกถั่วลิสง",
    Heron.scratch.urls.wmsAlr2, { layers: "alr:s_peanut", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'soilsuite'
    }
);
var s_mungbean = new OpenLayers.Layer.WMS(
    "ความเหมาะสมต่อการปลูกถั่วเขียว",
    Heron.scratch.urls.wmsAlr2, { layers: "alr:s_mungbean", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'soilsuite'
    }
);
var s_bean = new OpenLayers.Layer.WMS(
    "ความเหมาะสมต่อการปลูกถั่ว",
    Heron.scratch.urls.wmsAlr2, { layers: "alr:s_bean", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'soilsuite'
    }
);
var s_sesame = new OpenLayers.Layer.WMS(
    "ความเหมาะสมต่อการปลูกงา",
    Heron.scratch.urls.wmsAlr2, { layers: "alr:s_sesame", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'soilsuite'
    }
);
var s_oil = new OpenLayers.Layer.WMS(
    "ความเหมาะสมต่อการปลูกปาล์มน้ำมัน",
    Heron.scratch.urls.wmsAlr2, { layers: "alr:s_oil", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'soilsuite'
    }
);
var s_cotton = new OpenLayers.Layer.WMS(
    "ความเหมาะสมต่อการปลูกฝ้าย",
    Heron.scratch.urls.wmsAlr2, { layers: "alr:s_cotton", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'soilsuite'
    }
);
var s_tobacco = new OpenLayers.Layer.WMS(
    "ความเหมาะสมต่อการปลูกยาสูบ",
    Heron.scratch.urls.wmsAlr2, { layers: "alr:s_tobacco", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'soilsuite'
    }
);
var s_lychee = new OpenLayers.Layer.WMS(
    "ความเหมาะสมต่อการปลูกลิ้นจี่",
    Heron.scratch.urls.wmsAlr2, { layers: "alr:s_lychee", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'soilsuite'
    }
);
var s_longan = new OpenLayers.Layer.WMS(
    "ความเหมาะสมต่อการปลูกลำไย",
    Heron.scratch.urls.wmsAlr2, { layers: "alr:s_longan", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'soilsuite'
    }
);
var s_arabica = new OpenLayers.Layer.WMS(
    "ความเหมาะสมต่อการปลูกกาแฟ",
    Heron.scratch.urls.wmsAlr2, { layers: "alr:s_arabica", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'soilsuite'
    }
);
var s_tea = new OpenLayers.Layer.WMS(
    "ความเหมาะสมต่อการปลูกชา",
    Heron.scratch.urls.wmsAlr2, { layers: "alr:s_tea", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'soilsuite'
    }
);
var s_mango = new OpenLayers.Layer.WMS(
    "ความเหมาะสมต่อการปลูกมะม่วง",
    Heron.scratch.urls.wmsAlr2, { layers: "alr:s_mango", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'soilsuite'
    }
);
var s_onion_l = new OpenLayers.Layer.WMS(
    "ความเหมาะสมต่อการปลูกต้นหอม",
    Heron.scratch.urls.wmsAlr2, { layers: "alr:s_onion_l", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'soilsuite'
    }
);
var s_garlic = new OpenLayers.Layer.WMS(
    "ความเหมาะสมต่อการปลูกกระเทียม",
    Heron.scratch.urls.wmsAlr2, { layers: "alr:s_garlic", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'soilsuite'
    }
);
var s_tomato = new OpenLayers.Layer.WMS(
    "ความเหมาะสมต่อการปลูกมะเขือเทศ",
    Heron.scratch.urls.wmsAlr2, { layers: "alr:s_tomato", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'soilsuite'
    }
);var s_orange1 = new OpenLayers.Layer.WMS(
    "ความเหมาะสมต่อการปลูกส้ม",
    Heron.scratch.urls.wmsAlr2, { layers: "alr:s_orange1", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'soilsuite'
    }
);
var s_pineappl = new OpenLayers.Layer.WMS(
    "ความเหมาะสมต่อการปลูกสัปปะรด",
    Heron.scratch.urls.wmsAlr2, { layers: "alr:s_pineappl", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'soilsuite'
    }
);var s_silk = new OpenLayers.Layer.WMS(
    "ความเหมาะสมต่อการปลูกไหม",
    Heron.scratch.urls.wmsAlr2, { layers: "alr:s_silk", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'soilsuite'
    }
);
var s_tamarind = new OpenLayers.Layer.WMS(
    "ความเหมาะสมต่อการปลูกมะขาม",
    Heron.scratch.urls.wmsAlr2, { layers: "alr:s_tamarind", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'soilsuite'
    }
);
var s_banana = new OpenLayers.Layer.WMS(
    "ความเหมาะสมต่อการปลูกกล้วย",
    Heron.scratch.urls.wmsAlr2, { layers: "alr:s_banana", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'soilsuite'
    }
);
var s_cashewnu = new OpenLayers.Layer.WMS(
    "ความเหมาะสมต่อการปลูกมะม่วงหิมพานต์",
    Heron.scratch.urls.wmsAlr2, { layers: "alr:s_cashewnu", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'soilsuite'
    }
);
var s_jackfrui = new OpenLayers.Layer.WMS(
    "ความเหมาะสมต่อการปลูกขนุน",
    Heron.scratch.urls.wmsAlr2, { layers: "alr:s_jackfrui", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'soilsuite'
    }
);
var s_bamboo = new OpenLayers.Layer.WMS(
    "ความเหมาะสมต่อการปลูกไม้ไผ่",
    Heron.scratch.urls.wmsAlr2, { layers: "alr:s_bamboo", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'soilsuite'
    }
);
var s_chili = new OpenLayers.Layer.WMS(
    "ความเหมาะสมต่อการปลูกพริก",
    Heron.scratch.urls.wmsAlr2, { layers: "alr:s_chili", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'soilsuite'
    }
);
var s_cabbage = new OpenLayers.Layer.WMS(
    "ความเหมาะสมต่อการปลูกกะหล่ำปลี",
    Heron.scratch.urls.wmsAlr2, { layers: "alr:s_cabbage", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'soilsuite'
    }
);
var s_potato = new OpenLayers.Layer.WMS(
    "ความเหมาะสมต่อการปลูกมันฝรั่ง",
    Heron.scratch.urls.wmsAlr2, { layers: "alr:s_potato", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'soilsuite'
    }
);
var s_kapok = new OpenLayers.Layer.WMS(
    "ความเหมาะสมต่อการปลูกนุ่น",
    Heron.scratch.urls.wmsAlr2, { layers: "alr:s_kapok", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'soilsuite'
    }
);
var s_avocado = new OpenLayers.Layer.WMS(
    "ความเหมาะสมต่อการปลูกอาโวคาโด",
    Heron.scratch.urls.wmsAlr2, { layers: "alr:s_avocado", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'soilsuite'
    }
);
var s_flowers = new OpenLayers.Layer.WMS(
    "ความเหมาะสมต่อการปลูกดอกไม้",
    Heron.scratch.urls.wmsAlr2, { layers: "alr:s_flowers", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'soilsuite'
    }
);

// baseLayers
var gdem_alr = new OpenLayers.Layer.WMS(
    "แบบจำลองระดับสูงเชิงเลข (เมตร)",
    Heron.scratch.urls.gwcAlr2, { layers: "alrmap:gdem_alr", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'baseLayers'
    }
);
var slope_alr = new OpenLayers.Layer.WMS(
    "ความลาดชัน (เปอร์เซ็นต์) ",
    Heron.scratch.urls.gwcAlr2, { layers: "alrmap:slope_alr", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'baseLayers'
    }
);
var hshade_alr = new OpenLayers.Layer.WMS(
    "ภูมิประเทศเชิงเงา",
    Heron.scratch.urls.gwcAlr2, { layers: "alrmap:hshade_alr", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'baseLayers'
    }
);
var basin = new OpenLayers.Layer.WMS(
    "ขอบเขตลุ่มน้ำ",
    Heron.scratch.urls.OwsGistNU3, { layers: "gistdata:basin_50k", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'baseLayers'
    }
);
// imagery
var thaichote_th = new OpenLayers.Layer.WMS(
    "THAICHOTE GO",
    Heron.scratch.urls.thaichote, { layers: "thaichote", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'imagery'
    }
);
var plk_aerial = new OpenLayers.Layer.WMS(
    "ภาพถ่ายออร์โธสีเชิงเลข 1:4000",
    Heron.scratch.urls.GwcGistNU2, { layers: "plkwater:plk_aerial", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'imagery'
    }
);
var plk_topo = new OpenLayers.Layer.WMS(
    "แผนที่ภูมิประเทศเชิงเลข 1:50000",
    Heron.scratch.urls.GwcGistNU2, { layers: "plkwater:plk_topo", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'imagery'
    }
);

//climate
var geotiff_coverage = new OpenLayers.Layer.WMS(
    "ปริมาณน้ำฝนรายชั่วโมง",
    Heron.scratch.urls.OwsGistNU3, { layers: "gistdata:geotiff_coverage", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'climate'
    }
);

var rainsplinegrid = new OpenLayers.Layer.WMS(
    "ปริมาณน้ำฝนสะสมย้อนหลัง 7 วัน",
    Heron.scratch.urls.wmsAlr2, { layers: "alrmap:rainsplinegrid", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'climate'
    }
);

var tempareture = new OpenLayers.Layer.WMS(
    "อุณหภูมิรายวัน",
    Heron.scratch.urls.OwsGeo, { layers: "temp:tempidw", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'climate'
    }
);

var pl_runoff = new OpenLayers.Layer.WMS(
    "ปริมาณน้ำท่ารายวัน",
    Heron.scratch.urls.OwsGistNU2, { layers: "plkwater:pl_runoff", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'climate'
    }
);

var radarservice = new OpenLayers.Layer.WMS(
    "ข้อมูลเรดาร์น้ำฝน",
    Heron.scratch.urls.OwsGistNU3, { layers: "lsnanbasin:tmdnectec", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'climate'
    }
);

var wshd_cl = new OpenLayers.Layer.WMS(
    "ชั้นคุณภาพลุ่มน้ำ",
    Heron.scratch.urls.wmsAlr2, { layers: "alr:ln9p_wsh_4326", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'baseLayers',
        metadata: {
            wfs: {
                protocol: 'fromWMSLayer',
                downloadFormats: Heron.options.wfs.downloadFormats
            }
        }
    }
);

// landlord
var irrparcel = new OpenLayers.Layer.WMS(
    "แปลงที่ดินในพื้นที่ชลประทานโครงการเขื่อนนเรศวร",
    Heron.scratch.urls.OwsMapNU1, { layers: "irr:v_parcel_select", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'landlord',
        metadata: {
            wfs: {
                protocol: 'fromWMSLayer',
                downloadFormats: Heron.options.wfs.downloadFormats
            }
        }
    }
);
var pl_nsl = new OpenLayers.Layer.WMS(
    "ที่สาธารณประโยชน์",
    Heron.scratch.urls.OwsMapNU1, { layers: "nsl:pl_nsl", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'landlord',
        metadata: {
            wfs: {
                protocol: 'fromWMSLayer',
                downloadFormats: Heron.options.wfs.downloadFormats
            }
        }
    }
);
var pl_trsryland = new OpenLayers.Layer.WMS(
    "แปลงที่ดินราชพัสดุ",
    Heron.scratch.urls.OwsMapNU1, { layers: "nsl:pl_trsryland", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'landlord',
        metadata: {
            wfs: {
                protocol: 'fromWMSLayer',
                downloadFormats: Heron.options.wfs.downloadFormats
            }
        }
    }
);
var pl_trsrybldg = new OpenLayers.Layer.WMS(
    "อาคารราชพัสดุ",
    Heron.scratch.urls.OwsMapNU1, { layers: "nsl:pl_trsrybldg", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'landlord',
        metadata: {
            wfs: {
                protocol: 'fromWMSLayer',
                downloadFormats: Heron.options.wfs.downloadFormats
            }
        }
    }
);

var flow_accum = new OpenLayers.Layer.WMS(
    "การไหลสะสมของน้ำ",
    Heron.scratch.urls.gwcAlr2, { layers: "alr:flow_accum", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.6,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'climate'
    }
);

var yield_4326 = new OpenLayers.Layer.WMS(
    "ปริมาณน้ำใต้ดิน",
    Heron.scratch.urls.wmsAlr2, { layers: "alr:wsupply_gwat", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'climate'
    }
);
///ความลึกของน้ำใต้ดิน
var ln9p_gwat_dept_4326 = new OpenLayers.Layer.WMS(
    "ความลึกน้ำใต้ดิน",
    Heron.scratch.urls.wmsAlr2, { layers: "alr:ln9p_gwat_dept_4326", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'climate'
    }
);
var wsupply_runoff = new OpenLayers.Layer.WMS(
    "ปริมาณน้ำท่า 30 ปี",
    Heron.scratch.urls.wmsAlr2, { layers: "alr:wsupply_runoff", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'climate'
    }
);

var wsupply_rain = new OpenLayers.Layer.WMS(
    "ปริมาณน้ำฝน 30 ปี",
    Heron.scratch.urls.wmsAlr2, { layers: "alr:wsupply_rain", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'climate'
    }
);

var alr_parcel = new OpenLayers.Layer.WMS(
    "แปลงที่ดิน",
    Heron.scratch.urls.wmsAlr2, {
        layers: "alr:alr_parcel_query",
        cql_filter: filter_tam,
        transparent: true,
        format: 'image/png'
    }, {
        singleTile: false,
        opacity: 0.6,
        isBaseLayer: false,
        visibility: lyrvisible_alr,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'default',
        metadata: {
            wfs: {
                protocol: 'fromWMSLayer',
                downloadFormats: Heron.options.wfs.downloadFormats
            }
        }
    }
);


// envi
var forestc = new OpenLayers.Layer.WMS(
    "อุทยาน ป่าสงวนและเขตอนุรักษ์พันธุ์สัตว์ป่า",
    Heron.scratch.urls.OwsMapNU, { layers: "trfgdb:forestc", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'baseLayers',
        metadata: {
            wfs: {
                protocol: 'fromWMSLayer',
                downloadFormats: Heron.options.wfs.downloadFormats
            }
        }
    }
);

// waterResource
var well = new OpenLayers.Layer.WMS(
    "บ่อบาดาล",
    Heron.scratch.urls.OwsMapNU1, { layers: "mapportal:well", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'waterResource'
    }
);
var ln9p_wat_natural_4326 = new OpenLayers.Layer.WMS(
    "แหล่งน้ำธรรมชาติ",
    Heron.scratch.urls.wmsAlr2, { layers: "alr:ln9p_wat_natural_4326", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'waterResource'
    }
);
var ln9p_wat_manmade_4326 = new OpenLayers.Layer.WMS(
    "แหล่งน้ำที่สร้างขึ้น",
    Heron.scratch.urls.wmsAlr2, { layers: "alr:ln9p_wat_manmade_4326", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'waterResource'
    }
);
var ln9p_irr_4326= new OpenLayers.Layer.WMS(
    "พื้นที่ชลประทาน",
    Heron.scratch.urls.wmsAlr2, { layers: "alr:ln9p_irr_4326", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'waterResource'
    }
);


// landuse
var lu_level1 = new OpenLayers.Layer.WMS(
    "การใช้ที่ดิน level1",
    Heron.scratch.urls.wmsAlr2, { layers: "alr:lu_level1", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'LandUse'
    }
);
var lu_level2 = new OpenLayers.Layer.WMS(
    "การใช้ที่ดิน level2",
    Heron.scratch.urls.wmsAlr2, { layers: "alr:lu_level2", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'LandUse'
    }
);
var lu_level3= new OpenLayers.Layer.WMS(
    "การใช้ที่ดิน level3",
    Heron.scratch.urls.wmsAlr2, { layers: "alr:lu_level3", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'LandUse'
    }
);
/// end lu ///

// admin
var ln9p_prov = new OpenLayers.Layer.WMS(
    "ขอบเขตจังหวัด",
    Heron.scratch.urls.wmsAlr2, {
        layers: "alr:ln9p_prov",
        cql_filter: filter_pro,
        transparent: true,
        format: 'image/png'
    }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: lyrvisible_pro,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'default',
        metadata: {
            wfs: {
                protocol: 'fromWMSLayer',
                downloadFormats: Heron.options.wfs.downloadFormats
            }
        }
    }
);
var ln9p_amp = new OpenLayers.Layer.WMS(
    "ขอบเขตอำเภอ",
    Heron.scratch.urls.wmsAlr2, {
        layers: "alr:ln9p_amp",
        cql_filter: filter_amp,
        transparent: true,
        format: 'image/png'
    }, {
        singleTile: false,
        opacity: 1,
        isBaseLayer: false,
        visibility: lyrvisible_amp,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'default',
        metadata: {
            wfs: {
                protocol: 'fromWMSLayer',
                downloadFormats: Heron.options.wfs.downloadFormats
            }
        }
    }
);
var ln9p_tam = new OpenLayers.Layer.WMS(
    "ขอบเขตตำบล",
    Heron.scratch.urls.wmsAlr2, {
        layers: "alr:ln9p_tam",
        cql_filter: filter_tam,
        transparent: true,
        format: 'image/png'
    }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: lyrvisible_tam,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'default',
        metadata: {
            wfs: {
                protocol: 'fromWMSLayer',
                downloadFormats: Heron.options.wfs.downloadFormats
            }
        }
    }
);
var municiple = new OpenLayers.Layer.WMS(
    "ขอบเขตเทศบาล",
    Heron.scratch.urls.OwsMapNU, { layers: "trfgdb:municiple", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'default',
        metadata: {
            wfs: {
                protocol: 'fromWMSLayer',
                downloadFormats: Heron.options.wfs.downloadFormats
            }
        }
    }
);
var stream = new OpenLayers.Layer.WMS(
    "เส้นลำน้ำ",
    Heron.scratch.urls.OwsMapNU, { layers: "trfgdb:stream", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'waterResource'
    }
);
var ln9p_elecline_4326 = new OpenLayers.Layer.WMS(
    "สายส่งแรงสูง",
    Heron.scratch.urls.wmsAlr2, { layers: "alr:ln9p_elecline_4326", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'baseLayers'
    }
);
var trans = new OpenLayers.Layer.WMS(
    "เส้นทางคมนาคม",
    Heron.scratch.urls.OwsMapNU, { layers: "trfgdb:trans", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'baseLayers'
    }
);

var expertSiteselection = new OpenLayers.Layer.WMS(
    "ตำแหน่งเหมาะสมพัฒนาแหล่งน้ำ",
    Heron.scratch.urls.wmsAlr2, { layers: "alr:expert_site_selected_4326", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: true,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'siteselection'
    }
);

var anamai = new OpenLayers.Layer.WMS(
    "สถานีอนามัย",
    Heron.scratch.urls.OwsMapNU, { layers: "trfgdb:anamai", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'place'
    }
);
var factory = new OpenLayers.Layer.WMS(
    "โรงงาน",
    Heron.scratch.urls.OwsMapNU, { layers: "trfgdb:factory", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'place'
    }
);
var hospital2 = new OpenLayers.Layer.WMS(
    "โรงพยาบาล",
    Heron.scratch.urls.OwsMapNU, { layers: "trfgdb:hospital2", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'place'
    }
);
var school = new OpenLayers.Layer.WMS(
    "โรงเรียน",
    Heron.scratch.urls.OwsMapNU, { layers: "trfgdb:school", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'place'
    }
);
var staairport = new OpenLayers.Layer.WMS(
    "ท่าอากาศยาน",
    Heron.scratch.urls.OwsMapNU, { layers: "trfgdb:staairport", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'place'
    }
);
var stabus = new OpenLayers.Layer.WMS(
    "สถานีขนส่งโดยสารรถประจำทาง",
    Heron.scratch.urls.OwsMapNU, { layers: "trfgdb:stabus", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'place'
    }
);
var ln9p_vill = new OpenLayers.Layer.WMS(
    "ที่ตั้งหมู่บ้าน",
    Heron.scratch.urls.OwsGistNU3, { layers: "gistdata:village", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'default',
        metadata: {
            wfs: {
                protocol: 'fromWMSLayer',
                downloadFormats: Heron.options.wfs.downloadFormats
            }
        }
    }
);
var p10_evap = new OpenLayers.Layer.WMS(
    "สถานีตรวจวัดค่าการระเหย",
    Heron.scratch.urls.OwsGistNU, { layers: "para:p10_evap", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'place'
    }
);
var p10_rain = new OpenLayers.Layer.WMS(
    "สถานีตรวจวัดค่าน้ำฝน",
    Heron.scratch.urls.OwsGistNU, { layers: "para:p10_rain", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'place'
    }
);

var selectedLayers = [gTerrain, gSatellite, gStreet, ln9p_prov, ln9p_amp, ln9p_tam, municiple, ln9p_vill];
var layersGroup = {
                            default: {
                                title: 'ขอบเขตการปกครอง',
                                expanded: true
                            }
                        };

var i = 0;
while (mapLayer[i]) {
    /*if (mapLayer[i] == 'lyrSiteselection') {
        selectedLayers.push(expertSiteselection);
        layersGroup['siteselection'] = {};
        layersGroup.siteselection['title'] = "ตำแหน่งเหมาะสมพัฒนาแหล่งน้ำ";
		
    }*/ if (mapLayer[i] == 'lyrPlace') {
        selectedLayers.push(anamai, hospital2, school, factory, staairport, stabus);
        layersGroup['place'] = {expanded: false};
        layersGroup.place['title'] = "กลุ่มข้อมูลที่ตั้งสถานที่สำคัญ";

/*    } else if (mapLayer[i] == 'lyrAdmin') {
        selectedLayers.push(ln9p_prov, ln9p_amp, ln9p_tam, municiple, ln9p_vill);
        layersGroup['adminBoundary'] = {};
        layersGroup.adminBoundary['title'] = "ขอบเขตการปกครอง";
		*/

    } else if (mapLayer[i] == 'lyrBase') {
        selectedLayers.push( wshd_cl,basin , hshade_alr, slope_alr, gdem_alr, forestc, trans, ln9p_elecline_4326);
        layersGroup['baseLayers'] = {expanded: false};
        layersGroup.baseLayers['title'] = "กลุ่มข้อมูลพื้นฐาน";

    } else if (mapLayer[i] == 'lyrImagery') {
        selectedLayers.push( thaichote_th,plk_aerial, plk_topo);
        layersGroup['imagery'] = {expanded: false};
        layersGroup.imagery['title'] = "กลุ่มข้อมูลภาพถ่ายทางอากาศและภาพจากดาวเทียม";

    } else if (mapLayer[i] == 'lyrWater') {
        selectedLayers.push(ln9p_irr_4326, ln9p_wat_manmade_4326, ln9p_wat_natural_4326,stream,well);
        layersGroup['waterResource'] = {expanded: false};
        layersGroup.waterResource['title'] = "กลุ่มข้อมูลทรัพยากรน้ำ";
    }
	else if (mapLayer[i] == 'lyrLand') {
        selectedLayers.push(irrparcel,pl_trsryland ,pl_trsrybldg, pl_nsl );
        layersGroup['landlord'] = {expanded: false};
        layersGroup.landlord['title'] = "กลุ่มข้อมูลที่ดิน";
	}
	else if (mapLayer[i] == 'lyrLandUse') {
        selectedLayers.push(lu_level3, lu_level2, lu_level1 );
        layersGroup['LandUse'] = {expanded: false};
        layersGroup.LandUse['title'] = "กลุ่มข้อมูลการใช้ที่ดิน";		
    }
	else if (mapLayer[i] == 'lyrClimate') {
        selectedLayers.push(pl_runoff, tempareture, rainsplinegrid, geotiff_coverage, radarservice);
        layersGroup['climate'] = {expanded: false};
        layersGroup.climate['title'] = "กลุ่มข้อมูลภูมิอากาศ";

    }else if (mapLayer[i] == 'lyrSoil') {
        selectedLayers.push( s_flowers, s_silk, s_tamarind, s_banana, s_cashewnu, s_pineappl, s_orange1, s_jackfrui, s_bamboo, s_chili, s_cabbage, s_potato, s_kapok, s_avocado, s_onion_l, s_garlic, s_sesame, s_oil, s_cotton, s_tobacco, s_lychee, s_longan, s_arabica, s_tea, s_mango, s_soybean, s_peanut, s_mungbean, s_bean, s_sorghum, s_wheat, s_barley, s_pasture, s_fruit, s_vege, s_sugar, s_cassava, s_maize, s_rice, pararubber, soil_series, soil_group);
        layersGroup['soilsuite'] = {expanded: false};
        layersGroup.soilsuite['title'] = "กลุ่มข้อมูลเกษตรกรรม";
	/*} else if (mapLayer[i] == 'lyrService') {
        selectedLayers.push(flood_2005_geo, flood_2006_geo, flood_2007_geo, flood_2008_geo, flood_2009_geo, flood_2010_geo, flood_2011_geo, flood_2012_geo, flood_2013_geo);
        layersGroup['lyrService'] = {};
        layersGroup.lyrService['title'] = "ชั้นข้อมูลออนไลน์จากแหล่งต่างๆ"; */
    } else if (mapLayer[i] == 'lyrDisaster') {
        selectedLayers.push(repeated_flooding, scl_drought4326, scl_erosion4326, scl_landslide4326 );
        layersGroup['disaster'] = {expanded: false};
        layersGroup.disaster['title'] = "กลุ่มข้อมูลภัยธรรมชาติ";
    } else if (mapLayer[i] == 'lyrHealth') {
        selectedLayers.push(v_prev_prov, v_prev_amp, v_prev_tam, v_vill_dengue, reportpoint );
        layersGroup['healthgis'] = {expanded: false};
        layersGroup.healthgis['title'] = "กลุ่มข้อมูลภัยสุขภาพ";
    };
	
    //console.log(layersGroup);
    i++;
};

//var layersGroup2 = layersGroup;


if(module == 'siteRegister'){
    //console.log(module);
    var hmodule = "พิษณุโลก 4.0 (plk-4.0)";
/*    var colModule = { header: "",
            width: 120,
            renderer: function(value, metaData, record, rowIndex, colIndex, store) {
                var template = '<a target="_new" href="http://map.nu.ac.th/alr-map/route.html#/{alrcode}">เพิ่มข้อมูลเพาะปลูก</a>';
                var options = { attrNames: ['alrcode'] };
                return Heron.widgets.GridCellRenderer.substituteAttrValues(template, options, record);
            }
        };
	var addEtc = { header: "",
            width: 120,
            renderer: function(value, metaData, record, rowIndex, colIndex, store) {
                var template = '<a target="_new" href="http://map.nu.ac.th/alr-map/route.html#/{alrcode}">เพิ่มข้อมูลอื่นๆ</a>';
                var options = { attrNames: ['alrcode'] };
                return Heron.widgets.GridCellRenderer.substituteAttrValues(template, options, record);
            }
        };*/
}else if (module == 'siteSelection'){
    //console.log(module);
    var hmodule = "module: พัฒนาแหล่งน้ำ";
/*    var colModule = { header: "",
            width: 120,
        }*/
};

layersGroup['background'] = {};
layersGroup.background['title'] = "แผนที่ฐาน";
layersGroup.background['exclusive'] = true;

Heron.options.map.layers = selectedLayers;
