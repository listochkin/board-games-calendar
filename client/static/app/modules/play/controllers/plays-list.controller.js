define(function(require) {
    'use strict';

    PLaysListController.$inject = ['plays', 'playsCount', '$rootScope',
        '$location', '$route', '$scope', 'dgPlayService'];
    getPlaysData.$inject = ['$route', '$rootScope', 'dgPlayService'];
    getPlaysCount.$inject = ['$route','$rootScope', 'dgPlayService'];

    PLaysListController.resolver = {
        getPlaysData: getPlaysData,
        getPlaysCount: getPlaysCount
    };

    return PLaysListController;

    function PLaysListController(plays, playsCount, $rootScope,
                                 $location, $route, $scope, dgPlayService) {

        $rootScope.$emit('dg:globalLoader:hide');
        var cleanEvents = $rootScope.$on('dg:plays:reload', reloadList);
        $scope.$on('$destroy', cleanEvents);

        var vm = this,
            searchParams = $location.search();

        vm.plays = plays;
        vm.data = {};
        vm.data.search = searchParams.search;
        vm.data.currentPage = $route.current.params.pageId || 1;
        vm.data.onlyMyPlays = $route.current.params.onlyMy || 0;
        vm.data.includeOldPlays = $route.current.params.includeOld || 0;
        vm.doSearch = doSearch;
        vm.pageChanged = pageChanged;
        vm.onJoinClick = onJoinClick;
        vm.reloadList = reloadList;
        vm.tillNow = tillNow;
        vm.playsCount = playsCount.data.count;
        vm.descriptionLimit = 150;

        function doSearch() {

            var data = {
                page: 1
            };
            if(vm.data.onlyMyPlays) {
                data.onlyMy = vm.data.onlyMyPlays;
            }
            if(vm.data.includeOldPlays) {
                data.includeOld = vm.data.includeOldPlays;
            }
            if(vm.data.search) {
                data.search = vm.data.search;
            }
        }
        
        function pageChanged() {
            $location.path('/plays/page/'+vm.data.currentPage);
        }


        function reloadList(){
            dgPlayService.getPlays({
                page: $route.current.params.pageId || 1,
                search: $route.current.params.search,
                onlyMy: $route.current.params.onlyMy || 0,
                includeOld: $route.current.params.includeOld || 0
            }).then(function(plays){
                vm.plays = plays;
            });
        }

        function onJoinClick(play) {
            $rootScope.$emit('dg:play:join', play._id);
        }
        function tillNow(targetDate){
            return (new Date(targetDate)).getTime() <= (new Date()).getTime()
        }
    }


    function getPlaysData($route, $rootScope, dgPlayService) {
        $rootScope.$emit('dg:globalLoader:show');

        return dgPlayService.getPlays({
            page: $route.current.params.pageId || 1,
            search: $route.current.params.search,
            onlyMy: $route.current.params.onlyMy || 0,
            includeOld: $route.current.params.includeOld || 0
        });
    }


    function getPlaysCount($route, $rootScope, dgPlayService) {
        $rootScope.$emit('dg:globalLoader:show');

        return dgPlayService.getPlaysCount({
            search: $route.current.params.search,
            onlyMy: $route.current.params.onlyMy || 0,
            includeOld: $route.current.params.includeOld || 0
        });
    }

});