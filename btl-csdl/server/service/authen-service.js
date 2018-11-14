// class AuthenService {
//     constructor(admin_repository) {
//       this.admin_repository = admin_repository
  
//       this.login = this.login.bind(this)
//     }
  
//     login(username, password, callback) {
//       let condition = {
//         username
//       }
  
//       this.admin_repository.find_one(condition, (err, admin) => {
//         if (err) return callback(null, null)
//         else {
//           if (admin.password == password) return callback(null, admin)
//           else return callback(null, null)
//         }
//       })
//     }
//   }
  
//   module.exports = AuthenService
  