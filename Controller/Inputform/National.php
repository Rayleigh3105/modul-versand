<?php
namespace Magento\VersandForm\Controller\Inputform;

use Magento\Framework\Controller\ResultFactory;

class National extends \Magento\Framework\App\Action\Action
{
    protected $_pageFactory;
    public function __construct(
        \Magento\Framework\App\Action\Context $context,
        \Magento\Framework\View\Result\PageFactory $pageFactory)
    {
        $this->_pageFactory = $pageFactory;
        return parent::__construct($context);
    }

    public function execute()
    {
        $json_obj =  file_get_contents("php://input");
        $filePath = time()."_data.csv";

        if (!empty($json_obj)) {
            $this->jsonToCsv($json_obj, $filePath, false);
        }


        // 2. GET request : Render the booking page
        $this->_view->loadLayout();
        $this->_view->renderLayout();
    }

    /**
     * @param $json
     * @param bool $csvFilePath
     * @param bool $boolOutputFile
     */
    function jsonToCsv ($json, $csvFilePath = false, $boolOutputFile = false) {

        // See if the string contains something
        if (empty($json)) {
            die("The JSON string is empty!");
        }

        // If passed a string, turn it into an array
        if (is_array($json) === false) {
            $json = json_decode($json, true);
        }

        // If a path is included, open that file for handling. Otherwise, use a temp file (for echoing CSV string)
        if ($csvFilePath !== false) {
            $f = fopen($csvFilePath,'w+');
            if ($f === false) {
                die("Couldn't create the file to store the CSV, or the path is invalid. Make sure you're including the full path, INCLUDING the name of the output file (e.g. '../save/path/csvOutput.csv')");
            }
        }
        $data = null;
        // Get array Keys
        $arrayKeys = array_keys($json);
        // Fetch last arra key
        $lastArrayKey = array_pop($arrayKeys);
        foreach ($json as $line) {
            // Check if it is the last element of the Array
            if ($line === $lastArrayKey) {
                $data = $data.$line;
            } else {
                $data = $data.$line.";";
            }
        }
        // Put file into specific path
        file_put_contents($csvFilePath, $data);
    }
}