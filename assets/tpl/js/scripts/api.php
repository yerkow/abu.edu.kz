<?php
header('Content-Type: application/json');
class Mailer
{
    var $subject; // (string) Тема
    var $text; // (string) Текст сообщения (txt-вариант)
    var $html; // (string) Текст сообщения (html-вариант)
    var $from; // (string) От кого
    var $to; // (string) Кому
    var $charset; // (string) Кодировка (по умолчанию Windows-1251)
    var $sHeaders; // (string)
    var $sBody; // (string)
    var $sContentType; // (string)
    var $sHtmlTemplate; // (string)
    var $sBoundary; // (string)
    var $aAttaches; // (array)
    // Конструктор класса
    function Mailer()
    {
        $this->charset = 'UTF-8';
        $this->aAttaches = array();
        $this->sBoundary = '----' . substr(md5(uniqid(rand(), true)), 0, 16);
        $this->sHtmlTemplate = '<html><head><title>{title}</title></head><body>{body}</body></html>';
    }
    // Добавить заголовок
    function DoHeader($sHeader)
    {
        $this->sHeaders .= $sHeader . "\r\n";
    }
    // Прикрепить файл
    function Attach($sPath, $mimeType)
    {
        if (file_exists($sPath)) {
            $sName = basename($sPath);
            $sAttach = "Content-Type: $mimeType; name=\"$sName\"\r\n";
            $sAttach .= "Content-Disposition: attachment; filename=\"$sName\"\r\n";
            $sAttach .= "Content-Transfer-Encoding: base64\r\n";
            $sAttach .= "\r\n";
            $sAttach .= base64_encode(file_get_contents($sPath)) . "\r\n";
            $this->aAttaches[] = $sAttach;
        }
    }
    // Добавить HTML
    function AddHtml($sHtml)
    {
        $this->html .= $sHtml . "\r\n";
    }
    // Установить шаблон
    function SetTemplate($sPath)
    {
        if (file_exists($sPath))
            $this->sHtmlTemplate = file_get_contents($sPath);
    }
    // Отправить
    function Send()
    {
        $iCountAtt = count($this->aAttaches);
        $this->sHeaders = "From: {$this->from}\r\n";
        $this->sHeaders .= "MIME-Version: 1.0\r\n";
        if (!$this->html && !$iCountAtt) {
            $this->sHeaders .= 'Content-Type: text/plain; charset=' . $this->charset . "\r\n";
            $this->sBody = $this->text;
        } elseif ($this->html && !$iCountAtt) {
            $this->sHeaders .= 'Content-Type: text/html; charset=' . $this->charset . "\r\n";
            $aFields = array();
            $aFields['{title}'] = $this->subject;
            $aFields['{body}'] = $this->html;
            $this->sBody = strtr($this->sHtmlTemplate, $aFields);
        } elseif (!$this->html && $iCountAtt) {
            $this->sHeaders .= "Content-Type: multipart/mixed; boundary=\"{$this->sBoundary}\"\r\n";
            foreach ($this->aAttaches as $sAttach) {
                $this->sBody .= "--{$this->sBoundary}\r\n";
                $this->sBody .= $sAttach;
            }
            $this->sBody .= "--{$this->sBoundary}--\r\n";
        } elseif ($this->html && $iCountAtt) {
            $this->sHeaders .= "Content-Type: multipart/mixed; boundary=\"{$this->sBoundary}\"\r\n";
            $this->sBody .= "--{$this->sBoundary}\r\n";
            $this->sBody .= "Content-Type: text/html; charset={$this->charset}\r\n";
            $this->sBody .= "Content-Transfer-Encoding: 8bit\r\n";
            $this->sBody .= "\r\n";
            $aFields = array();
            $aFields['{title}'] = $this->subject;
            $aFields['{body}'] = $this->html;
            $this->sBody .= strtr($this->sHtmlTemplate, $aFields);
            $this->sBody .= "\r\n";
            foreach ($this->aAttaches as $sAttach) {
                $this->sBody .= "--{$this->sBoundary}\r\n";
                $this->sBody .= $sAttach;
            }
            $this->sBody .= "--{$this->sBoundary}--\r\n";
        }
        if (mail($this->to, $this->subject, $this->sBody, $this->sHeaders))
            return true;
        else
            return false;
    }
}
function getmsg($message)
{
    ob_start();
    echo $message;
    $html = ob_get_contents();
    ob_end_clean();
    return str_replace(array("\n", "\t"), "", $html);
}

function feedback($data)
{
    $response["status"] = 'error';
    $message = new Mailer();
    $message->from = 'flaitspb.ru <no-replay@flaitspb.ru>';
    $message->to = 'info <InvincibleN@yandex.ru>';
    $message->subject = 'Сообщение с сайта flaitspb.ru';
    $today = date("d.m.Y H:i");
    $mes = '<div>
					<p><b>Сообщение с сайта flaitspb.ru</b></p>
				</div>
				<table cellpadding="5" cellspacing="5" border="0">
					<tr>
						<td>Дата: </td><td>' . $today . '</td>
					</tr>
					<tr>
						<td>Тема письма: </td><td>' . $data['topic'] . '</td>
					</tr>
					<tr>
						<td>Имя: </td><td>' . $data['name'] . '</td>
					</tr>
					<tr>
						<td>Телефон: </td><td>' . $data['phone'] . '</td>
					</tr>
					<tr>
						<td>E-mail: </td><td>' . $data['email'] . '</td>
					</tr>					
					<tr>
						<td>Сообщение: </td><td>' . $data['message'] . '</td>
					</tr>						  
				</table>';
    $message->html = getmsg($mes);
    if ($message->Send()) {
        //$message->to = 'boss@web-pro-spb.ru';
        //$message->Send();
        $response["action"] = 'feedback';
        $response["status"] = 'success';
        $response["comment"] = 'Ваш вопрос успешно отправлен.<br />В ближайшее время с Вами свяжется наш специалист.';
    } else {
        $response["comment"] = 'Произошла ошибка, попробуйте позже.';
    }
    return $response;
}

function __getBaseDir()
{
    return $_SERVER['DOCUMENT_ROOT'];
}

function __prepareDirs()
{
    if (file_exists(__getBaseDir())) {
        if (!file_exists(__getBaseDir() . DIRECTORY_SEPARATOR . 'tmp')) {
            mkdir(__getBaseDir() . DIRECTORY_SEPARATOR . 'tmp');
        }
    }
}

function job($data)
{
    $response["status"] = 'error';
    $message = new Mailer();
    $message->from = 'flaitspb.ru <no-replay@flaitspb.ru>';
    $message->to = 'info <InvincibleN@yandex.ru>';
    $message->subject = 'Сообщение с сайта flaitspb.ru';
    $today = date("d.m.Y H:i");
    $mes = '<div>
					<p><b>Сообщение с сайта flaitspb.ru</b></p>
				</div>
				<table cellpadding="5" cellspacing="5" border="0">
					<tr>
						<td>Дата: </td><td>' . $today . '</td>
					</tr>
					<tr>
						<td>Тема письма: </td><td>' . $data['topic'] . '</td>
					</tr>
					<tr>
						<td>Имя: </td><td>' . $data['name'] . '</td>
					</tr>					
					<tr>
						<td>Телефон: </td><td>' . $data['phone'] . '</td>
					</tr>
					<tr>
						<td>E-mail: </td><td>' . $data['email'] . '</td>
					</tr>
					<tr>
						<td>Сообщение: </td><td>' . $data['message'] . '</td>
					</tr>						  
				</table>';
    $message->html = getmsg($mes);
    $files = $_FILES["files"];
    if (!empty($files)) {
        if ($files["type"][0] == 'application/msword' || $files["type"][0] == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || $files["type"][0] == 'application/pdf' || $files["type"][0] == 'application/octet-stream') {
        } else {
            unset($files);
            echo json_encode(Array("status" => 'extention', "code" => "action", "value" => '<div class="error">Wrong file extention</div>', "action" => "job", "data" => $data));
            die();
        }
        __prepareDirs();
        $uploadDir = __getBaseDir() . DIRECTORY_SEPARATOR . 'job' . DIRECTORY_SEPARATOR;
        $index = 0;
        foreach ($files['name'] as $file) {
            $name = $file;
            $i = 0;
            $parts = pathinfo($name);
            while (file_exists($uploadDir . $name)) {
                $i++;
                $name = $parts["filename"] . "-" . $i . "." . $parts["extension"];
            }
            $success = move_uploaded_file($files["tmp_name"][$index], $uploadDir . $name);
            if ($success) {
                chmod($uploadDir . $name, 0777);
                $message->Attach($uploadDir . $name, 'application/octet-stream');
                unlink($uploadDir . $name);
            }
            $index = $index + 1;
        }
    }
    if ($message->Send()) {
        //$message->to = 'boss@web-pro-spb.ru';
        //$message->Send();
        $response["action"] = 'job';
        $response["status"] = 'success';
        $response["comment"] = 'Ваш вопрос успешно отправлен.<br />В ближайшее время с Вами свяжется наш специалист.';
    } else {
        $response["comment"] = 'Произошла ошибка, попробуйте позже.';
    }
    return $response;
}

function prepare($data)
{
    foreach ($data as $key => $item) {
        switch ($key) {
            case 'PHPSESSID':
                unset($data[$key]);
                break;
            case 'action':
                unset($data[$key]);
                break;
            case strpos($key, 'submenuMark'):
                unset($data[$key]);
                break;
        }
    }
    return $data;
}

if (isset($_REQUEST["action"])) {
    $action = $_REQUEST["action"];
    $data = prepare($_REQUEST);
    switch ($action) {
        case 'feedback':
            echo json_encode(feedback($data));
            break;
        case 'order':
            echo json_encode(order($data));
            break;
        case 'job':
            echo json_encode(job($data));
            break;
    }
} else {
    echo json_encode(Array("status" => 'error', "code" => "action", "value" => '<div class="error">Enter action</div>', "action" => $_REQUEST["action"], "data" => $data));
}
?>