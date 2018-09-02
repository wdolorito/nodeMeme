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
 * Description
 *
 * Post a comment to an instance. Use entityName=Instance for instance, with entityID=[instanceID].
 *
 * Parameters
 *
 * sessionKey - A logged in user session key. Use MgUser_Login to get a session key.
 * optional
 *
 * entityName - Use 'Instance' for instances or 'Generator' for generators.
 *
 * entityID - For entityName=Instance, the entityID would be the instanceID.
 *
 * parentCommentID - The comment whose child comments we're interested in.
 * optional
 *
 * text - Some text.
 *
 *
 * Example
 *
 * http://version1.api.memegenerator.net//Comment_Create?entityName=Instance&entityID=72628355&parentCommentID=&text=first post best post&apiKey=demo
 *
 */

endpoints.commentDelete = '/Comment_Delete'
/*
 * Description
 *
 * Delete a comment, will only work if the user has created it or is admin.
 *
 * Parameters
 *
 * sessionKey - A logged in user session key. Use MgUser_Login to get a session key.
 * optional
 *
 * commentID - The ID of the comment.
 *
 *
 * Example
 *
 * http://version1.api.memegenerator.net//Comment_Delete?commentID=-1&apiKey=demo
 *
 */
endpoints.commentSelect = '/Comments_Select'
endpoints.contentFlagCreate = '/ContentFlag_Create'
endpoints.generatorCreate = '/Generator_Create'
endpoints.generatorSelectByUrlNameOrGeneratorID = '/Generator_Select_ByUrlNameOrGeneratorID'
endpoints.generatorsSearch = '/Generators_Search'
endpoints.generatorsSelectByMgUser = '/Generators_Select_ByMgUser'
endpoints.generatorsSelectByNew = '/Generators_Select_ByNew'
endpoints.generatorsSelectByPopular = '/Generators_Select_ByPopular'
endpoints.generatorsSelectByRecentlyCaptioned = '/Generators_Select_ByRecentlyCaptioned'
endpoints.generatorsSelectBySubscriber = '/Generators_Select_BySubscriber'
endpoints.generatorsSelectByTrending = '/Generators_Select_ByTrending'
endpoints.generatorsSelectByUpvoted = '/Generators_Select_ByUpvoted'
endpoints.generatorsSelectRelatedByDisplayName = '/Generators_Select_Related_ByDisplayName'
endpoints.groupSelectModerators = '/Group_Select_Moderators'
endpoints.instanceCreate = '/Instance_Create'
endpoints.instanceDelete = '/Instance_Delete'
endpoints.instanceSelect = '/Instance_Select'
endpoints.instancesSearch = '/Instances_Search'
endpoints.instancesSelectBySubscriberMgUserID = '/Instances_Select_By_SubscriberMgUserID'
endpoints.instancesSelectByMgUser = '/Instances_Select_ByMgUser'
endpoints.instancesSelectByNew = '/Instances_Select_ByNew'
endpoints.instancesSelectByPopular = '/Instances_Select_ByPopular'
endpoints.instancesSelectByUpvoted = '/Instances_Select_ByUpvoted'
endpoints.mgImageSelect = '/MgImage_Select'
endpoints.mgImagesSearch = '/MgImages_Search'
endpoints.mgUserLogin = '/MgUser_Login'
endpoints.mgUserLoginFacebook = '/MgUser_Login_Facebook'
endpoints.mgUserSignup = '/MgUser_SignUp'
endpoints.mgUserUpdateImage = '/MgUser_Update_Image'
endpoints.mgUserUpdateUsername = '/MgUser_Update_Username'
endpoints.mgUsersSelectByPublisher = '/MgUsers_Select_ByPublisher'
endpoints.mgUsersSelectBySubscriber = '/MgUsers_Select_BySubscriber'
endpoints.subscriptionGeneratorCreate = '/Subscription_Generator_Create'
endpoints.subscriptionGeneratorDelete = '/Subscription_Generator_Delete'
endpoints.subscriptionMgUserCreate = '/Subscription_MgUser_Create'
endpoints.subscriptionMgUserDelete = '/Subscription_MgUser_Delete'
endpoints.templatesSelectByUrlName = '/Templates_Select_ByUrlName'
endpoints.vote = '/Vote'

let memegenerator = {}

memegenerator.test = function() {
  return 'hello world'
}

module.exports = memegenerator
