/**
 * Created by arif on 12/5/16.
 */

function myCtrl($scope, $http) {
    console.log('hello world from controller');

    $scope.loginData = function () {
        console.log('loginData calling');
        var queryLogin = {
            "username":"uitest",
            "password":"4e4beaf2814d37645b5261ec117e96c5"
        };
        console.log('queryLogin',queryLogin);
        $http.post('http://oganesson.vpc.sigtuple.com/test/api/auth/signin', queryLogin).success(function (result) {
            console.log('auth token' + JSON.stringify(result));

        });
    };


    $scope.driver = {
        department : []
    };
    console.log('$scope.country',$scope.country);
    $scope.selectCities=function (key) {
        $scope.cities=$scope.countries[key];
        console.log('cities',$scope.cities);
    };
    var refresh = function () {
        $http.get('/driverlist').success(function (res) {
            //console.log('i recieved data what i reqiusted');
            //console.log('i recieved data what i reqiusted' + JSON.stringify(res));
            $scope.driverlist = res;
            console.log('$scope.driverlist' + JSON.stringify($scope.driverlist));
        });
    }
    refresh();
    $scope.AddDetails = function () {
        console.log(' top $scope.driver.name' + JSON.stringify($scope.driver.name));
        if($scope.driver.name === undefined){
            console.log('bottom $scope.driver.name' + JSON.stringify($scope.driver.name));
            $scope.errormessage = "name is required";
            console.log('errormessage',JSON.stringify($scope.errormessage));
            return
        }
        if($scope.driver.address === undefined){
            console.log('bottom $scope.driver.name' + JSON.stringify($scope.driver.name));
            $scope.errormessage = "address is required";
            console.log('errormessage',JSON.stringify($scope.errormessage));
            return
        }
        if($scope.driver.email === undefined){
            console.log('bottom $scope.driver.name' + JSON.stringify($scope.driver.name));
            $scope.errormessage = "email is required";
            console.log('errormessage',JSON.stringify($scope.errormessage));
            return
        }
        if($scope.driver.contact === undefined){
            console.log('bottom $scope.driver.name' + JSON.stringify($scope.driver.name));
            $scope.errormessage = "contact Number  is required";
            console.log('errormessage',JSON.stringify($scope.errormessage));
            return
        }
        if($scope.driver.gpa > 4 ){
            console.log('gpg' + JSON.stringify($scope.driver.gpa));
            $scope.errormessage = "GPA should be less than 4";
            console.log('errormessage',JSON.stringify($scope.errormessage));
            return

        }



        console.log('data' + JSON.stringify($scope.driver));
        $http.post('/driverlist', $scope.driver).success(function (result) {
            console.log('result' + JSON.stringify(result));
            $scope.driver = ''
            errormessage = ''
            refresh();
        })
    }

    $scope.remove = function (driver) {
        console.log('driver' + JSON.stringify(driver._id));
        $http.delete('/driverlist/' + driver._id).success(function (data) {
            console.log('data removed' + JSON.stringify(data));
            refresh();
        })
    }
    $scope.hobs ='';
    $scope.addNewValues = function(){
        console.log(' $scope.hobs=======' + JSON.stringify($scope.hobs));

        $scope.driver.department = $scope.hobs;
        console.log('final : ' + JSON.stringify($scope.driver));
    }
    $scope.department = [{name : 'mechanical',value : false},{name : 'electronics', value : false},{name : 'computer science',value : false},
        {name : 'mathematics',value : false},{name : 'physics',value : false},{name : 'chemical',value : false}];
    $scope.Edit = function (id) {

        $http.get('/driverlist/' + id).success(function (data1) {

            $scope.driver = data1;
            for(var i =0 ; i < $scope.department.length ; i++){
                console.log('$scope.hobby[i].name : ' + JSON.stringify($scope.department[i].name));
                $scope.hobs = $scope.driver.department;
                if($scope.driver.department.indexOf($scope.hobby[i].name) > -1){
                    console.log('if : ' + JSON.stringify($scope.hobby[i]));
                    $scope.hobby[i].value = true;
                }else{
                    console.log('else : ' + JSON.stringify($scope.hobby[i]));
                    $scope.hobby[i].value = false;
                }
            }

            console.log('end $scope.hobby ========' + JSON.stringify($scope.hobby))
            $scope.cities=$scope.countries[$scope.driver.country];
        })
    }

    $scope.update = function () {
        console.log('$scope.driver._id' + JSON.stringify($scope.driver._id, $scope.driver))
        $http.put('/driverlist/' + $scope.driver._id, $scope.driver).success(function (tttt) {
            refresh();
        })
        $scope.driver = ''
    }

    $scope.clear = function () {
        $scope.driver = ''
    }





}
