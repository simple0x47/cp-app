import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { LoginSuccess, Logout } from "src/app/auth-api/auth.actions";

export interface AuthStateModel {
    access_token: string;
}

@State<AuthStateModel>(
    {
        name: 'auth',
        defaults: {
            access_token: "",
        }
    }
)
@Injectable()
export class AuthState {
    @Action(LoginSuccess)
    loginSuccess(ctx: StateContext<AuthStateModel>, action: LoginSuccess) {
        ctx.setState({
            access_token: action.successfulLogin.access_token
        })
    }

    @Action(Logout)
    logout(ctx: StateContext<AuthStateModel>, action: Logout) {
        ctx.setState({
            access_token: ""
        })
    }
}