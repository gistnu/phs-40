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
/** This config assumes the DefaultOptionsWorld.js to be included first!! */
/** chingchai humhong (chingchaih@nu.ac.th) **/

Ext.namespace("Heron.options.map.settings");

/** api: example[sublayers]
 *  Sublayers
 *  ---------
 *  Layers, each with data-subset via filtering from single WMS/WFS Layer.
 */

// Alter some map settings in order that USA is displayed in center
Heron.options.map.settings.center = '11141190.727,1458223.243';
Heron.options.map.settings.zoom = 6;


// Without default bottom status bar.
Heron.options.map.statusbar = null;

/*
 * Add extra Layers to the config options in DefaultOptionsWorld.js. Each Layer shows a subset
 * of the Layer "USA States (Opengeo)" data based on the "population" attribute (called 'DP0010001').
 * SLD RULEs are selected together with CQL.
 * The SLD for states is at
 * https://github.com/boundlessgeo/suite-data/blob/master/default/styles/states.sld
 */

 /*
  * ====================================================================
  *                               BaseLayers
  * ====================================================================
  */

Heron.options.map.layers = [
    new OpenLayers.Layer.Google(
            "Google Streets", // the default
            {type: google.maps.MapTypeId.ROADMAP, visibility: true},
            {singleTile: false, buffer: 0, isBaseLayer: true}
    ),
    new OpenLayers.Layer.Google(
            "Google Satellite",
            {type: google.maps.MapTypeId.SATELLITE, visibility: false},
            {singleTile: false, buffer: 0, isBaseLayer: true}
    ),
    new OpenLayers.Layer.Google(
            "Google Hybrid",
            {type: google.maps.MapTypeId.HYBRID, visibility: false},
            {singleTile: false, buffer: 0, isBaseLayer: true}
    ),
    new OpenLayers.Layer.Google(
            "Google Terrain",
            {type: google.maps.MapTypeId.TERRAIN, visibility: false},
            {singleTile: false, buffer: 0, isBaseLayer: true}
    ),
    new OpenLayers.Layer.Image(
        "None",
        Ext.BLANK_IMAGE_URL,
        OpenLayers.Bounds.fromString(Heron.options.map.settings.maxExtent),
        new OpenLayers.Size(10, 10),
        {resolutions: Heron.options.map.settings.resolutions, isBaseLayer: true, visibility: false, displayInLayerSwitcher: true, transitionEffect: 'resize'}
    ),

    /*
     * ====================================================================
     *                                OVERLAYS
     * ====================================================================
     */

    new OpenLayers.Layer.WMS(
        "eng53",
        'http://www2.cgistln.nu.ac.th/occupation/ows?',
        {layers: "occupation:eng53", transparent: true, format: 'image/png'},
        {singleTile: false, opacity: 0.9, isBaseLayer: false, visibility: false, noLegend: false,
        featureInfoFormat: 'application/vnd.ogc.gml', transitionEffect: 'null', metadata: {
            wfs: {
                protocol: 'fromWMSLayer',
                downloadFormats: Heron.options.wfs.downloadFormats
            }
        }}
      ),
      new OpenLayers.Layer.WMS(
          "eng54",
          'http://www2.cgistln.nu.ac.th/occupation/ows?',
          {layers: "occupation:eng54", transparent: true, format: 'image/png'},
          {singleTile: false, opacity: 0.9, isBaseLayer: false, visibility: false, noLegend: false,
          featureInfoFormat: 'application/vnd.ogc.gml', transitionEffect: 'null', metadata: {
              wfs: {
                  protocol: 'fromWMSLayer',
                  downloadFormats: Heron.options.wfs.downloadFormats
              }
          }}
        ),
        new OpenLayers.Layer.WMS(
            "nurse53",
            'http://www2.cgistln.nu.ac.th/occupation/ows?',
            {layers: "occupation:nurse53", transparent: true, format: 'image/png'},
            {singleTile: false, opacity: 0.9, isBaseLayer: false, visibility: false, noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml', transitionEffect: 'null', metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    downloadFormats: Heron.options.wfs.downloadFormats
                }
            }}
          ),
          new OpenLayers.Layer.WMS(
              "nurse54",
              'http://www2.cgistln.nu.ac.th/occupation/ows?',
              {layers: "occupation:nurse54", transparent: true, format: 'image/png'},
              {singleTile: false, opacity: 0.9, isBaseLayer: false, visibility: false, noLegend: false,
              featureInfoFormat: 'application/vnd.ogc.gml', transitionEffect: 'null', metadata: {
                  wfs: {
                      protocol: 'fromWMSLayer',
                      downloadFormats: Heron.options.wfs.downloadFormats
                  }
              }}
            )
];

/*
 * ====================================================================
 *                                Layers tree
 * ====================================================================
 */

Ext.namespace("Heron.options.layertree");

Heron.options.layertree.tree = [
    {
        text: 'BaseLayers', expanded: true, children: [
        {nodeType: "gx_layer", layer: "Google Streets", text: 'Google Streets' },
        {nodeType: "gx_layer", layer: "Google Satellite", text: 'Google Satellite' },
        {nodeType: "gx_layer", layer: "Google Hybrid", text: 'Google Hybrid' },
        {nodeType: "gx_layer", layer: "Google Terrain", text: 'Google Terrain' },
        {nodeType: "gx_layer", layer: "None", text: 'None' }
    ]
    },{
        text: 'คณะวิศวกรรมศาสตร์',
        nodeType: 'hr_cascader',
        expanded: true,
        children: [
                      { text: 'รายจังหวัด',
                        expanded: false,
                        children: [
                                    {nodeType: "gx_layer", layer: "nurse53", text: "บัณฑิตคณะพยาบาลศาสตร์ที่มีงานทำปี 53", legend: true, iconCls:'bullet'},
                                    {nodeType: "gx_layer", layer: "nurse54", text: "บัณฑิตคณะพยาบาลศาสตร์ที่มีงานทำปี 54", legend: true, iconCls:'bullet'}
                                  ]
                      },{
                        text: 'รายอำเภอ',
                        expanded: false,
                        children: [
                                    {nodeType: "gx_layer", layer: "eng53", text: "บัณฑิตคณะวิศวกรรมศาสตร์ที่มีงานทำปี 53", legend: true, iconCls:'bullet'},
                                    {nodeType: "gx_layer", layer: "eng54", text: "บัณฑิตคณะวิศวกรรมศาสตร์ที่มีงานทำปี 54", legend: true, iconCls:'bullet'}
                                  ]
                        }
                  ]
    }
];

/*
 * ====================================================================
 *                                Panal
 * ====================================================================
 */

Heron.layout = {
    xtype: 'panel',

    /* Optional ExtJS Panel properties here, like "border", see ExtJS API docs. */
    id: 'hr-container-main',
    layout: 'border',
    border: false,

    /** Any classes in "items" and nested items are automatically instantiated (via "xtype") and added by ExtJS. */
    items: [
        {
            xtype: 'panel',
            id: 'hr-menu-left-container',
            layout: 'accordion',
            region: "west",
            width: 270,
            collapsible: false,
            border: true,
            items: [
                {
                    xtype: 'hr_layertreepanel',
                    border: false,

                    // The LayerTree tree nodes appearance: default is ugly ExtJS document icons
                    // Other values are 'none' (no icons). May be overridden in specific 'gx_layer' type config.
                    layerIcons: 'none',
                    layerIcons: 'bylayertype',

                    contextMenu: [
                        {
                            xtype: 'hr_layernodemenulayerinfo'
                        },
                        {
                            xtype: 'hr_layernodemenuzoomextent'
                        },
                        {
                            xtype: 'hr_layernodemenustyle'
                        },
                        {
                            xtype: 'hr_layernodemenuopacityslider'
                        }
                    ],
                    // Optional, use internal default if not set
                    hropts: Heron.options.layertree
                }
            ]
        },
        {
            xtype: 'panel',
            id: 'hr-map-and-info-container',
            layout: 'border',
            region: 'center',
            width: '100%',
            collapsible: false,
            split: false,
            border: false,
            items: [
                {
                    xtype: 'hr_mappanel',
                    id: 'hr-map',
                    title: '&nbsp;River width',
                    region: 'center',
                    collapsible: false,
                    border: false,
                    hropts: Heron.options.map
                }
            ]
        }
    ]

};
