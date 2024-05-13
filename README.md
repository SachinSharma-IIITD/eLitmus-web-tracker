# Web Usage Tracker

Web Usage Tracker is a Chrome extension that tracks the time you spend on different websites. It uses a Ruby on Rails backend to store and manage data.

## Features

- Tracks the time spent on each tab in real-time
- Stores tab time data persistently in a database
- Provides an overview of your web usage

## Installation

### Backend

1. Navigate to the `rails_backend` directory.
2. Run `bundle install` to install the required Ruby gems.
3. Run `rails db:migrate` to set up the database.
4. Run `rails server` to start the Rails server.

### Chrome Extension

1. Open the Extension Management page by navigating to `chrome://extensions`.
2. Enable Developer Mode by clicking the toggle switch next to Developer mode.
3. Click the `Load unpacked` button and select the extension directory.

## Usage

Once the extension is installed and the backend server is running, simply browse the web as you normally would. The extension will track the time you spend on each website and send this data to the Rails backend, where it will be stored and managed.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
