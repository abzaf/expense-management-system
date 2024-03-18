const IncomeSchema = require("../models/incomeModel")

// adding income schema to db - POST
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
        res.status(500).json({error: 'Server error'});
    }
    console.log(income);   
}

// getting income data from db - GET
exports.getIncomes = async(req, res) => {
    try {
        // list income datas most recent -> less recent
        const incomes = await IncomeSchema.find().sort({createdAt: -1});
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({error: 'Server error while getting incomes'});

    }
}

// delete income data from db - DEL
exports.deleteIncome = async(req, res) => {
    const { id } = req.params;
    IncomeSchema.findByIdAndDelete(id)
        .then((income) => {
            res.status(200).json({message: 'Income deleted'});
        })
        .catch((error) => {
            res.status(500).json({error: 'Server error while trying to delete'});
        })
}