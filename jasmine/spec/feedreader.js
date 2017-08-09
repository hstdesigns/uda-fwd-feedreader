/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */

        // check the allFeeds array is not empty
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // verify defined vars
        it('urls are defined', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        // verify defined vars
        it('names are defined', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });

    // test the menu functionality
    describe('The menu', function () {
        /* test that ensures the menu element is
         * hidden by default.
         */
        it('element is hidden by default', function () {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /* test that ensures the menu changes
         * visibility when the menu icon is clicked.
         */
        it("ensures the menu changes visibility", function () {
            menuIcon = $('.menu-icon-link');
            $(menuIcon).trigger('click');
            expect($('body').hasClass('menu-hidden')).toBeFalsy();
            $(menuIcon).trigger('click');
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });
    });

    // test suite named "Initial Entries"
    describe("Initial Entries", function () {
        /* test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */

        // this is a temp var to compare the content of feed #0 with feed #1
        var feedContent0 = '';

        // reset .feed content and reload feed 0
        beforeEach(function (done) {
            //console.group('testing beforeEach');
            //console.log('begin callbacks...');

            // reset .feed content
            $('.feed').empty();
            
            // load feed #0
            loadFeed(0, function () {
                //console.log('done A');

                // check if # of entries > 0
                expect($('.feed .entry').length).not.toBe(0);
                // save the html content -> will be needed for the next test
                feedContent0 = $('.feed .entry').html();
                
                // load feed #1
                loadFeed(1, function () {
                    //console.log('done B');
                    done();
                });
            });

            //console.log('end callbacks...');
            //console.groupEnd();
        });

        // check whether the .feed class content changed
        it('the content actually changes', function () {
            //console.log('done C');
            expect($('.feed .entry').html()).not.toBe(feedContent0);
        });
    });

}());
