var portfolioApp = angular.module('shopApp',[]);

portfolioApp.controller('shopCtrl', function($scope) {

    var showArchived = false;

    $scope.items = [{
        title: 'carrot',
        price: 2.5,
        category: 'vegetables',
        cart: false
    },{
        title: 'tomato',
        price: 5.5,
        category: 'vegetables',
        cart: false
    },{
        title: 'potato',
        price: 1.5,
        category: 'vegetables',
        cart: false
    }];

    $scope.categories = [];
    $scope.orderProp = $scope.categories[0];

    $scope.categoriesContain = function (category) {
        for (cat of $scope.categories) {
            if (cat == category)
                return true;
        }
        return false;
    };

    $scope.setCategories = function () {
        $scope.categories = [];
        for (item of $scope.items) {
            if(!$scope.categoriesContain(item.category)){
                $scope.categories.push(item.category)
            }
        }
    };

    $scope.setCategories();

    $scope.cart = [];

    $scope.addItem = function addItem() {
        var title = $('#item-title')[0].value;
        var price = $('#item-price')[0].value;
        var category = $('#item-category')[0].value;

        if(title.length < 1 || price.length < 1 || category.length < 1)
            return;

        $scope.items.push({
            title: title,
            price: price,
            category: category,
            cart: false
        })

        $('#item-title')[0].value = '';
        $('#item-price')[0].value = '';
        $('#item-category')[0].value = '';
        $scope.setCategories();
    };

    $scope.categoryFilter = function(item) {
        if($('#category-picker')[0].value == "?") {
            return true;
        } else if(item.category == $('#category-picker')[0].value.split(":")[1]) {
            return true
        }

        return false;
    };

    $scope.addOrRemoveCart = function addOrRemoveCart(title) {
        for (item of $scope.items) {
            if(item.title == title) {
                item.basket = !item.basket;
                if(item.basket)
                    $('#button-' + title)[0].className = "btn btn-danger right"
                else
                    $('#button-' + title)[0].className = "btn btn-default right"
            }
        }
    };

    $scope.showHideArchived = function() {
        showArchived = !showArchived;
    };

    $scope.activeItems = function activeItems(clientName) {
        var active = 0;
        for (client of $scope.clients) {
            if (client.name == clientName) {
                for (item of client.shopping_list) {
                    if(item.checked != true) {
                        active++;
                    }
                }
            }
        }
        return active;
    };

    $scope.allItems = function allItems(clientName) {
        for (client of $scope.clients) {
            if (client.name == clientName) {
               return client.shopping_list.length
            }
        }
    };

});
