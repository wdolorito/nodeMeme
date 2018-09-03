const http = require('http')
const querystring = require('querystring')
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

Post a comment to an instance. Use entityName=Instance for instance,
with entityID=[instanceID].

Parameters

sessionKey - A logged in user session key. Use MgUser_Login to get a session
             key.
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

sessionKey - A logged in user session key. Use MgUser_Login to get a session
             key.
optional

commentID - The ID of the comment.


Example

http://version1.api.memegenerator.net//Comment_Delete?commentID=-1&apiKey=demo
 */

endpoints.commentSelect = '/Comments_Select'
/*
Description

Returns all the comments for a specific entity. Use entityName=Instance for
instance, with entityID=[instanceID].

Parameters

sessionKey - A logged in user session key. Use MgUser_Login to get a session
             key.
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

sessionKey - A logged in user session key. Use MgUser_Login to get a session
             key.
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

sessionKey - A logged in user session key. Use MgUser_Login to get a session
             key.
optional

image - Image url or HTTP posted file.

displayName - The display name of the requested generator, e.g. 'Insanity Wolf'.


Example

http://version1.api.memegenerator.net//Generator_Create?image=https://cdn.meme.am/images/983.jpg&displayName=Insanity Wolf&apiKey=demo
 */

endpoints.generatorSelectByUrlNameOrGeneratorID = '/Generator_Select_ByUrlNameOrGeneratorID'
/*
Description

Returns information about a specific generator, either by its [generatorID] or
by its [urlName].

Parameters

sessionKey - A logged in user session key. Use MgUser_Login to get a session
             key.
optional

generatorID - The GeneratorID of the generator as received from any of the
              Generators_Select_* methods.
optional

urlName - The URL name of the requested generator, e.g. 'Insanity-Wolf'. Leave
          as [null] to show all the generators.


Example

http://version1.api.memegenerator.net//Generator_Select_ByUrlNameOrGeneratorID?generatorID=45&urlName=Insanity-Wolf&apiKey=demo
 */

endpoints.generatorsSearch = '/Generators_Search'
/*
Description

Returns a list of search results by the search keyword [q].

Parameters

sessionKey - A logged in user session key. Use MgUser_Login to get a session
             key.
optional

q - The search query.

pageIndex - Page index of the requested result set. Defaults to 0 if not
            specified.

pageSize - Page size of the requested result set. Defaults to 12 if not
           specified.


Example

http://version1.api.memegenerator.net//Generators_Search?q=insanity&pageIndex=0&pageSize=12&apiKey=demo
 */

endpoints.generatorsSelectByMgUser = '/Generators_Select_ByMgUser'
/*
Description

Returns generators created by a particular user.

Parameters

sessionKey - A logged in user session key. Use MgUser_Login to get a session
             key.
optional

byMgUserID - The ID of the user that created the content.

pageIndex - Page index of the requested result set. Defaults to 0 if not
            specified.

pageSize - Page size of the requested result set. Defaults to 12 if not
           specified.


Example

http://version1.api.memegenerator.net//Generators_Select_ByMgUser?byMgUserID=1&pageIndex=0&pageSize=12&apiKey=demo
 */

endpoints.generatorsSelectByNew = '/Generators_Select_ByNew'
/*
Description

Returns the most recently created generators. This list gets updated whenever
the website moderators approve another batch of generators to appear on the
website. Some generators may not be approved due to poor quality, nsfw content,
etc, so this list is highly selective.

Parameters

sessionKey - A logged in user session key. Use MgUser_Login to get a session
             key.
optional

pageIndex - Page index of the requested result set. Defaults to 0 if not
            specified.

pageSize - Page size of the requested result set. Defaults to 12 if not
           specified.


Example

http://version1.api.memegenerator.net//Generators_Select_ByNew?pageIndex=0&pageSize=12&apiKey=demo
 */

endpoints.generatorsSelectByPopular = '/Generators_Select_ByPopular'
/*
Description

Returns the most popular generators for the last [days] days.

Parameters

sessionKey - A logged in user session key. Use MgUser_Login to get a session
             key.
optional

pageIndex - Page index of the requested result set. Defaults to 0 if not
            specified.

pageSize - Page size of the requested result set. Defaults to 12 if not
           specified.

days - The time period for which to filter the result set. ([days] == null) for
       all time.
optional


Example

http://version1.api.memegenerator.net//Generators_Select_ByPopular?pageIndex=0&pageSize=12&days=&apiKey=demo
 */

endpoints.generatorsSelectByRecentlyCaptioned = '/Generators_Select_ByRecentlyCaptioned'
/*
Description

Returns generators that were recently used to create an instence. Sort of
most-recently-used list.

Parameters

sessionKey - A logged in user session key. Use MgUser_Login to get a session
             key.
optional

Example

http://version1.api.memegenerator.net//Generators_Select_ByRecentlyCaptioned
 */

endpoints.generatorsSelectBySubscriber = '/Generators_Select_BySubscriber'
/*
Description

Returns the list of generators that a particular user is subscribed to.

Parameters

sessionKey - A logged in user session key. Use MgUser_Login to get a session
             key.
optional

subscriberMgUserID - The mgUserID of the user whose subscriptions we're
                     interested in.


Example

http://version1.api.memegenerator.net//Generators_Select_BySubscriber?subscriberMgUserID=1&apiKey=demo
 */

endpoints.generatorsSelectByTrending = '/Generators_Select_ByTrending'
/*
Description

Returns recently trending generators.

Parameters

sessionKey - A logged in user session key. Use MgUser_Login to get a session
             key.
optional


Example

http://version1.api.memegenerator.net//Generators_Select_ByTrending
 */

endpoints.generatorsSelectByUpvoted = '/Generators_Select_ByUpvoted'
/*
Description

Returns generators upvoted (liked) by a particular user.

Parameters

sessionKey - A logged in user session key. Use MgUser_Login to get a session
             key.
optional

byMgUserID - The ID of the user that created the content.

pageIndex - Page index of the requested result set. Defaults to 0 if not
            specified.

pageSize - Page size of the requested result set. Defaults to 12 if not
           specified.


Example

http://version1.api.memegenerator.net//Generators_Select_ByUpvoted?byMgUserID=1&pageIndex=0&pageSize=12&apiKey=demo
 */

endpoints.generatorsSelectRelatedByDisplayName = '/Generators_Select_Related_ByDisplayName'
/*
Description

Returns generators that are related to a particular generator, a sort of 'see
also' list.

Parameters

sessionKey - A logged in user session key. Use MgUser_Login to get a session
             key.
optional

displayName - The display name of the requested generator, e.g. 'Insanity Wolf'.


Example

http://version1.api.memegenerator.net//Generators_Select_Related_ByDisplayName?displayName=Insanity Wolf&apiKey=demo
 */

endpoints.groupSelectModerators = '/Group_Select_Moderators'
/*
Description

Returns the users who are moderators of a group.

Parameters

sessionKey - A logged in user session key. Use MgUser_Login to get a session
             key.
optional

groupID - The ID of the group.


Example

http://version1.api.memegenerator.net//Group_Select_Moderators?groupID=2&apiKey=demo
 */

endpoints.instanceCreate = '/Instance_Create'
/*
Description

Creates a captioned image. Images created with this method are created in the
database and may appear on the website. User credentials of an ordinary user
must be provided to create images. Sign up on http://{memegenerator.net}/ to
create your user. ImageID may by omitted to use the default template for the
character, or specified to use one of the alternative templates.

Parameters

sessionKey - A logged in user session key. Use MgUser_Login to get a session
             key.
optional

languageCode - The language to filter the result set by, or the language of the
               text on the created image, indicated by a 2-letter language code.
               Currently supported languages are English (en), Spanish (es),
               French (fr), Hebrew (he), Russian (ru), Other (--).

generatorID - The GeneratorID of the generator as received from any of the
              Generators_Select_* methods.

imageID - The background image on which to caption the text. If generatorID is
          also requested then imageID must be one of the images of the specified
          generator, e.g. for Insanity Wolf (generatorID 45) the imageID must be
          20, as received from any of the Generators_Select_* methods.
optional

text0 - The first line to appear on the image. If only one line is specified it
        will appear on the bottom of the image. If two lines are specified
        ([text0] and [text1]), [text0] will appear on the top and [text1] will
        appear on the bottom on the image. Both lines are automatically
        converted to uppercase.

text1 - The second line to appear on the image. Will appear on the bottom of the
        image. Automatically converted to uppercase.


Example

http://version1.api.memegenerator.net//Instance_Create?languageCode=en&generatorID=45&imageID=20&text0=push a hipster down the stairs&text1=now look who's tumbling&apiKey=demo
 */

endpoints.instanceDelete = '/Instance_Delete'
/*
Description

Delete an instance, will only work if the user has created it or is admin or is
moderator of the group the instance is posted in.

Parameters

sessionKey - A logged in user session key. Use MgUser_Login to get a session
             key.
optional

instanceID - The ID of the instance.


Example

http://version1.api.memegenerator.net//Instance_Delete?instanceID=72628355&apiKey=demo
 */

endpoints.instanceSelect = '/Instance_Select'
/*
Description

Select an instance by its instanceID.

Parameters

sessionKey - A logged in user session key. Use MgUser_Login to get a session
             key.
optional

instanceID - The ID of the instance.


Example

http://version1.api.memegenerator.net//Instance_Select?instanceID=72628355&apiKey=demo
 */

endpoints.instancesSearch = '/Instances_Search'
/*
Description

Returns a list of search results of instances by the search keyword [q].

Parameters

sessionKey - A logged in user session key. Use MgUser_Login to get a session
             key.
optional

q - The search query.

pageIndex - Page index of the requested result set. Defaults to 0 if not
            specified.

pageSize - Page size of the requested result set. Defaults to 12 if not
           specified.


Example

http://version1.api.memegenerator.net//Instances_Search?q=insanity&pageIndex=0&pageSize=12&apiKey=demo
 */

endpoints.instancesSelectBySubscriberMgUserID = '/Instances_Select_By_SubscriberMgUserID'
/*
Description

Get the feed instances of the current user. Feed instances are all the instances
from the user's subscribed to generators and users.

Parameters

sessionKey - A logged in user session key. Use MgUser_Login to get a session
             key.

languageCode - The language to filter the result set by, or the language of the
               text on the created image, indicated by a 2-letter language code.
               Currently supported languages are English (en), Spanish (es),
               French (fr), Hebrew (he), Russian (ru), Other (--).

fromInstanceID - Feed instances are not paged, rather they are being infinitely
                 scrolled. To get the next batch of instances, fromInstanceID
                 specifies where (exclusively) we should start from.
optional

pageSize - Page size of the requested result set. Defaults to 12 if not
           specified.


Example

http://version1.api.memegenerator.net//Instances_Select_By_SubscriberMgUserID?sessionKey=[sessionKey]&languageCode=en&fromInstanceID=1000000&pageSize=12&apiKey=demo
 */

endpoints.instancesSelectByMgUser = '/Instances_Select_ByMgUser'
/*
Description

Returns instances created by a particular user.
Parameters

sessionKey - A logged in user session key. Use MgUser_Login to get a session
             key.
optional

byMgUserID - The ID of the user that created the content.

pageIndex - Page index of the requested result set. Defaults to 0 if not
            specified.

pageSize - Page size of the requested result set. Defaults to 12 if not
           specified.


Example

http://version1.api.memegenerator.net//Instances_Select_ByMgUser?byMgUserID=1&pageIndex=0&pageSize=12&apiKey=demo
 */

endpoints.instancesSelectByNew = '/Instances_Select_ByNew'
/*
Description

Returns recently created instances, for a particular generator
([urlName] != null) or for all generators ([urlName] == null). Only shows
moderator approved content.

Parameters

sessionKey - A logged in user session key. Use MgUser_Login to get a session
             key.
optional

languageCode - The language to filter the result set by, or the language of the
               text on the created image, indicated by a 2-letter language code.
               Currently supported languages are English (en), Spanish (es),
               French (fr), Hebrew (he), Russian (ru), Other (--).

pageIndex - Page index of the requested result set. Defaults to 0 if not
            specified.

urlName - The URL name of the requested generator, e.g. 'Insanity-Wolf'. Leave
          as [null] to show all the generators.


Example

http://version1.api.memegenerator.net//Instances_Select_ByNew?languageCode=en&pageIndex=0&urlName=Insanity-Wolf&apiKey=demo
 */

endpoints.instancesSelectByPopular = '/Instances_Select_ByPopular'
/*
Description

Returns the most popular instances for a particular period ([days]=null for all
time, [days]=1 for the last day, [days]=7 for the last week, [days]=30 for the
last month) for a particular generator ([urlName] != null) or for all generators
([urlName] == null). Only shows moderator approved content.

Parameters

sessionKey - A logged in user session key. Use MgUser_Login to get a session
             key.
optional

languageCode - The language to filter the result set by, or the language of the
               text on the created image, indicated by a 2-letter language code.
               Currently supported languages are English (en), Spanish (es),
               French (fr), Hebrew (he), Russian (ru), Other (--).

pageIndex - Page index of the requested result set. Defaults to 0 if not
            specified.

urlName - The URL name of the requested generator, e.g. 'Insanity-Wolf'. Leave
          as [null] to show all the generators.

days - The time period for which to filter the result set. ([days] == null) for
       all time.
optional


Example

http://version1.api.memegenerator.net//Instances_Select_ByPopular?languageCode=en&pageIndex=0&urlName=Insanity-Wolf&days=&apiKey=demo
 */

endpoints.instancesSelectByUpvoted = '/Instances_Select_ByUpvoted'
/*
Description

Returns instances upvoted (liked) by a particular user.

Parameters

sessionKey - A logged in user session key. Use MgUser_Login to get a session
             key.
optional

byMgUserID - The ID of the user that created the content.

pageIndex - Page index of the requested result set. Defaults to 0 if not
            specified.

pageSize - Page size of the requested result set. Defaults to 12 if not
           specified.


Example

http://version1.api.memegenerator.net//Instances_Select_ByUpvoted?byMgUserID=1&pageIndex=0&pageSize=12&apiKey=demo
 */

endpoints.mgImageSelect = '/MgImage_Select'
/*
Description

Returns information about an image.

Parameters

sessionKey - A logged in user session key. Use MgUser_Login to get a session
             key.
optional

mgImageID - An ID of an image or video file in the database.


Example

http://version1.api.memegenerator.net//MgImage_Select?mgImageID=42&apiKey=demo
 */

endpoints.mgImagesSearch = '/MgImages_Search'
/*
Description

Search the image database.

Parameters

sessionKey - A logged in user session key. Use MgUser_Login to get a session
             key.
optional

q - The search query.


Example

http://version1.api.memegenerator.net//MgImages_Search?q=insanity&apiKey=demo
 */

endpoints.mgUserLogin = '/MgUser_Login'
/*
Description

Returns a session key which can be used for methods that support a logged in
user context - methods that accept [sessionKey].

Parameters

username - The credentials of a signed up user. Use the website or MgUser_Signup
           to sign up.

password - The credentials of a signed up user. Use the website or MgUser_Signup
           to sign up.


Example

http://version1.api.memegenerator.net//MgUser_Login?username=test8&password=test8&apiKey=demo
 */

endpoints.mgUserLoginFacebook = '/MgUser_Login_Facebook'
/*
Description

Logs in with a facebook access token.

Parameters

facebookAccessToken - Get a facebook access token by logging in with the
facebook API.


Example

http://version1.api.memegenerator.net//MgUser_Login_Facebook?facebookAccessToken=[facebook access token]&apiKey=demo
 */

endpoints.mgUserSignup = '/MgUser_SignUp'
/*
Description

Create a new user account.

Parameters

email - Email address for notification of removal.

username - The credentials of a signed up user. Use the website or MgUser_Signup
           to sign up.

password - The credentials of a signed up user. Use the website or MgUser_Signup
           to sign up.


Example

http://version1.api.memegenerator.net//MgUser_SignUp?email=email@domain.com&username=test8&password=test8&apiKey=demo
 */

endpoints.mgUserUpdateImage = '/MgUser_Update_Image'
/*
Description

Change a user's profile image.

Parameters

sessionKey - A logged in user session key. Use MgUser_Login to get a session
             key.

image - Image url or HTTP posted file.


Example

http://version1.api.memegenerator.net//MgUser_Update_Image?sessionKey=[sessionKey]&image=https://cdn.meme.am/images/983.jpg&apiKey=demo
 */

endpoints.mgUserUpdateUsername = '/MgUser_Update_Username'
/*
Description

Change a user's username. This can be done by the user only once, when setting
up their account.

Parameters

sessionKey - A logged in user session key. Use MgUser_Login to get a session
             key.

newUsername - The new username.


Example

http://version1.api.memegenerator.net//MgUser_Update_Username?sessionKey=[sessionKey]&newUsername=test8&apiKey=demo
 */

endpoints.mgUsersSelectByPublisher = '/MgUsers_Select_ByPublisher'
/*
Description

Returns the list of users that are following a particular user.

Parameters

sessionKey - A logged in user session key. Use MgUser_Login to get a session
             key.
optional

publisherMgUserID - The mgUserID of a user that is being subscribed to
                    (followed) or unsubscribed from (unfollowed).


Example

http://version1.api.memegenerator.net//MgUsers_Select_ByPublisher?publisherMgUserID=1&apiKey=demo
 */

endpoints.mgUsersSelectBySubscriber = '/MgUsers_Select_BySubscriber'
/*
Description

Returns the list of users that a user follows.

Parameters

sessionKey - A logged in user session key. Use MgUser_Login to get a session
             key.
optional

subscriberMgUserID - The mgUserID of the user whose subscriptions we're
                     interested in.


Example

http://version1.api.memegenerator.net//MgUsers_Select_BySubscriber?subscriberMgUserID=1&apiKey=demo
 */

endpoints.subscriptionGeneratorCreate = '/Subscription_Generator_Create'
/*
Description

Subscribe to a generator. This is not the same as liking (upvoting) a generator.
Subscribed generator's instances appear in the user's feed.

Parameters

sessionKey - A logged in user session key. Use MgUser_Login to get a session
             key.

publisherGeneratorID - The generatorID of a generator that is being subscribed
                       to or unsubscribed from.


Example

http://version1.api.memegenerator.net//Subscription_Generator_Create?sessionKey=[sessionKey]&publisherGeneratorID=225&apiKey=demo
 */

endpoints.subscriptionGeneratorDelete = '/Subscription_Generator_Delete'
/*
Description

Unsubscribe from a generator.

Parameters

sessionKey - A logged in user session key. Use MgUser_Login to get a session
             key.

publisherGeneratorID - The generatorID of a generator that is being subscribed
                       to or unsubscribed from.


Example

http://version1.api.memegenerator.net//Subscription_Generator_Delete?sessionKey=[sessionKey]&publisherGeneratorID=225&apiKey=demo
 */

endpoints.subscriptionMgUserCreate = '/Subscription_MgUser_Create'
/*
Description

Subscribe to (follow) a user.

Parameters

sessionKey - A logged in user session key. Use MgUser_Login to get a session
             key.

publisherMgUserID - The mgUserID of a user that is being subscribed to
                    (followed) or unsubscribed from (unfollowed).


Example

http://version1.api.memegenerator.net//Subscription_MgUser_Create?sessionKey=[sessionKey]&publisherMgUserID=1&apiKey=demo
 */

endpoints.subscriptionMgUserDelete = '/Subscription_MgUser_Delete'
/*
Description

Unsubscribe from (unfollow) a user.

Parameters

sessionKey - A logged in user session key. Use MgUser_Login to get a session
             key.

publisherMgUserID - The mgUserID of a user that is being subscribed to
                    (followed) or unsubscribed from (unfollowed).


Example

http://version1.api.memegenerator.net//Subscription_MgUser_Delete?sessionKey=[sessionKey]&publisherMgUserID=1&apiKey=demo
 */

endpoints.templatesSelectByUrlName = '/Templates_Select_ByUrlName'
/*
Description

Returns a list of alternative images for a generator.

Parameters

sessionKey - A logged in user session key. Use MgUser_Login to get a session
             key.
optional

urlName - The URL name of the requested generator, e.g. 'Insanity-Wolf'. Leave
          as [null] to show all the generators.


Example

http://version1.api.memegenerator.net//Templates_Select_ByUrlName?urlName=Insanity-Wolf&apiKey=demo
 */

endpoints.vote = '/Vote'
/*
Description

Vote (like/dislike) on generators and instances. VoteScore can be 1 (like),
-1 (dislike) or 0 (no vote). You can vote anonymously, and to vote for a
particular user (adds to their favorites), add [username] and [password] fields.

Parameters

sessionKey - A logged in user session key. Use MgUser_Login to get a session
             key.
optional

entityName - Use 'Instance' for instances or 'Generator' for generators.

entityID - For entityName=Instance, the entityID would be the instanceID.

voteScore - Like (1), dislike (-1) or none (0).


Example

http://version1.api.memegenerator.net//Vote?entityName=Instance&entityID=72628355&voteScore=1&apiKey=demo
 */

let memegenerator = {}

const returnQstr = function(params) {
  // params.apiKey = apiKey
  params.apiKey = 'demo'
  return '?' + querystring.stringify(params)
}

const makeCall = function(url) {
  return new Promise(resolve => {
    http.get(url, (resp) => {
      let data = ''
      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk
      })

      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        resolve(JSON.parse(data))
      })
    }).on("error", (err) => {
      console.log("Error: " + err.message)
      resolve(err)
    })
  })
}

const asyncCall = async function(url) {
  let result = await makeCall(url)
  return result
}

memegenerator.Comment_Create = function(sessionKey = '',
                                        entityName,
                                        entityID,
                                        parentCommentID = '',
                                        text) {
  let params = {}
  params.sessionKey = sessionKey
  params.entityName = entityName
  params.entityID = entityID
  params.parentCommentID = parentCommentID
  params.text = text
  let qstr = returnQstr(params)
  console.log(qstr)
  let url = baseLink + endpoints.commentCreate + qstr
  console.log(url)
  return asyncCall(url)
}

memegenerator.Comment_Delete = function(sessionKey = '',
                                        commentID) {
  let params = {}
  params.sessionKey = sessionKey
  params.commentID = commentID
  let qstr = returnQstr(params)
  console.log(qstr)
  let url = baseLink + endpoints.commentDelete + qstr
  console.log(url)
  return asyncCall(url)
}

memegenerator.Comments_Select = function(sessionKey = '',
                                         entityName,
                                         entityID,
                                         parentCommentID = '') {
  let params = {}
  params.sessionKey = sessionKey
  params.entityName = entityName
  params.entityID = entityID
  params.parentCommentID = parentCommentID
  let qstr = returnQstr(params)
  console.log(qstr)
  let url = baseLink + endpoints.commentSelect + qstr
  console.log(url)
  return asyncCall(url)
}

memegenerator.ContentFlag_Create = function(sessionKey = '',
                                            contentUrl,
                                            reason,
                                            email) {
  let params = {}
  params.sessionKey = sessionKey
  params.contentUrl = contentUrl
  params.reason = reason
  params.email = email
  let qstr = returnQstr(params)
  console.log(qstr)
  let url = baseLink + endpoints.contentFlagCreate + qstr
  console.log(url)
  return asyncCall(url)
}

memegenerator.Generator_Create = function(sessionKey = '',
                                          image,
                                          displayName) {
  let params = {}
  params.sessionKey = sessionKey
  params.image = image
  params.displayName = displayName
  let qstr = returnQstr(params)
  console.log(qstr)
  let url = baseLink + endpoints.generatorCreate + qstr
  console.log(url)
  return asyncCall(url)
}

memegenerator.Generator_Select_ByUrlNameOrGeneratorID = function(sessionKey = '',
                                                                 generatorID = '',
                                                                 urlName) {
  let params = {}
  params.sessionKey = sessionKey
  params.generatorID = generatorID
  params.urlName = urlName
  let qstr = returnQstr(params)
  console.log(qstr)
  let url = baseLink + endpoints.generatorSelectByUrlNameOrGeneratorID + qstr
  console.log(url)
  return asyncCall(url)
}

memegenerator.Generators_Search
memegenerator.Generators_Select_ByMgUser
memegenerator.Generators_Select_ByNew
memegenerator.Generators_Select_ByPopular
memegenerator.Generators_Select_ByRecentlyCaptioned
memegenerator.Generators_Select_BySubscriber
memegenerator.Generators_Select_ByTrending
memegenerator.Generators_Select_ByUpvoted
memegenerator.Generators_Select_Related_ByDisplayName
memegenerator.Group_Select_Moderators
memegenerator.Instance_Create
memegenerator.Instance_Delete
memegenerator.Instance_Select
memegenerator.Instances_Search
memegenerator.Instances_Select_By_SubscriberMgUserID
memegenerator.Instances_Select_ByMgUser
memegenerator.Instances_Select_ByNew
memegenerator.Instances_Select_ByPopular
memegenerator.Instances_Select_ByUpvoted
memegenerator.MgImage_Select
memegenerator.MgImages_Search
memegenerator.MgUser_Login
memegenerator.MgUser_Login_Facebook
memegenerator.MgUser_SignUp
memegenerator.MgUser_Update_Image
memegenerator.MgUser_Update_Username
memegenerator.MgUsers_Select_ByPublisher
memegenerator.MgUsers_Select_BySubscriber
memegenerator.Subscription_Generator_Create
memegenerator.Subscription_Generator_Delete
memegenerator.Subscription_MgUser_Create
memegenerator.Subscription_MgUser_Delete
memegenerator.Templates_Select_ByUrlName
memegenerator.Vote


memegenerator.test = function() {
  // let res = asyncCall(url)
  // res.then(function(result) {
  //   console.log(result)
  // })
}

module.exports = memegenerator
