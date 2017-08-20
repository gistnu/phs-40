Ext.namespace("Heron");
Ext.namespace("Heron.options");
Ext.namespace("Heron.options.map");
Ext.namespace("Heron.geoportal");

OpenLayers.Util.onImageLoadErrorColor = "transparent";
//OpenLayers.ProxyHost = "/cgi-bin/geoproxy.php?url=";
OpenLayers.ProxyHost = "resources/proxy.php?url=";
//OpenLayers.ProxyHost = "/cgi-bin/proxy.cgi?url=";
//OpenLayers.ProxyHost = "geoproxy.php?url=";
OpenLayers.DOTS_PER_INCH = 25.4 / 0.28;

Ext.BLANK_IMAGE_URL = 'http://cdnjs.cloudflare.com/ajax/libs/extjs/3.4.1-1/resources/images/default/s.gif';

var prj4326 = new OpenLayers.Projection("EPSG:4326");
var prj3857 = new OpenLayers.Projection("EPSG:3857");
var pnt = new OpenLayers.LonLat(100, 17.04);

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
	// WMS Services
	nuOWS: 'http://www.gistnu.com/geoserver/ows?',
    OwsGistNU3: 'http://www3.cgistln.nu.ac.th/geoserver/ows?',
	OwsGeo: 'http://www.geo-nred.nu.ac.th/geoserver/ows?',
	OwsGistNU2: 'http://www2.cgistln.nu.ac.th/geoserver/ows?',
	OwsHgisMapNU: 'http://www.map.nu.ac.th/geoserver-hgis/ows?',
    wmsAlr2: 'http://map.nu.ac.th/gs-alr2/ows?',
    OwsMapNU: 'http://map.nu.ac.th/geoserver-trfland/ows?',
	
	// GWC Services
	GwcGistNU2: 'http://www2.cgistln.nu.ac.th/geoserver/gwc/service/wms?',
	thaichote: 'http://go-tiles1.gistda.or.th/mapproxy/service?'
};

Ext.namespace("Heron.options.wfs");
Heron.options.wfs.downloadFormats = [{
    name: 'CSV',
    outputFormat: 'csv',
    fileExt: '.csv'
}];


// BaseMaps Google Maps 
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
var gHybrid = new OpenLayers.Layer.Google(
    "Google Hybrid", {
        type: google.maps.MapTypeId.HYBRID ,
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

//------------------------------------------ START Overlay Layers ------------------------------------------//
// disaster
var flood_2005 = new OpenLayers.Layer.WMS(
    "พื้นที่น้ำท่วมปี 2548",
    Heron.scratch.urls.nuOWS, { layers: "phs:flood_2005", cql_filter: filter_tam, styles:'flood', transparent: true, format: 'image/png' }, {
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
var flood_2006 = new OpenLayers.Layer.WMS(
    "พื้นที่น้ำท่วมปี 2549",
    Heron.scratch.urls.nuOWS, { layers: "phs:flood_2006", cql_filter: filter_tam, styles:'flood', transparent: true, format: 'image/png' }, {
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
var flood_2007 = new OpenLayers.Layer.WMS(
    "พื้นที่น้ำท่วมปี 2550",
    Heron.scratch.urls.nuOWS, { layers: "phs:flood_2007", cql_filter: filter_tam, styles:'flood', transparent: true, format: 'image/png' }, {
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
var flood_2008 = new OpenLayers.Layer.WMS(
    "พื้นที่น้ำท่วมปี 2551",
    Heron.scratch.urls.nuOWS, { layers: "phs:flood_2008", cql_filter: filter_tam, styles:'flood', transparent: true, format: 'image/png' }, {
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
var flood_2009 = new OpenLayers.Layer.WMS(
    "พื้นที่น้ำท่วมปี 2552",
    Heron.scratch.urls.nuOWS, { layers: "phs:flood_2009", cql_filter: filter_tam, styles:'flood', transparent: true, format: 'image/png' }, {
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
var flood_2010 = new OpenLayers.Layer.WMS(
    "พื้นที่น้ำท่วมปี 2553",
    Heron.scratch.urls.nuOWS, { layers: "phs:flood_2010", cql_filter: filter_tam, styles:'flood', transparent: true, format: 'image/png' }, {
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
var flood_2011 = new OpenLayers.Layer.WMS(
    "พื้นที่น้ำท่วมปี 2554",
    Heron.scratch.urls.nuOWS, { layers: "phs:flood_2011", cql_filter: filter_tam, styles:'flood', transparent: true, format: 'image/png' }, {
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
var flood_2012 = new OpenLayers.Layer.WMS(
    "พื้นที่น้ำท่วมปี 2555",
    Heron.scratch.urls.nuOWS, { layers: "phs:flood_2012", cql_filter: filter_tam, styles:'flood', transparent: true, format: 'image/png' }, {
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
var flood_2013 = new OpenLayers.Layer.WMS(
    "พื้นที่น้ำท่วมปี 2556",
    Heron.scratch.urls.nuOWS, { layers: "phs:flood_2013", cql_filter: filter_tam, styles:'flood', transparent: true, format: 'image/png' }, {
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
var flood_2014 = new OpenLayers.Layer.WMS(
    "พื้นที่น้ำท่วมปี 2557",
    Heron.scratch.urls.nuOWS, { layers: "phs:flood_2014", cql_filter: filter_tam, styles:'flood', transparent: true, format: 'image/png' }, {
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
var flood_2016 = new OpenLayers.Layer.WMS(
    "พื้นที่น้ำท่วมปี 2559",
    Heron.scratch.urls.nuOWS, { layers: "phs:flood_2016", cql_filter: filter_tam, styles:'flood', transparent: true, format: 'image/png' }, {
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
var flood_intersect = new OpenLayers.Layer.WMS(
    "พื้นที่น้ำท่วมซ้ำซากในรอบ 10 ปี (2548-2557)",
    Heron.scratch.urls.nuOWS, { layers: "phs:flood_intersect", cql_filter: filter_tam, styles:'flood', transparent: true, format: 'image/png' }, {
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

var flood_10y = new OpenLayers.Layer.WMS(
    "ความถี่น้ำท่วมขังในรอบ 10 ปี (2548-2557)",
    Heron.scratch.urls.nuOWS, { layers: "phs:flood_10y", transparent: true, format: 'image/png' }, {
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
var pl_drought = new OpenLayers.Layer.WMS(
    "ระดับเสี่ยงแล้ง",
    Heron.scratch.urls.nuOWS, { layers: "phs:pl_drought", transparent: true, format: 'image/png' }, {
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
var pl_sloss = new OpenLayers.Layer.WMS(
    "ระดับเสี่ยงการสูญเสียดิน",
    Heron.scratch.urls.nuOWS, { layers: "phs:pl_sloss", transparent: true, format: 'image/png' }, {
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
var pl_lslide = new OpenLayers.Layer.WMS(
    "ระดับเสี่ยงดินถล่ม",
    Heron.scratch.urls.nuOWS, { layers: "phs:pl_lslide", transparent: true, format: 'image/png' }, {
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
    Heron.scratch.urls.nuOWS, { layers: "phs:pararubber", cql_filter: filter_tam, styles:'pararubber', transparent: true, format: 'image/png' }, {
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
var soilgroup = new OpenLayers.Layer.WMS(
    "กลุ่มดิน",
    Heron.scratch.urls.nuOWS, { layers: "phs:soilgroup", cql_filter: filter_tam, styles:'soilgroup', transparent: true, format: 'image/png' }, {
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
var scasava = new OpenLayers.Layer.WMS(
    "ระดับเหมาะสมปลูกมันสำปะหลัง",
    Heron.scratch.urls.nuOWS, { layers: "phs:suitsv", cql_filter: filter_tam, styles:'scasava', transparent: true, format: 'image/png' }, {
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
var scorn = new OpenLayers.Layer.WMS(
    "ระดับเหมาะสมปลูกข้าวโพด",
    Heron.scratch.urls.nuOWS, { layers: "phs:suitsv", cql_filter: filter_tam, styles:'scorn', transparent: true, format: 'image/png' }, {
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
var srice = new OpenLayers.Layer.WMS(
    "ระดับเหมาะสมปลูกข้าว",
    Heron.scratch.urls.nuOWS, { layers: "phs:suitsv", cql_filter: filter_tam, styles:'srice', transparent: true, format: 'image/png' }, {
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
var ssugar = new OpenLayers.Layer.WMS(
    "ระดับเหมาะสมปลูกอ้อย",
    Heron.scratch.urls.nuOWS, { layers: "phs:suitsv", cql_filter: filter_tam, styles:'ssugar', transparent: true, format: 'image/png' }, {
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
var spineapple = new OpenLayers.Layer.WMS(
    "ระดับเหมาะสมปลูกสับปะรด",
    Heron.scratch.urls.nuOWS, { layers: "phs:suitsv", cql_filter: filter_tam, styles:'spineapple', transparent: true, format: 'image/png' }, {
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
var svegetable = new OpenLayers.Layer.WMS(
    "ระดับเหมาะสมปลูกพืชผัก",
    Heron.scratch.urls.nuOWS, { layers: "phs:suitsv", cql_filter: filter_tam, styles:'svegetable', transparent: true, format: 'image/png' }, {
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
var srubber = new OpenLayers.Layer.WMS(
    "ระดับเหมาะสมปลูกยางพารา",
    Heron.scratch.urls.nuOWS, { layers: "phs:suitsv", cql_filter: filter_tam, styles:'srubber', transparent: true, format: 'image/png' }, {
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

// LandUse
var landuse_48 = new OpenLayers.Layer.WMS(
    "การใช้ประโยชน์ที่ดิน ปีพ.ศ.2548",
    Heron.scratch.urls.nuOWS, { layers: "phs:landuse_48", cql_filter: filter_tam, styles:'landuse_48', transparent: true, format: 'image/png' }, {
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
var landuse_52 = new OpenLayers.Layer.WMS(
    "การใช้ประโยชน์ที่ดิน ปีพ.ศ.2552",
    Heron.scratch.urls.nuOWS, { layers: "phs:landuse_52", cql_filter: filter_tam, styles:'landuse_52', transparent: true, format: 'image/png' }, {
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
var landuse_56 = new OpenLayers.Layer.WMS(
    "การใช้ประโยชน์ที่ดิน ปีพ.ศ.2556",
    Heron.scratch.urls.nuOWS, { layers: "phs:landuse_56", cql_filter: filter_tam, styles:'landuse_56', transparent: true, format: 'image/png' }, {
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
var landuse_57 = new OpenLayers.Layer.WMS(
    "การใช้ประโยชน์ที่ดิน ปีพ.ศ.2557",
    Heron.scratch.urls.nuOWS, { layers: "phs:landuse_57", cql_filter: filter_tam, styles:'landuse_57', transparent: true, format: 'image/png' }, {
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

// baseLayers
var pl_rainsta = new OpenLayers.Layer.WMS(
    "สถานีตรวจวัดน้ำฝน",
    Heron.scratch.urls.nuOWS, { layers: "phs:pl_rainsta", cql_filter: filter_tam, styles:'pl_rainsta', transparent: true, format: 'image/png' }, {
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
var pl_runoffsta = new OpenLayers.Layer.WMS(
    "สถานีตรวจวัดน้ำท่า",
    Heron.scratch.urls.nuOWS, { layers: "phs:pl_runoffsta", cql_filter: filter_tam, styles:'pl_runoffsta', transparent: true, format: 'image/png' }, {
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
var elecline = new OpenLayers.Layer.WMS(
    "สายส่งศักดิ์สูง",
    Heron.scratch.urls.wmsAlr2, { layers: "alr:elecline", cql_filter: filter_tam, styles:'elecline', transparent: true, format: 'image/png' }, {
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
var road_ngis = new OpenLayers.Layer.WMS(
    "เส้นทางคมนาคม",
    Heron.scratch.urls.nuOWS, { layers: "phs:road_ngis", cql_filter: filter_tam, styles:'road_ngis', transparent: true, format: 'image/png' }, {
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
var way_osm = new OpenLayers.Layer.WMS(
    "เส้นทางคมนาคม(OSM)",
    Heron.scratch.urls.nuOWS, { layers: "phs:way_osm", cql_filter: filter_tam, styles:'way_osm', transparent: true, format: 'image/png' }, {
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
var index_ortho = new OpenLayers.Layer.WMS(
    "ระวางภาพถ่ายออร์โธสีเชิงเลข1:4,000",
    Heron.scratch.urls.nuOWS, { layers: "phs:index_ortho", cql_filter: filter_tam, styles:'index_ortho', transparent: true, format: 'image/png' }, {
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
var index50k = new OpenLayers.Layer.WMS(
    "ระวางแผนที่ภูมิประเทศ1:50,000",
    Heron.scratch.urls.nuOWS, { layers: "phs:index50k", cql_filter: filter_tam, styles:'index50k', transparent: true, format: 'image/png' }, {
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

var pl_evap = new OpenLayers.Layer.WMS(
    "ปริมาณการระเหยน้ำ (มม.)",
    Heron.scratch.urls.nuOWS, { layers: "phs:pl_evap", transparent: true, format: 'image/png' }, {
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
var pl_sun = new OpenLayers.Layer.WMS(
    "ความยาวแสงแดด (ชั่วโมง/วัน)",
    Heron.scratch.urls.nuOWS, { layers: "phs:pl_sun", transparent: true, format: 'image/png' }, {
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
var pl_temp = new OpenLayers.Layer.WMS(
    "อุุณหภูมิเฉลี่ย/วัน องศาเซลเซียส",
    Heron.scratch.urls.nuOWS, { layers: "phs:pl_temp", transparent: true, format: 'image/png' }, {
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
var pl_rh = new OpenLayers.Layer.WMS(
    "ความชื้นสัมพัทธ์ (%)",
    Heron.scratch.urls.nuOWS, { layers: "phs:pl_rh", transparent: true, format: 'image/png' }, {
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
var pl_rain = new OpenLayers.Layer.WMS(
    "ปริมาณน้ำฝน (มม.) (สถิติย้อนหลัง30ปี)",
    Heron.scratch.urls.nuOWS, { layers: "phs:pl_rain", transparent: true, format: 'image/png' }, {
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
var pl_runoff30y = new OpenLayers.Layer.WMS(
    "ปริมาณน้ำท่า (ลบ.ม.) (สถิติย้อนหลัง30ปี)",
    Heron.scratch.urls.nuOWS, { layers: "phs:pl_runoff", transparent: true, format: 'image/png' }, {
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

// physical
var pl_contour = new OpenLayers.Layer.WMS(
    "เส้นชั้นความสูงเท่า",
    Heron.scratch.urls.nuOWS, { layers: "phs:contour", cql_filter: filter_tam, styles:'contour', transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'physical'
    }
);
var pl_dem = new OpenLayers.Layer.WMS(
    "แบบจำลองระดับสูงเชิงเลข (เมตร)",
    Heron.scratch.urls.nuOWS, { layers: "phs:pl_dem", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'physical'
    }
);
var pl_slope = new OpenLayers.Layer.WMS(
    "ความลาดชัน (%)",
    Heron.scratch.urls.nuOWS, { layers: "phs:pl_slope", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'physical'
    }
);
var pl_hshde = new OpenLayers.Layer.WMS(
    "ภูมิประเทศเชิงเงา",
    Heron.scratch.urls.nuOWS, { layers: "phs:pl_hshde", transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'physical'
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

// var tempareture = new OpenLayers.Layer.WMS(
    // "อุณหภูมิรายวัน",
    // Heron.scratch.urls.OwsGeo, { layers: "temp:tempidw", transparent: true, format: 'image/png' }, {
        // singleTile: false,
        // opacity: 0.9,
        // isBaseLayer: false,
        // visibility: false,
        // noLegend: false,
        // featureInfoFormat: 'application/vnd.ogc.gml',
        // transitionEffect: 'null',
        // queryable: true,
        // group: 'climate'
    // }
// );

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


// landlord
var building = new OpenLayers.Layer.WMS(
    "อาคารในเขตเทศบาล",
    Heron.scratch.urls.nuOWS, { layers: "phs:building", cql_filter: filter_tam, styles:'building', transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'landlord'
    }
);
var building_osm = new OpenLayers.Layer.WMS(
    "อาคารจาก OSM",
    Heron.scratch.urls.nuOWS, { layers: "phs:building_osm", cql_filter: filter_tam, styles:'building', transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'landlord'
    }
);
var irr_parcel = new OpenLayers.Layer.WMS(
    "แปลงที่ดินในพื้นที่ชลประทานโครงการเขื่อนนเรศวร",
    Heron.scratch.urls.nuOWS, { layers: "phs:irr_parcel", cql_filter: filter_tam, styles:'irr_parcel', transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'landlord'
    }
);
var treasury_bound = new OpenLayers.Layer.WMS(
    "แปลงที่ดินราชพัสดุ",
    Heron.scratch.urls.nuOWS, { layers: "phs:treasury_bound", cql_filter: filter_tam, styles:'treasury_bound', transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'landlord'
    }
);
var treasury_build = new OpenLayers.Layer.WMS(
    "อาคารราชพัสดุ",
    Heron.scratch.urls.nuOWS, { layers: "phs:reasury_build", cql_filter: filter_tam, styles:'reasury_build', transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'landlord'
    }
);
var alro_bound = new OpenLayers.Layer.WMS(
    "ของเขตพืนที่ สปก.",
    Heron.scratch.urls.nuOWS, { layers: "phs:alro_bound", cql_filter: filter_tam, styles:'alro_bound', transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'landlord'
    }
);
var alro_parcel = new OpenLayers.Layer.WMS(
    "แปลงที่ดิน สปก.",
    Heron.scratch.urls.nuOWS, { layers: "phs:alro_parcel", cql_filter: filter_tam, styles:'alro_parcel', transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'landlord'
    }
);
var nsl_parcel = new OpenLayers.Layer.WMS(
    "ที่สาธารณประโยชน์",
    Heron.scratch.urls.nuOWS, { layers: "phs:nsl_parcel", cql_filter: filter_tam, styles:'nsl_parcel', transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'landlord'
    }
);

// forest
var nha_forest = new OpenLayers.Layer.WMS(
    "เขตห้ามล่าสัตว์ กรมป่าไม้",
    Heron.scratch.urls.nuOWS, { layers: "phs:nha_forest", cql_filter: filter_tam, styles:'nha_forest', transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'forestLayers',
        metadata: {
            wfs: {
                protocol: 'fromWMSLayer',
                downloadFormats: Heron.options.wfs.downloadFormats
            }
        }
    }
);
var conservation_law = new OpenLayers.Layer.WMS(
    "ป่าอนุรักษ์ ",
    Heron.scratch.urls.nuOWS, { layers: "phs:conservation_law", cql_filter: filter_tam, styles:'conservation_law', transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'forestLayers',
        metadata: {
            wfs: {
                protocol: 'fromWMSLayer',
                downloadFormats: Heron.options.wfs.downloadFormats
            }
        }
    }
);
var nrf_forest = new OpenLayers.Layer.WMS(
    "แนวเขตป่าสงวนแห่งชาติ 2556 กรมป่าไม้ ",
    Heron.scratch.urls.nuOWS, { layers: "phs:nrf_forest", cql_filter: filter_tam, styles:'nrf_forest', transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'forestLayers',
        metadata: {
            wfs: {
                protocol: 'fromWMSLayer',
                downloadFormats: Heron.options.wfs.downloadFormats
            }
        }
    }
);
var pf_forest = new OpenLayers.Layer.WMS(
    "แนวเขตป่าไม้ถาวร ตามมติครม. 2556 กรมป่าไม้",
    Heron.scratch.urls.nuOWS, { layers: "phs:pf_forest", cql_filter: filter_tam, styles:'pf_forest', transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'forestLayers',
        metadata: {
            wfs: {
                protocol: 'fromWMSLayer',
                downloadFormats: Heron.options.wfs.downloadFormats
            }
        }
    }
);
var pl_forest = new OpenLayers.Layer.WMS(
    "เขตป่าไม้",
    Heron.scratch.urls.nuOWS, { layers: "phs:pl_forest", cql_filter: filter_tam, styles:'pl_forest', transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'forestLayers',
        metadata: {
            wfs: {
                protocol: 'fromWMSLayer',
                downloadFormats: Heron.options.wfs.downloadFormats
            }
        }
    }
);
var pl_forest202_fr = new OpenLayers.Layer.WMS(
    "ป่าเสื่อมโทรม กรมป่าไม้",
    Heron.scratch.urls.nuOWS, { layers: "phs:pl_forest202_fr", cql_filter: filter_tam, styles:'pl_forest202_fr', transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'forestLayers',
        metadata: {
            wfs: {
                protocol: 'fromWMSLayer',
                downloadFormats: Heron.options.wfs.downloadFormats
            }
        }
    }
);
var pl_forest202_ldd = new OpenLayers.Layer.WMS(
    "ป่าเสื่อมโทรม กรมพัฒนาที่ดิน",
    Heron.scratch.urls.nuOWS, { layers: "phs:pl_forest202_ldd", cql_filter: filter_tam, styles:'pl_forest202_ldd', transparent: true, format: 'image/png' }, {
        singleTile: false,
        opacity: 0.9,
        isBaseLayer: false,
        visibility: false,
        noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml',
        transitionEffect: 'null',
        queryable: true,
        group: 'forestLayers',
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
var pwa_water = new OpenLayers.Layer.WMS(
    "แหล่งน้ำประปา",
    Heron.scratch.urls.nuOWS, { layers: "phs:pwa_water", cql_filter: filter_tam, styles:'pwa_water', transparent: true, format: 'image/png' },{
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
var pl_point_a3_1269 = new OpenLayers.Layer.WMS(
    "แหล่งน้ำปัจจุบัน(สำรวจจากประชาชน)",
    Heron.scratch.urls.nuOWS, { layers: "phs:pl_point_a3_1269", cql_filter: filter_tam, styles:'pl_point_a3_1269', transparent: true, format: 'image/png' },{
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
var pl_point_dwr_819 = new OpenLayers.Layer.WMS(
    "แหล่งน้ำปัจจุบัน(กรมทรัพยากรน้ำ)",
    Heron.scratch.urls.nuOWS, { layers: "phs:pl_point_dwr_819", cql_filter: filter_tam, styles:'pl_point_dwr_819', transparent: true, format: 'image/png' },{
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
var pl_point_proj_73 = new OpenLayers.Layer.WMS(
    "ความต้องการแหล่งน้ำของประชาชน",
    Heron.scratch.urls.nuOWS, { layers: "phs:pl_point_proj_73", cql_filter: filter_tam, styles:'pl_point_proj_73', transparent: true, format: 'image/png' },{
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
var pl_reservoir_point = new OpenLayers.Layer.WMS(
    "ตำแหน่งที่ตั้งอ่างเก็บน้ำ",
    Heron.scratch.urls.nuOWS, { layers: "phs:pl_reservoir_point", cql_filter: filter_tam, styles:'pl_reservoir_point', transparent: true, format: 'image/png' },{
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
var stream = new OpenLayers.Layer.WMS(
    "เส้นลำน้ำ",
    Heron.scratch.urls.nuOWS, { layers: "phs:stream", cql_filter: filter_tam, styles:'stream', transparent: true, format: 'image/png' }, {
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
var waterbody = new OpenLayers.Layer.WMS(
    "พื้นที่แหล่งน้ำธรรมชาติ",
    Heron.scratch.urls.nuOWS, { layers: "phs:waterbody", cql_filter: filter_tam, styles:'waterbody', transparent: true, format: 'image/png' }, {
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

var irr_area= new OpenLayers.Layer.WMS(
    "พื้นที่ชลประทาน",
    Heron.scratch.urls.nuOWS,{ layers: "phs:irr_area", cql_filter: filter_tam, styles:'irr_area', transparent: true, format: 'image/png' }, {
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
var pl_wshdcls = new OpenLayers.Layer.WMS(
    "ชั้นคุณภาพลุ่มน้ำ",
    Heron.scratch.urls.nuOWS, { layers: "phs:pl_wshdcls", cql_filter: filter_tam, styles:'pl_wshdcls', transparent: true, format: 'image/png' }, {
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

var basin50k = new OpenLayers.Layer.WMS(
    "ขอบเขตลุ่มน้ำ",
    Heron.scratch.urls.nuOWS, { layers: "phs:basin50k", cql_filter: filter_tam, styles:'basin50k', transparent: true, format: 'image/png' }, {
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
var municipa = new OpenLayers.Layer.WMS(
    "ขอบเขตเทศบาล",
    Heron.scratch.urls.nuOWS, { layers: "phs:minucipa", cql_filter: filter_tam, styles:'municipa', transparent: true, format: 'image/png' },  {
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

// place
var hospital_sub = new OpenLayers.Layer.WMS(
    "รพสต.",
    Heron.scratch.urls.nuOWS, { layers: "phs:hospital_sub",cql_filter: filter_tam, styles:'hospital_sub', transparent: true, format: 'image/png' }, {
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
var public_health = new OpenLayers.Layer.WMS(
    "สำนักงานสาธารณสุข",
    Heron.scratch.urls.nuOWS, { layers: "phs:public_health",cql_filter: filter_tam, styles:'public_health', transparent: true, format: 'image/png' }, {
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
var hcenter = new OpenLayers.Layer.WMS(
    "ศูนย์สุขภาพ",
    Heron.scratch.urls.nuOWS, { layers: "phs:hcenter",cql_filter: filter_tam, styles:'hcenter', transparent: true, format: 'image/png' }, {
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
var hospital = new OpenLayers.Layer.WMS(
    "โรงพยาบาล",
    Heron.scratch.urls.nuOWS, { layers: "phs:hospital",cql_filter: filter_tam, styles:'hospital', transparent: true, format: 'image/png' },  {
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
    Heron.scratch.urls.nuOWS, { layers: "phs:factory", cql_filter: filter_tam, styles:'factory', transparent: true, format: 'image/png' }, {
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
var temple = new OpenLayers.Layer.WMS(
    "วัด",
    Heron.scratch.urls.nuOWS, { layers: "phs:temple", cql_filter: filter_tam, styles:'temple', transparent: true, format: 'image/png' }, {
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
var supermaket = new OpenLayers.Layer.WMS(
    "ห้างสรรพสินค้า",
    Heron.scratch.urls.nuOWS, { layers: "phs:supermaket", cql_filter: filter_tam, styles:'supermaket', transparent: true, format: 'image/png' }, {
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
var village = new OpenLayers.Layer.WMS(
    "ที่ตั้งหมู่บ้าน",
    Heron.scratch.urls.nuOWS, { layers: "phs:village", cql_filter: filter_tam, styles:'village', transparent: true, format: 'image/png' }, {
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
//------------------------------------------ END Overlay Layers ------------------------------------------//

var selectedLayers = [gTerrain, gHybrid, gSatellite, gStreet, pl_hshde ,pl_slope, pl_dem, thaichote_th, plk_aerial, plk_topo, ln9p_prov, ln9p_amp, ln9p_tam, municipa, village];
var layersGroup = {
                            default: {
                                title: 'ขอบเขตการปกครอง',
                                expanded: true
                            }
                        };

var i = 0;
while (mapLayer[i]) {
     if (mapLayer[i] == 'lyrImagery') {
        selectedLayers.push( thaichote_th,plk_aerial, plk_topo);
        layersGroup['imagery'] = {expanded: false};
        layersGroup.imagery['title'] = "กลุ่มข้อมูลภาพถ่ายทางอากาศและภาพจากดาวเทียม";
		
	} else if (mapLayer[i] == 'lyrTerain') {
        selectedLayers.push( pl_hshde ,pl_slope, pl_dem, pl_contour);
        layersGroup['physical'] = {expanded: false};
        layersGroup.physical['title'] = "กลุ่มข้อมูลภูมิประเทศ";
		
    } else if (mapLayer[i] == 'lyrBase') {
        selectedLayers.push( pl_temp, pl_evap, pl_rh, pl_sun,pl_runoff30y, pl_rain, way_osm, road_ngis, elecline, pl_runoffsta, pl_rainsta);
        layersGroup['baseLayers'] = {expanded: false};
        layersGroup.baseLayers['title'] = "กลุ่มข้อมูลพื้นฐาน"; //index50k, index_ortho,
		
    } else if (mapLayer[i] == 'lyrForest') {
        selectedLayers.push( pl_forest, pf_forest, nrf_forest, nha_forest, conservation_law, pl_forest202_fr, pl_forest202_ldd);
        layersGroup['forestLayers'] = {expanded: false};
        layersGroup.forestLayers['title'] = "กลุ่มข้อมูลทรัพยากรป่าไม้";
	
    } else if (mapLayer[i] == 'lyrDisaster') {
        selectedLayers.push(pl_sloss,pl_lslide,pl_drought,flood_10y,flood_intersect,flood_2016,flood_2014,flood_2013,flood_2012,flood_2011,flood_2010,flood_2009,flood_2008,flood_2007,flood_2006,flood_2005 );
        layersGroup['disaster'] = {expanded: false};
        layersGroup.disaster['title'] = "กลุ่มข้อมูลภัยธรรมชาติ";
		
    } else if (mapLayer[i] == 'lyrSoil') {
        selectedLayers.push(srubber,svegetable,spineapple,ssugar,scasava,scorn,srice,pararubber,soilgroup);
        layersGroup['soilsuite'] = {expanded: false};
        layersGroup.soilsuite['title'] = "กลุ่มข้อมูลเกษตรกรรม";		
		
	} else if (mapLayer[i] == 'lyrLandUse') {
        selectedLayers.push(landuse_57,landuse_56, landuse_52, landuse_48 );
        layersGroup['LandUse'] = {expanded: false};
        layersGroup.LandUse['title'] = "กลุ่มข้อมูลการใช้ที่ดิน";		
		
	} else if (mapLayer[i] == 'lyrLand') {
        selectedLayers.push(nsl_parcel,alro_bound,alro_parcel,treasury_build,irr_parcel,treasury_bound,building_osm,building );
        layersGroup['landlord'] = {expanded: false};
        layersGroup.landlord['title'] = "กลุ่มข้อมูลที่ดิน";
		
    } else if (mapLayer[i] == 'lyrClimate') {
        selectedLayers.push(pl_runoff, rainsplinegrid, geotiff_coverage, radarservice);
        layersGroup['climate'] = {expanded: false};
        layersGroup.climate['title'] = "กลุ่มข้อมูลภูมิอากาศ";
		
    } else if (mapLayer[i] == 'lyrWater') {
        selectedLayers.push( basin50k, irr_area, waterbody, pl_wshdcls, stream, pl_point_a3_1269, pl_point_dwr_819, pl_point_proj_73, pl_reservoir_point, pwa_water);
        layersGroup['waterResource'] = {expanded: false};
        layersGroup.waterResource['title'] = "กลุ่มข้อมูลทรัพยากรน้ำ";		
		
    } else if (mapLayer[i] == 'lyrHealth') {
        selectedLayers.push(v_prev_prov, v_prev_amp, v_prev_tam, v_vill_dengue, reportpoint );
        layersGroup['healthgis'] = {expanded: false};
        layersGroup.healthgis['title'] = "กลุ่มข้อมูลภัยสุขภาพ";
		
    } else if (mapLayer[i] == 'lyrPlace') {
        selectedLayers.push(hospital_sub, hcenter, public_health, hospital, factory, temple, supermaket);
        layersGroup['place'] = {expanded: false};
        layersGroup.place['title'] = "กลุ่มข้อมูลที่ตั้งสถานที่สำคัญ";
    };
	
    //console.log(layersGroup); 
    i++;
};


if(module == 'siteRegister'){
    //console.log(module);
    var hmodule = "พิษณุโลก 4.0 (PHS 4.0)";
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
