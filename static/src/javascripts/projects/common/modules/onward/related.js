define([
    'bonzo',
    'qwery',
    'lodash/arrays/intersection',
    'lodash/collections/map',
    'common/utils/$',
    'common/utils/config',
    'common/utils/mediator',
    'common/modules/analytics/register',
    'common/modules/lazyload',
    'common/modules/ui/expandable',
    'common/modules/ui/images'
], function (
    bonzo,
    qwery,
    intersection,
    map,
    $,
    config,
    mediator,
    register,
    LazyLoad,
    Expandable,
    images
) {

    var opts;

    function Related(options) {
        opts = options || {};
    }

    Related.overrideUrl = '';

    Related.setOverrideUrl = function (url) {
        Related.overrideUrl = url;
    };

    Related.prototype.popularInTagOverride = function () {
        // whitelist of tags to override related story component with a popular-in-tag component
        if (!config.page.keywordIds) {
            return false;
        }
        var whitelistedTags = [ // order matters here (first match wins)
                // sport tags
                'sport/cricket', 'sport/rugby-union', 'sport/rugbyleague', 'sport/formulaone',
                'sport/tennis', 'sport/cycling', 'sport/motorsports', 'sport/golf', 'sport/horse-racing',
                'sport/boxing', 'sport/us-sport', 'sport/australia-sport',
                // football tags
                'football/championsleague', 'football/premierleague', 'football/championship',
                'football/europeanfootball', 'football/world-cup-2014',
                // football team tags
                'football/manchester-united', 'football/chelsea', 'football/arsenal',
                'football/manchestercity', 'football/tottenham-hotspur', 'football/liverpool'
            ],
            pageTags      = config.page.keywordIds.split(','),
            // if this is an advertisement feature, use the page's keyword (there'll only be one)
            popularInTags = config.page.isAdvertisementFeature ? pageTags : intersection(whitelistedTags, pageTags);

        if (popularInTags.length) {
            return '/popular-in-tag/' + popularInTags[0] + '.json';
        }
    };

    Related.prototype.renderRelatedComponent = function () {
        var relatedUrl, popularInTag, componentName, container,
            fetchRelated = config.switches.relatedContent && config.switches.ajaxRelatedContent && config.page.showRelatedContent;

        if (config.page && config.page.hasStoryPackage && !Related.overrideUrl) {
            new Expandable({
                dom: document.body.querySelector('.related-trails'),
                expanded: false,
                showCount: false
            }).init();
            mediator.emit('modules:related:loaded');

        } else if (fetchRelated) {

            container = document.body.querySelector('.js-related');
            if (container) {
                popularInTag = this.popularInTagOverride();
                componentName = (!Related.overrideUrl && popularInTag) ? 'related-popular-in-tag' : 'related-content';
                register.begin(componentName);

                container.setAttribute('data-component', componentName);

                relatedUrl = Related.overrideUrl || popularInTag || '/related/' + config.page.pageId + '.json';

                if (opts.excludeTags) {
                    relatedUrl += '?' + map(opts.excludeTags, function (tag) {
                        return 'exclude-tag=' + tag;
                    }).join('&');
                }

                new LazyLoad({
                    url: relatedUrl,
                    container: container,
                    success: function () {
                        if (Related.overrideUrl) {
                            if (config.page.hasStoryPackage) {
                                $('.more-on-this-story').addClass('u-h');
                            }
                        }

                        var relatedTrails = container.querySelector('.related-trails');
                        new Expandable({dom: relatedTrails, expanded: false, showCount: false}).init();
                        // upgrade images
                        images.upgrade(relatedTrails);
                        mediator.emit('modules:related:loaded');
                        register.end(componentName);
                    },
                    error: function () {
                        bonzo(container).remove();
                        register.error(componentName);
                    }
                }).load();
            }
        } else {
            $('.js-related').addClass('u-h');
        }
    };

    return Related;
});
