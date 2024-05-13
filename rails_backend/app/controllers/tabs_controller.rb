class TabsController < ApplicationController
    skip_before_action :verify_authenticity_token

    def create
        @tab = Tab.new(tab_params)

        if @tab.save
            render json: @tab, status: :created
        else
            render json: @tab.errors, status: :unprocessable_entity
        end
    end

    def index
        @tabs = Tab.all
        render json: @tabs
    end

    private

    def tab_params
        params.require(:tab).permit(:url, :time_spent)
    end
end