const fs = require('fs')
let apiKey = ''

try {
  apiKey = fs.readFileSync(__dirname + '/apiKey', 'utf8')
} catch(error) {
  console.log(error.stack)
}

let baseLink = 'http://version1.api.memegenerator.net/'

let endpoints = {}
endpoints.commentCreate = '/Comment_Create'
/*
Description

Post a comment to an instance. Use entityName=Instance for instance, with entityID=[instanceID].

Parameters

sessionKey - A logged in user session key. Use MgUser_Login to get a session key.
optional

entityName - Use 'Instance' for instances or 'Generator' for generators.

entityID - For entityName=Instance, the entityID would be the instanceID.

parentCommentID - The comment whose child comments we're interested in.

optional

text - Some text.


Example

http://version1.api.memegenerator.net//Comment_Create?entityName=Instance&entityID=72628355&parentCommentID=&text=first post best post&apiKey=demo
 */

endpoints.commentDelete = '/Comment_Delete'
/*
Description

Delete a comment, will only work if the user has created it or is admin.

Parameters

sessionKey - A logged in user session key. Use MgUser_Login to get a session key.
optional

commentID - The ID of the comment.


Example

http://version1.api.memegenerator.net//Comment_Delete?commentID=-1&apiKey=demo
 */

endpoints.commentSelect = '/Comments_Select'
/*
Description

Returns all the comments for a specific entity. Use entityName=Instance for instance, with entityID=[instanceID].

Parameters

sessionKey - A logged in user session key. Use MgUser_Login to get a session key.
optional

entityName - Use 'Instance' for instances or 'Generator' for generators.

entityID - For entityName=Instance, the entityID would be the instanceID.

parentCommentID - The comment whose child comments we're interested in.
optional


Example

http://version1.api.memegenerator.net//Comments_Select?entityName=Instance&entityID=72628355&parentCommentID=&apiKey=demo
 */

endpoints.contentFlagCreate = '/ContentFlag_Create'
/*
Description

Flag content for removal, for cases of harassment etc.

Parameters

sessionKey - A logged in user session key. Use MgUser_Login to get a session key.
optional

contentUrl - The URL on the website which contains the offending content.

reason - A short description of why the content should be removed.

email - Email address for notification of removal.


Example

http://version1.api.memegenerator.net//ContentFlag_Create?contentUrl=https://memegenerator.net/John-Doe&reason=personal information exposed&email=email@domain.com&apiKey=demo
 */

endpoints.generatorCreate = '/Generator_Create'
/*
Description

Create a new generator.

Parameters

sessionKey - A logged in user session key. Use MgUser_Login to get a session key.
optional

image - Image url or HTTP posted file.

displayName - The display name of the requested generator, e.g. 'Insanity Wolf'.


Example

http://version1.api.memegenerator.net//Generator_Create?image=https://cdn.meme.am/images/983.jpg&displayName=Insanity Wolf&apiKey=demo
 */

endpoints.generatorSelectByUrlNameOrGeneratorID = '/Generator_Select_ByUrlNameOrGeneratorID'
/*
Description

Returns information about a specific generator, either by its [generatorID] or by its [urlName].

Parameters

sessionKey - A logged in user session key. Use MgUser_Login to get a session key.
optional

generatorID - The GeneratorID of the generator as received from any of the Generators_Select_* methods.
optional

urlName - The URL name of the requested generator, e.g. 'Insanity-Wolf'. Leave as [null] to show all the generators.


Example

http://version1.api.memegenerator.net//Generator_Select_ByUrlNameOrGeneratorID?generatorID=45&urlName=Insanity-Wolf&apiKey=demo
 */

endpoints.generatorsSearch = '/Generators_Search'
/*
Description

Returns a list of search results by the search keyword [q].

Parameters

sessionKey - A logged in user session key. Use MgUser_Login to get a session key.
optional

q - The search query.

pageIndex - Page index of the requested result set. Defaults to 0 if not specified.

pageSize - Page size of the requested result set. Defaults to 12 if not specified.


Example

http://version1.api.memegenerator.net//Generators_Search?q=insanity&pageIndex=0&pageSize=12&apiKey=demo
 */

endpoints.generatorsSelectByMgUser = '/Generators_Select_ByMgUser'
/*
Description

Returns generators created by a particular user.

Parameters

sessionKey - A logged in user session key. Use MgUser_Login to get a session key.
optional

byMgUserID - The ID of the user that created the content.

pageIndex - Page index of the requested result set. Defaults to 0 if not specified.

pageSize - Page size of the requested result set. Defaults to 12 if not specified.


Example

http://version1.api.memegenerator.net//Generators_Select_ByMgUser?byMgUserID=1&pageIndex=0&pageSize=12&apiKey=demo
 */

endpoints.generatorsSelectByNew = '/Generators_Select_ByNew'
/*
Description

Returns the most recently created generators. This list gets updated whenever the website moderators approve another batch of generators to appear on the website. Some generators may not be approved due to poor quality, nsfw content, etc, so this list is highly selective.

Parameters

sessionKey - A logged in user session key. Use MgUser_Login to get a session key.
optional

pageIndex - Page index of the requested result set. Defaults to 0 if not specified.

pageSize - Page size of the requested result set. Defaults to 12 if not specified.


Example

http://version1.api.memegenerator.net//Generators_Select_ByNew?pageIndex=0&pageSize=12&apiKey=demo
 */

endpoints.generatorsSelectByPopular = '/Generators_Select_ByPopular'
/*
Description

Returns the most popular generators for the last [days] days.

Parameters

sessionKey - A logged in user session key. Use MgUser_Login to get a session key.
optional

pageIndex - Page index of the requested result set. Defaults to 0 if not specified.

pageSize - Page size of the requested result set. Defaults to 12 if not specified.

days - The time period for which to filter the result set. ([days] == null) for all time.
optional


Example

http://version1.api.memegenerator.net//Generators_Select_ByPopular?pageIndex=0&pageSize=12&days=&apiKey=demo
 */

endpoints.generatorsSelectByRecentlyCaptioned = '/Generators_Select_ByRecentlyCaptioned'
/*

 */

endpoints.generatorsSelectBySubscriber = '/Generators_Select_BySubscriber'
/*

 */

endpoints.generatorsSelectByTrending = '/Generators_Select_ByTrending'
/*

 */

endpoints.generatorsSelectByUpvoted = '/Generators_Select_ByUpvoted'
/*

 */

endpoints.generatorsSelectRelatedByDisplayName = '/Generators_Select_Related_ByDisplayName'
/*

 */

endpoints.groupSelectModerators = '/Group_Select_Moderators'
/*

 */

endpoints.instanceCreate = '/Instance_Create'
/*

 */

endpoints.instanceDelete = '/Instance_Delete'
/*

 */

endpoints.instanceSelect = '/Instance_Select'
/*

 */

endpoints.instancesSearch = '/Instances_Search'
/*

 */

endpoints.instancesSelectBySubscriberMgUserID = '/Instances_Select_By_SubscriberMgUserID'
/*

 */

endpoints.instancesSelectByMgUser = '/Instances_Select_ByMgUser'
/*

 */

endpoints.instancesSelectByNew = '/Instances_Select_ByNew'
/*

 */

endpoints.instancesSelectByPopular = '/Instances_Select_ByPopular'
/*

 */

endpoints.instancesSelectByUpvoted = '/Instances_Select_ByUpvoted'
/*

 */

endpoints.mgImageSelect = '/MgImage_Select'
/*

 */

endpoints.mgImagesSearch = '/MgImages_Search'
/*

 */

endpoints.mgUserLogin = '/MgUser_Login'
/*

 */

endpoints.mgUserLoginFacebook = '/MgUser_Login_Facebook'
/*

 */

endpoints.mgUserSignup = '/MgUser_SignUp'
/*

 */

endpoints.mgUserUpdateImage = '/MgUser_Update_Image'
/*

 */

endpoints.mgUserUpdateUsername = '/MgUser_Update_Username'
/*

 */

endpoints.mgUsersSelectByPublisher = '/MgUsers_Select_ByPublisher'
/*

 */

endpoints.mgUsersSelectBySubscriber = '/MgUsers_Select_BySubscriber'
/*

 */

endpoints.subscriptionGeneratorCreate = '/Subscription_Generator_Create'
/*

 */

endpoints.subscriptionGeneratorDelete = '/Subscription_Generator_Delete'
/*

 */

endpoints.subscriptionMgUserCreate = '/Subscription_MgUser_Create'
/*

 */

endpoints.subscriptionMgUserDelete = '/Subscription_MgUser_Delete'
/*

 */

endpoints.templatesSelectByUrlName = '/Templates_Select_ByUrlName'
/*

 */

endpoints.vote = '/Vote'
/*

 */

let memegenerator = {}

memegenerator.test = function() {
  return 'hello world'
}

module.exports = memegenerator
