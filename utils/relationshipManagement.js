import { User } from '../user/model/user.model.js';
import { Token } from '../user/model/token.model.js';

import { CheckAssertion } from '../checks/model/Assertion.model.js'
import { CheckAuthentication } from '../checks/model/authentication.model.js'
import { Check } from '../checks/model/check.model.js'
import { report } from '../reports/model/report.model.js';

export const manageRelationship = () => {
    User.hasOne(Token, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    });
    Token.belongsTo(User);

    Check.hasOne(CheckAuthentication, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    CheckAuthentication.belongsTo(Check);

    Check.hasOne(CheckAssertion, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    CheckAssertion.belongsTo(Check);

    Check.hasMany(report, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    });
    report.belongsTo(Check);

    User.hasMany(Check, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    });
    Check.belongsTo(User);

}