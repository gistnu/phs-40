/*
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
/** chingchai humhong (chingchaih@nu.ac.th) **/
/**
 * Defines settings for the Heron App layout wihtin Layout.js.
 *
 * The layout specifies a hierarchy of ExtJS (Panel) and GeoExt and Heron MC components.
 * For convenience specific settings within this layout are defined here
 * for structuring and reuse purposes.
 *
 **/

OpenLayers.Util.onImageLoadErrorColor = "transparent";
OpenLayers.ProxyHost = "/cgi-bin/proxy.cgi?url=";
Ext.BLANK_IMAGE_URL = 'http://cdnjs.cloudflare.com/ajax/libs/extjs/3.4.1-1/resources/images/default/s.gif';

/*
 * Common settings for MapPanel
 * These will be assigned as "hropts" within the MapPanel config
 */
Ext.namespace("Heron.options.map");
Heron.options.map.settings = {
  projection: 'EPSG:900913',
  displayProjection: new OpenLayers.Projection("EPSG:4326"),
  units: 'm',
  maxExtent: '-20037508.34, -20037508.34, 20037508.34, 20037508.34',
  center: '11141190.727,1458223.243',
  maxResolution: '156543.0339',//'0.17578125',
  xy_precision: 5,
  zoom: 6,
  theme: null,

    /**
     * Useful to always have permalinks enabled. default is enabled with these settings.
     * MapPanel.getPermalink() returns current permalink
     *
     **/
    permalinks: {
        /** The prefix to be used for parameters, e.g. map_x, default is 'map' */
        paramPrefix: 'map',

        /** Encodes values of permalink parameters ? default false*/
        encodeType: false,
        /** Use Layer names i.s.o. OpenLayers-generated Layer Id's in Permalinks */
        prettyLayerNames: true
    }

    /** You can always control which controls are to be added to the map. */
    /* controls : [
     new OpenLayers.Control.Attribution(),
     new OpenLayers.Control.ZoomBox(),
     new OpenLayers.Control.Navigation({dragPanOptions: {enableKinetic: true}}),
     new OpenLayers.Control.LoadingPanel(),
     new OpenLayers.Control.PanPanel(),
     new OpenLayers.Control.ZoomPanel(),
     new OpenLayers.Control.OverviewMap(),
     new OpenLayers.Control.ScaleLine({geodesic: true, maxWidth: 200})
     ] */
};

// TODO see how we can set/override Map OpenLayers Controls
//Heron.options.map.controls = [new OpenLayers.Control.ZoomBox(),
//			new OpenLayers.Control.ScaleLine({geodesic: true, maxWidth: 200})];
Ext.namespace("Heron.options.wfs");
Heron.options.wfs.downloadFormats = [
    {
        name: 'CSV',
        outputFormat: 'csv',
        fileExt: '.csv'
    },
    {
        name: 'GML (version 2.1.2)',
        outputFormat: 'text/xml; subtype=gml/2.1.2',
        fileExt: '.gml'
    },
//    {
//        name: 'ESRI Shapefile (zipped)',
//        outputFormat: 'SHAPE-ZIP',
//        fileExt: '.zip'
//    },
    {
        name: 'GeoJSON',
        outputFormat: 'json',
        fileExt: '.json'
    }
];

// See ToolbarBuilder.js : each string item points to a definition
// in Heron.ToolbarBuilder.defs. Extra options and even an item create function
// can be passed here as well. "-" denotes a separator item.
Heron.options.map.toolbar = [
    {type: "scale", options: {width: 110}},
    {type: "-"} ,
    // Add BaseLayerCombo
    {type: "baselayer", options: {width: 150, listWidth: 160}},
    {type: "-"} ,
    {type: "featureinfo", options: {
        popupWindow: {
            width: 360,
            height: 200,
            featureInfoPanel: {
                showTopToolbar: true,

                // Should column-names be capitalized? Default true.
                columnCapitalize: true,

                // displayPanels option values are 'Table' and 'Detail', default is 'Table'
                displayPanels: ['Table', 'Detail'],
                // Export to download file. Option values are 'CSV', 'XLS', default is no export (results in no export menu).
                // 'GeoPackage' needs heron.cgi with GDAL 1.1+ !!
                exportFormats: ['CSV', 'XLS', 'GMLv2', 'Shapefile', 'GeoPackage', 'GeoJSON', 'WellKnownText'],
                maxFeatures: 10
            }
        }
    }},
    {type: "-"} ,
    {type: "pan"},
    {type: "zoomin"},
    {type: "zoomout"},
    {type: "zoomvisible"},
    {type: "coordinatesearch", options: {onSearchCompleteZoom: 14, fieldLabelX: 'lon', fieldLabelY: 'lat'}},
    {type: "-"} ,
    {type: "zoomprevious"},
    {type: "zoomnext"},
  //  {type: "-"},
  //  {type: "measurelength", options: {geodesic: true}},
  //  {type: "measurearea", options: {geodesic: true}}
  //  {type: "-"},
  //  {type: "addbookmark"},
  //  {type: "help", options: {tooltip: 'Help and info for this example', contentUrl: 'help.html'}}
];
