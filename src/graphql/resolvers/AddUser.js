import User from '../../models/user.js';
import Bank from '../../models/bank.js';
import Account from '../../models/account.js';
import ifsc from 'ifsc';
import weather from 'openweather-apis';

const fetchWeatherDescription = async () => {
    return new Promise((resolve, reject) => {
        weather.getDescription((err, desc) => {
            if (err) {
                console.log("fetchWeatherDescription", err);
                reject(err);
            } 
            resolve(desc);
        });
    })
}

export default {
    Mutation: {
        addUser: async (_, args) => {
            try {
                const { name, accounts: { data } } = args.object;
                console.log("args", data);
                // console.log("args", accounts);
                console.log("args", args.object);
                // add name to user
                const user = new User({ name });
                const new_user = await user.save();

                // weather-api prep
                const ownKey = "04513f47ea17a88f686eb4ccd4c510b0";
                weather.setLang('en');
                weather.setAPPID(ownKey);
                weather.setUnits('metric');
                
                for await(const det of data) {
                    const { ifsc : ifscCode, number } = det;
                    const ifscResp = await ifsc.fetchDetails(ifscCode);
                    await weather.setCity(ifscResp.CITY);

                    const desc = await fetchWeatherDescription();
                    console.log(`weatherResp ${ifscCode}`, desc);
                    // adding bank details to bank
                    const new_bank = new Bank({
                        name: ifscResp.BANK,
                        branch: ifscResp.BRANCH,
                        city: ifscResp.CITY,
                        weather: desc
                    });
                    const bank = await new_bank.save();
                    console.log("bank", bank);
                    
                    // adding account details to account
                    const new_account = new Account({
                        ifsc: ifscCode,
                        number,
                        bank: bank._id
                    });
                    const account = await new_account.save();
                    console.log(`account`, account);

                    await User.findByIdAndUpdate(new_user._id, { $push: { accounts: account._id } });
                }

                // fetching users account and bank details
                const user_details = await User.findById(new_user._id)
                                                .populate({
                                                    path: 'accounts',
                                                    populate: {
                                                        path: 'bank',
                                                        model: 'Bank'
                                                    }
                                                });
                console.log("user_details", user_details);
                return user_details;
            } catch (error) {
                console.log("error while adding user",error);
            }
        }
    }
}