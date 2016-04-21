.controller('MainCtrl', function($scope){
  $scope.categories = [
    {"id": 0, "name": "Development"},
    {"id": 1, "name": "Design"},
    {"id": 2, "name": "Excercise"},
    {"id": 3, "name": "Humor"}
  ];

  $scope.bookmarks = [
    {"id": 0, "title": "AngularJS", "url": "http://angularjs.org", "category": "Development"},
    {"id": 1, "title": "AngularJS", "url": "http://angularjs.org", "category": "Development"},
    {"id": 2, "title": "A List Apart", "url": "http://alistapart.com/", "category": "Design"},
    {"id": 3, "title": "One Page Love", "url": "http://onepagelove.com/", "category": "Development"},
    {"id": 4, "title": "MobilityWOD", "url": "http://mobilitywod.com/", "category": "Development"},
    {"id": 5, "title": "Robb Wolf", "url": "http://robbwolf.com/", "category": "Excercise"},
    {"id": 6, "title": "Senor Gif", "url": "http://memebase.cheezburger.com/senorgif", "category": "Humor"},
    {"id": 7, "title": "Wimp", "url": "http://wimp.com/", "category": "Humor"},
    {"id": 8, "title": "Dump", "url": "http://dump.com/", "category": "Humor"}
  ];
  $scope.currentCategory = null;

  function setCurrentCategory(category) {
    $scope.currentCategory = category;
    cancelCreating();
    cancelEditing();
  }

  function isCurrentCategory(category) {
    return $scope.currentCategory !== null && category.name === $scope.currentCategory.name;
  }

  //Must attach $scope like below to functions to make them available in the view!!!
  $scope.setCurrentCategory = setCurrentCategory;
  $scope.isCurrentCategory = isCurrentCategory;
  //--------------------------------------------------------------------
  // CRUD (Create, Update, Delete)
  //--------------------------------------------------------------------
  function resetCreateForm() {
    $scope.newBookmark = {
      title: '',
      url: '',
      category: $scope.currentCategory
    };
  }

  function createBookmark(bookmark) {
    bookmark.id = $scope.bookmarks.length; //CHANGE THIS LATER!
    $scope.bookmarks.push(bookmark);
    resetCreateForm();
  }

  $scope.editedBookmark = null;

  function setEditedBookmark(bookmark) {
    $scope.editedBookmark = angular.copy(bookmark);
  }

  function updateBookmark(bookmark) {
    var index = _.findIndex($scope.bookmarks, function(b) {
      return b.id === bookmark.id;
    });
    $scope.bookmarks[index] = bookmark;

    $scope.editedBookmark = null;
    $scope.isEditing = false;
  }

  function isSelectedBookmark(bookmarkId) {
    return $scope.editedBookmark !== null && $scope.editedBookmark.id === BookmarkId;
  }

  $scope.setEditedBookmark = setEditedBookmark;
  $scope.updateBookmark = updateBookmark;
  $scope.isSelectedBookmark = isSelectedBookmark;

  function deleteBookmark(bookmark) {
    _.remove($scope.bookmarks, function(b) {
      return b.id === bookmark.id;
    });
  }

  $scope.deleteBookmark = deleteBookmark;
  //--------------------------------------------------------------------
  // CREATING AND EDITING STATES
  //--------------------------------------------------------------------
  $scope.isCreating = false;
  $scope.isEditing = false;

  function startCreating() {
    $scope.isCreating = true;
    $scope.isEditing = false;

    resetCreateForm();
  }




  function cancelCreating() {
    $scope.isCreating = false;
  }

  function startEditing() {
    $scope.isCreating = false;
    $scope.isEditing = true;
  }

  function cancelEditing() {
    $scope.isEditing = false;
  }

  function shouldShowCreating() {
    return $scope.currentCategory && !$scope.isEditing;
  }

  function shouldShowEditing() {
    return $scope.isEditing && !$scope.isCreating;
  }
  //DON'T FORGET TO ATTACH METHODS TO $scope to make available to view!!!!
  $scope.startCreating = startCreating;
  $scope.cancelCreating = cancelCreating;
  $scope.createBookmark = createBookmark;
  $scope.startEditing = startEditing;
  $scope.cancelEditing = cancelEditing;
  $scope.shouldShowCreating = shouldShowCreating;
  $scope.shouldShowEditing = shouldShowEditing;
});









