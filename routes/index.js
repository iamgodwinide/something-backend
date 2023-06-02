const router = require('express').Router();
const Address = require("../model/Address");
const wallets = require("../addresses.json");

router.get("/add_addresses", async(req,res) => {
    try{
        await Address.insertMany(wallets);
        return res.status(200).json({
            success: true,
            msg: "address added"
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            msg: "Internal Server Error"
        })
    }
})

router.get("/get_info/:address", async(req,res) => {
    try{
        const {address} = req.params;
        const wallet = await Address.findOne({address: address.toLowerCase()});
        if(wallet){
            return res.status(200).json({
                success: true,
                wallet
            })
        }else{
            return res.status(200).json({
                success: false
            })
        }
        
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            msg: "Internal Server Error"
        })
    }
})

router.get("/claim/:address", async (req,res) => {
    try{
        const {address} = req.params;
        const isWhitelisted = await Address.findOne({address});
        if(!isWhitelisted){
            return res.status(400).json({
                success: false,
                msg: "Sorry you are not in the whitelist"
            });
        }
        if(isWhitelisted.claimed){
            return res.status(400).json({
                success: false,
                msg: "You already claimed your tokens"
            });
        }
        else{
            await Address.updateOne({address}, {claimed: true, amountInTokens: 0});
            return res.status(200).json({
                success: true,
                wallet: {...isWhitelisted, claimed: true, amountInTokens: 0}
            })
        }
    }catch(err){
        console.log(err);
        return res.status(500).json({
            msg: "Internal Server Error"
        })
    }
})

module.exports = router;