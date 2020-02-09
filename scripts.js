const fs = require('fs')

fs.writeFileSync('./.env', `REACT_APP_API_KEY=${process.env.REACT_APP_API_KEY}\n 
                            REACT_APP_ADMIN_KEY=${process.env.REACT_APP_ADMIN_KEY}\n
                            REACT_APP_USER=${process.env.REACT_APP_USER}\n
                            REACT_APP_UNDERGROUND_API_KEY=${process.env.REACT_APP_UNDERGROUND_API_KEY}\n
                            REACT_APP_POST_API_KEY=${process.env.REACT_APP_POST_API_KEY}\n
                            REACT_APP_LOGIN_API_KEY=${process.env.REACT_APP_API_KEY}\n
                            REACT_APP_REGISTER_API_KEY=${process.env.REACT_APP_REGISTER_API_KEY}\n
                            REACT_APP_DELETE_API_KEY=${process.env.REACT_APP_DELETE_API_KEY}\n
                            REACT_APP_USERPOST_API_KEY=${process.env.REACT_APP_USERPOST_API_KEY}\n
                            REACT_APP_USER_API_KEY=${process.env.REACT_APP_USER_API_KEY}\n
                            REACT_APP_WEB_USER_API_KEY=${process.env.REACT_APP_WEB_USER_API_KEY}\n
                            REACT_APP_USER_FAVS_API_KEY=${process.env.REACT_APP_USER_FAVS_API_KEY}\n
                            REACT_APP_LINK_PREVIEW=${process.env.REACT_APP_LINK_PREVIEW}\n
                            REACT_APP_CONTACT=${process.env.REACT_APP_CONTACT}\n
                `)
