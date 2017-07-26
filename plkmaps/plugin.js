////chart
Ext.namespace("Heron.widgets.search");
Ext.namespace("Heron.utils");
Heron.widgets.search.FeatureChartPanel = Ext.extend(Ext.Panel, {
    title: __('Feature Chart'),
    maxFeatures: 5,
    displayPanels: ['Table'],
    exportFormats: ['CSV', 'XLS', 'GMLv2', 'GeoJSON', 'WellKnownText'],
    infoFormat: 'application/vnd.ogc.gml',
    hover: false,
    drillDown: true,
    layer: "",
    discardStylesForDups: false,
    showTopToolbar: true,
    showGeometries: true,
    featureSelection: true,
    columnCapitalize: true,
    gridCellRenderers: null,
    gridColumns: null,
    autoConfigMaxSniff: 40,
    hideColumns: [],
    columnFixedWidth: 100,
    autoMaxWidth: 300,
    autoMinWidth: 45,
    pop: null,
    map: null,
    displayPanel: null,
    lastEvt: null,
    olControl: null,
    olControlWMTS: null,
    tb: null,
    noWMSFeatures: null,
    noWMTSFeatures: null,
    initComponent: function() {
        var self = this;
        Ext.apply(this, {
            layout: "fit"
        });
        this.display = this.displayFeatureInfo;
        Heron.widgets.search.FeatureInfoPanel.superclass.initComponent.call(this);
        this.map = Heron.App.getMap();
        if (!this.olControl) {
            var controls = this.map.getControlsByClass("OpenLayers.Control.WMSGetFeatureInfo");
            if (controls && controls.length > 0) {
                for (var index = 0; index < controls.length; index++) {
                    if (!controls[index].popup) {
                        this.olControl = controls[index];
                        this.olControl.infoFormat = this.infoFormat;
                        this.olControl.maxFeatures = this.maxFeatures;
                        this.olControl.hover = this.hover;
                        this.olControl.drillDown = this.drillDown;
                        break;
                    }
                }
            }
            if (!this.olControl) {
                this.olControl = new OpenLayers.Control.WMSGetFeatureInfo({
                    maxFeatures: this.maxFeatures,
                    queryVisible: true,
                    infoFormat: this.infoFormat,
                    hover: this.hover,
                    drillDown: this.drillDown
                });
                this.map.addControl(this.olControl);
            }
        }
        this.olControl.events.register("getfeatureinfo", this, this.handleGetFeatureInfo);
        this.olControl.events.register("beforegetfeatureinfo", this, this.handleBeforeGetFeatureInfo);
        this.olControl.events.register("nogetfeatureinfo", this, this.handleNoGetFeatureInfo);
        controls = this.map.getControlsByClass("OpenLayers.Control.WMTSGetFeatureInfo");
        if (controls && controls.length > 0) {
            for (var index = 0; index < controls.length; index++) {
                this.olControlWMTS = controls[0];
                if (!controls[index].popup) {
                    this.olControlWMTS = controls[index];
                    this.olControlWMTS.infoFormat = this.infoFormat;
                    this.olControlWMTS.maxFeatures = this.maxFeatures;
                    this.olControlWMTS.hover = this.hover;
                    this.olControlWMTS.drillDown = this.drillDown;
                    break;
                }
            }
        }
        if (!this.olControlWMTS) {
            this.olControlWMTS = new OpenLayers.Control.WMTSGetFeatureInfo({
                maxFeatures: this.maxFeatures,
                queryVisible: true,
                infoFormat: this.infoFormat,
                hover: this.hover,
                drillDown: this.drillDown
            });
            this.map.addControl(this.olControlWMTS);
        }
        this.olControlWMTS.events.register("getfeatureinfo", this, this.handleGetFeatureInfo);
        this.olControlWMTS.events.register("exception", this, this.handleNoGetFeatureInfo);
        this.addListener("afterrender", this.onPanelRendered, this);
        this.addListener("render", this.onPanelRender, this);
        this.addListener("show", this.onPanelShow, this);
        this.addListener("hide", this.onPanelHide, this);
    },
    onPanelRender: function() {
        this.mask = new Ext.LoadMask(this.body, {
            msg: __('Loading...')
        });
    },
    onPanelRendered: function() {
        if (this.ownerCt) {
            this.ownerCt.addListener("hide", this.onPanelHide, this);
            this.ownerCt.addListener("show", this.onPanelShow, this);
        }
    },
    onPanelShow: function() {
        if (this.tabPanel) {
            this.tabPanel.items.each(function(item) {
                return item.showLayer ? item.showLayer() : true;
            }, this);
        }
    },
    onPanelHide: function() {
        if (this.tabPanel) {
            this.tabPanel.items.each(function(item) {
                return item.hideLayer ? item.hideLayer() : true;
            }, this);
        }
    },
    initPanel: function() {
        this.lastEvt = null;
        this.expand();
        if (this.tabPanel) {
            this.tabPanel.items.each(function(item) {
                this.tabPanel.remove(item);
                return item.cleanup ? item.cleanup() : true;
            }, this);
        }
        if (this.displayPanel) {
            this.remove(this.displayPanel);
            this.displayPanel = null;
        }
        this.displayOn = false;
    },
    handleBeforeGetFeatureInfo: function(evt) {
        this.noWMSFeatures = false;
        this.noWMTSFeatures = false;
        if (evt.object !== this.olControl && evt.object !== this.olControlWMTS) {
            return;
        }
        this.olControl.layers = [];
        this.olControlWMTS.layers = [];
        this.olControl.url = null;
        this.olControl.drillDown = this.drillDown;
        this.olControlWMTS.url = null;
        this.olControlWMTS.drillDown = this.drillDown;
        var layer;
        if (this.layer) {
            var layers = this.map.getLayersByName(this.layer);
            if (layers) {
                layer = layers[0];
                if (layer instanceof OpenLayers.Layer.WMTS) {
                    this.olControlWMTS.layers.push(layer);
                } else {
                    this.olControl.layers.push(layer);
                }
            }
        }
        if (this.olControl.layers.length === 0 && this.olControlWMTS.layers.length === 0) {
            this.layerDups = {};
            for (var index = 0; index < this.map.layers.length; index++) {
                layer = this.map.layers[index];
                if ((layer instanceof OpenLayers.Layer.WMS === false && layer instanceof OpenLayers.Layer.WMTS === false) || !layer.params || layer.queryable === false) {
                    continue;
                }
                if (layer.visibility && (layer.featureInfoFormat || layer.params.INFO_FORMAT || layer.queryable)) {
                    if (!layer.params.INFO_FORMAT && layer.featureInfoFormat) {
                        layer.params.INFO_FORMAT = layer.featureInfoFormat;
                    }
                    if (layer.params.CQL_FILTER) {
                        this.olControl.requestPerLayer = true;
                        layer.params.vendorParams = {
                            CQL_FILTER: layer.params.CQL_FILTER
                        };
                    }
                    if (this.layerDups[layer.params.LAYERS] && !this.olControl.requestPerLayer) {
                        if (this.discardStylesForDups) {
                            var dupLayer = this.layerDups[layer.params.LAYERS];
                            dupLayer.savedStyles = dupLayer.params.STYLES;
                            dupLayer.params.STYLES = "";
                        }
                        continue;
                    }
                    if (layer instanceof OpenLayers.Layer.WMTS) {
                        this.olControlWMTS.layers.push(layer);
                    } else {
                        this.olControl.layers.push(layer);
                    }
                    this.layerDups[layer.params.LAYERS] = layer;
                }
            }
        }
        this.initPanel();
        if (this.mask) {
            this.mask.show();
        }
        this.fireEvent('beforefeatureinfo', evt);
        this.handleVectorFeatureInfo(evt.object.handler.evt);
        if (this.olControl.layers.length === 0) {
            this.noWMSFeatures = true;
        }
        if (this.olControlWMTS.layers.length === 0) {
            this.noWMTSFeatures = true;
        }
        if (this.noWMSFeatures && this.noWMTSFeatures && (this.features == null || this.features.length === 0)) {
            this.handleNoGetFeatureInfo();
        }
    },
    handleGetFeatureInfo: function(evt) {
        var layers = this.olControl.layers;
        if (layers) {
            for (var i = 0, len = layers.length; i < len; i++) {
                layers[i].params.vendorParams = null;
            }
        }
        if (this.discardStylesForDups) {
            for (var layerName in this.layerDups) {
                var layerDup = this.layerDups[layerName];
                if (layerDup.savedStyles) {
                    layerDup.params.STYLES = layerDup.savedStyles;
                    layerDup.savedStyles = null;
                }
            }
        }
        if (evt && evt.object !== this.olControl && evt.object !== this.olControlWMTS) {
            return;
        }
        if (this.noWMSFeatures && this.noWMTSFeatures) {
            return;
        }
        if (this.mask) {
            this.mask.hide();
        }
        if (evt) {
            this.lastEvt = evt;
        }
        if (!this.lastEvt) {
            return;
        }
        this.displayFeatures(this.lastEvt);
    },
    handleVectorFeatureInfo: function(evt) {
        this.vectorFeaturesFound = false;
        var screenX = Ext.isIE ? Ext.EventObject.xy[0] : evt.clientX;
        var screenY = Ext.isIE ? Ext.EventObject.xy[1] : evt.clientY;
        this.features = this.getFeaturesByXY(screenX, screenY);
        if (this.mask) {
            this.mask.hide();
        }
        evt.features = this.features;
        if (evt.features && evt.features.length > 0) {
            this.vectorFeaturesFound = true;
            this.displayFeatures(evt);
        }
    },
    handleNoGetFeatureInfo: function(evt) {
        if (evt && evt.object === this.olControl) {
            this.noWMSFeatures = true;
        }
        if (evt && evt.object === this.olControlWMTS) {
            this.noWMTSFeatures = true;
        }
        if (!this.visibleVectorLayers && (!evt || (this.noWMSFeatures && this.noWMTSFeatures))) {
            Ext.Msg.alert(__('Warning'), __('Feature Info unavailable (you may need to make some layers visible)'));
        }
    },
    getFeaturesByXY: function(x, y) {
        this.visibleVectorLayers = false;
        var features = [],
            targets = [],
            layers = [];
        var layer, target, feature, i, len;
        for (i = this.map.layers.length - 1; i >= 0; --i) {
            layer = this.map.layers[i];
            if (layer.div.style.display !== "none") {
                if (layer instanceof OpenLayers.Layer.Vector) {
                    target = document.elementFromPoint(x, y);
                    while (target && target._featureId) {
                        feature = layer.getFeatureById(target._featureId);
                        if (feature) {
                            var featureClone = feature.clone();
                            featureClone.type = layer.name;
                            featureClone.layer = layer;
                            features.push(featureClone);
                            target.style.display = "none";
                            targets.push(target);
                            target = document.elementFromPoint(x, y);
                            this.visibleVectorLayers = true;
                        } else {
                            target = false;
                        }
                    }
                }
                layers.push(layer);
                layer.div.style.display = "none";
            }
        }
        for (i = 0, len = targets.length; i < len; ++i) {
            targets[i].style.display = "";
        }
        for (i = layers.length - 1; i >= 0; --i) {
            layers[i].div.style.display = "block";
        }
        return features;
    },
    getFeatureType: function(feature) {
        if (feature.gml && feature.gml.featureType) {
            return feature.gml.featureType;
        }
        if (feature.fid && feature.fid.indexOf('undefined') < 0) {
            var featureType = /[^\.]*/.exec(feature.fid);
            return (featureType[0] != "null") ? featureType[0] : null;
        }
        if (feature.type) {
            return feature.type;
        }
        if (feature.attributes['_LAYERID_']) {
            return feature.attributes['_LAYERID_'];
        }
        if (feature.attributes['DINO_DBA.MAP_SDE_GWS_WELL_W_HEADS_VW.DINO_NR']) {
            return 'TNO_DINO_WELLS';
        }
        if (feature.attributes['DINO_DBA.MAP_SDE_BRH_BOREHOLE_RD_VW.DINO_NR']) {
            return 'TNO_DINO_BOREHOLES';
        }
        return __('Unknown');
    },
    getFeatureTitle: function(feature, featureType) {
        if (feature.layer) {
            return feature.layer.name;
        }
        var featureTitle = feature.layer ? feature.layer.name : featureType;
        var layers = this.map.layers;
        for (var l = 0; l < layers.length; l++) {
            var nextLayer = layers[l];
            if (!nextLayer.params || !nextLayer.visibility) {
                continue;
            }
            if (featureType.toLowerCase() == /([^:]*$)/.exec(nextLayer.params.LAYERS)[0].toLowerCase()) {
                featureTitle = nextLayer.name;
                break;
            }
        }
        return featureTitle;
    },
    displayFeatures: function(evt) {
        if (evt.features && evt.features.length > 0) {
            this.displayPanel = this.display(evt);
            this.add(this.displayPanel);
            this.displayPanel.doLayout();
            this.displayOn = true;
        } else {
            if (evt.object === this.olControl) {
                this.noWMSFeatures = true;
            }
            if (evt.object === this.olControlWMTS) {
                this.noWMTSFeatures = true;
            }
            if (!this.vectorFeaturesFound && this.noWMTSFeatures && this.noWMSFeatures) {
                this.displayPanel = this.displayInfo(__('No features found'));
                this.add(this.displayPanel);
                this.displayOn = true;
            }
        }
        if (this.getLayout() instanceof Object && this.displayOn) {
            this.getLayout().runLayout();
        }
        if (this.displayOn) {
            this.fireEvent('featureinfo', evt);
        }
    },
    displayFeatureInfo: function(evt) {
        var featureSets = {},
            featureSet, featureType, featureTitle, featureSetKey;
        if (this.tabPanel != null && !this.displayOn) {
            this.remove(this.tabPanel);
            this.tabPanel = null;
        }
        for (var index = 0; index < evt.features.length; index++) {
            var feature = evt.features[index];
            featureType = this.getFeatureType(feature);
            featureTitle = this.getFeatureTitle(feature, featureType);
            featureSetKey = featureType + featureTitle;
            if (!featureSets[featureSetKey]) {
                featureSet = {
                    featureType: featureType,
                    title: featureTitle,
                    features: []
                };
                featureSets[featureSetKey] = featureSet;
            }
            for (var attrName in feature.attributes) {
                var attrValue = feature.attributes[attrName];
                if (attrValue && typeof attrValue == 'string' && attrValue.indexOf("http://") >= 0) {
                    feature.attributes[attrName] = '<a href="' + attrValue + '" target="_new">' + attrValue + '</a>';
                }
                if (attrName.indexOf(".") >= 0) {
                    var newAttrName = attrName.replace(/\./g, "_");
                    feature.attributes[newAttrName] = feature.attributes[attrName];
                    if (attrName != newAttrName) {
                        delete feature.attributes[attrName];
                    }
                }
            }
            featureSet.features.push(feature); 
        }
        for (featureSetKey in featureSets) {
            featureSet = featureSets[featureSetKey];
            //alert(featureSetKey);
            //if (dapuss > 1) { break; }
            if (featureSet.features.length == 0) {
                continue;
            }           
                    
            var autoConfig = true;
            var columns = null;         
            var chkdata = 0;            
            var alrcode,vname,shk,fld;
            //alert(featureSet.title);
            if(featureSet.title = "แปลงที่ดินสปก."){
                for(fld in featureSet.features[0].attributes){
                    if(fld=="alrcode"){
                        alrcode = featureSet.features[0].attributes['alrcode'];
                        console.log(alrcode);
                    }                    
                }                
                chkdata = 1;
            }           
            
            //alert('vcode='+vcode+'&vname='+vname+'&vcase='+vcase);
            var ccurent = new Ext.Panel({
                title: 'งบดุลน้ำของ'+featureSet.title,
                html: '<iframe src="cwr.php?alrcode='+alrcode+'" scrolling="no" frameborder="0" style="position: relative; height: 100%; width: 100%;"></iframe>',
                cls:'empty'
                });     
            
            var panel = new Heron.widgets.search.FeaturePanel({
                title: featureSet.title,
                featureType: featureSet.featureType,
                featureSetKey: featureSetKey,
                header: false,
                features: featureSet.features,
                autoConfig: autoConfig,
                autoConfigMaxSniff: this.autoConfigMaxSniff,
                hideColumns: this.hideColumns,
                columnFixedWidth: this.columnFixedWidth,
                autoMaxWidth: this.autoMaxWidth,
                autoMinWidth: this.autoMinWidth,
                columnCapitalize: this.columnCapitalize,
                showGeometries: this.showGeometries,
                featureSelection: this.featureSelection,
                gridCellRenderers: this.gridCellRenderers,
                columns: columns,
                showTopToolbar: this.showTopToolbar,
                exportFormats: this.exportFormats,
                displayPanels: this.displayPanels,
                hropts: {
                    zoomOnRowDoubleClick: true,
                    zoomOnFeatureSelect: false,
                    zoomLevelPointSelect: 8
                }
            });
            
            if(chkdata==1){                                 
                if (!this.tabPanel) {
                    this.tabPanel = new Ext.TabPanel({
                        border: false,
                        autoDestroy: true,
                        enableTabScroll: true,
                        //items: [panel,ccurent],
                        items: [ccurent],
                        activeTab: 0
                    });
                }   
            }else{
                if (!this.tabPanel) {
                    this.tabPanel = new Ext.TabPanel({
                        border: false,
                        autoDestroy: true,
                        enableTabScroll: true,
                        items: [],
                        activeTab: 0
                    });
                } 
            }               
            
            panel.loadFeatures(featureSet.features, featureSet.featureType);
            
        }
        //alert ("dada");
        return this.tabPanel;
    },
    displayTree: function(evt) {
        var panel = new Heron.widgets.XMLTreePanel();
        panel.xmlTreeFromText(panel, evt.text);
        return panel;
    },
    displayXML: function(evt) {
        var opts = {
            html: '<div class="hr-html-panel-body"><pre>' + Heron.Utils.formatXml(evt.text, true) + '</pre></div>',
            preventBodyReset: true,
            autoScroll: true
        };
        return new Ext.Panel(opts);
    },
    displayInfo: function(infoStr) {
        var opts = {
            html: '<div class="hr-html-panel-body"><pre>' + infoStr + '</pre></div>',
            preventBodyReset: true,
            autoScroll: true
        };
        return new Ext.Panel(opts);
    }
});
Ext.reg('hr_featurechartpanel', Heron.widgets.search.FeatureChartPanel);