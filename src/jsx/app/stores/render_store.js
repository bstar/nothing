(function(Reflux, RenderActions, global) {
    'use strict';

    // some variables and helpers for our fake database stuff
    var RenderCounter = 0,
        localStorageKey = "renders";

    function getItemByKey(list,itemKey){
        return _.find(list, function(item) {
            return item.key === itemKey;
        });
    }

    global.renderListStore = Reflux.createStore({
        // this will set up listeners to all publishers in RenderActions, using onKeyname (or keyname) as callbacks
        listenables: [RenderActions],

        // this will be called by all listening components as they register their listeners
        getInitialState: function() {
            var loadedList = localStorage.getItem(localStorageKey);
            if (!loadedList) {
                // If no list is in localstorage, start out with a default one
                this.list = [{
                    key: renderCounter++,
                    created: new Date(),
                    isComplete: false,
                    label: 'Rule the web'
                }];
            } else {
                this.list = _.map(JSON.parse(loadedList), function(item) {
                    // just resetting the key property for each render item
                    item.key = renderCounter++;
                    return item;
                });
            }
            return this.list;
        }
    });

})(window.Reflux, window.RenderActions, window);
