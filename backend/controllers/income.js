const IncomeSchema = require("../models/incomeModel")

exports.addIncome = async(req, res) => {
    const {title, amount, category, description, date} = req.body
    
    const income = IncomeSchema({
        title,
        amount,
        category,
        description,
        date
    });

    try {
        // validations
        if (!title || !category || !description || !date) {
            return res.status(400).json({errors: 'All fields are required!'});
        }
        if (amount <= 0 || !amount === 'number') {
            return res.status(400).json({errors: 'Amount must be a positive number'});
        }
        await income.save()
        res.status(200).json({message: 'Income added'});
    } catch (error) {

    }

    console.log(income);
    
}