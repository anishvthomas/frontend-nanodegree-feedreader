/* feedreader.js
*
* This is the spec file that Jasmine will read and contains
* all of the tests that will be run against your application.
*/

/* We're placing all of our tests within the $() function,
* since some of these tests may require DOM elements. We want
* to ensure they don't run until the DOM is ready.
*/
$(function() {
  /* This is our first test suite - a test suite just contains
  * a related set of tests. This suite is all about the RSS
  * feeds definitions, the allFeeds variable in our application.
  */
  describe('RSS Feeds', function() {
    /* This is our first test - it tests to make sure that the
    * allFeeds variable has been defined and that it is not
    * empty. Experiment with this before you get started on
    * the rest of this project. What happens when you change
    * allFeeds in app.js to be an empty array and refresh the
    * page?
    */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });


    /* loops through each feed in the allFeeds object
    * and ensures it has a URL defined  and that the URL is not empty.
    */
    it('URL defined',function(){
      var len = allFeeds.length;
      var i=0;
      var url;
      while(i<len){
        url = allFeeds[i].url;
        expect(url).toBeDefined();
        expect(url.length).not.toBe(0);
        i++;
      }
    });

    /* loops through each feed in the allFeeds object
    * and ensures it has a name defined and that the name is not empty.
    */
    it('name defined',function(){
      var len = allFeeds.length;
      var i=0;
      var name;
      while(i<len){
        name = allFeeds[i].name;
        expect(name).toBeDefined();
        expect(name.length).not.toBe(0);
        i++;
      }
    });

  });

  describe('The menu',function(){

    /* ensures the menu element is hidden by default.
    */
    it('menu is hidden',function(){
      expect($('body').hasClass('menu-hidden')).toBe(true);
    });

    /* ensures the menu changes visibility
    * when the menu icon is clicked.
    */
    it('menu is clicked',function(){
      $('a.menu-icon-link').trigger('click');
      expect($('body').hasClass('menu-hidden')).toBe(false);
      $('a.menu-icon-link').trigger('click');
      expect($('body').hasClass('menu-hidden')).toBe(true);
    });
  });

  describe('Initial Entries',function(){

    /* when the loadFeed function is called and completes its work,
    * there is at least a single .entry element within the .feed container.
    */
    var entry;
    beforeEach(function(done){
      loadFeed(0,done);
    });
    it('Feed is loaded with at least one entry',function(done){
      entry = $('.feed .entry');
      expect(entry).toBeDefined();
      done();
    });
  });

  describe('New Feed Selection',function(){

    /* Checks that when a new feed is loaded by the loadFeed function
    * that the content actually changes.
    */
    var entries,firstEntryItem,secondEntryItem;
    beforeEach(function(done){
      loadFeed(0,done);
    });
    it('Feed content changes',function(done){
      entries = $('.feed .entry');
      firstEntryItem=entries[0].innerText;
      loadFeed(1,function (){
        entries = $('.feed .entry');
        secondEntryItem=entries[0].innerText;
        expect(firstEntryItem).not.toEqual(secondEntryItem);
        done();
      });
    });
  });
}());
